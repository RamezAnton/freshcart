"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useSession } from "next-auth/react";
import type {
  CartItem,
  CartProduct,
  CartSnapshot,
} from "@/interfaces/cart.interface";
import {
  cartStorageKey,
  emptyCart,
  localCart,
  readGuestCart,
} from "@/lib/cart";
import { toast } from "@/components/ui/toast";

interface CartContextValue extends CartSnapshot {
  loading: boolean;
  busy: boolean;
  error: string;
  addItem: (
    product: CartProduct,
    price: number,
    count?: number,
  ) => Promise<boolean>;
  setQuantity: (id: string, count: number) => Promise<boolean>;
  removeItem: (id: string) => Promise<boolean>;
  clear: () => Promise<boolean>;
  applyCoupon: (couponName: string) => Promise<boolean>;
  retry: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

async function requestCart(
  init: RequestInit = {},
  query = "",
): Promise<CartSnapshot> {
  const response = await fetch(`/api/account/cart${query}`, {
    ...init,
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });
  const data = await response.json();
  if (!response.ok)
    throw new Error(data.message || "Unable to update your cart.");
  return data;
}

export default function CartProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const [cart, setCart] = useState<CartSnapshot>(emptyCart);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);
  const [revision, setRevision] = useState(0);
  const guest = useRef<CartItem[]>([]);
  const locked = useRef(false);
  const userId = session?.user.id;

  const saveGuest = useCallback((items: CartItem[]) => {
    guest.current = items;
    try {
      localStorage.setItem(cartStorageKey, JSON.stringify(items));
    } catch {
      toast.add({
        type: "warning",
        title: "Cart storage unavailable",
        description: "Keep this tab open to retain your guest cart.",
      });
    }
  }, []);

  useEffect(() => {
    try {
      guest.current = readGuestCart(localStorage.getItem(cartStorageKey));
    } catch {
      guest.current = [];
    }
    setReady(true);
    function storage(event: StorageEvent) {
      if (event.key !== cartStorageKey) return;
      guest.current = readGuestCart(event.newValue);
      setRevision((value) => value + 1);
    }
    window.addEventListener("storage", storage);
    return () => window.removeEventListener("storage", storage);
  }, []);

  useEffect(() => {
    if (!ready || status === "loading") return;
    if (!userId) {
      setCart(localCart(guest.current));
      setLoading(false);
      setError("");
      return;
    }
    const controller = new AbortController();
    setLoading(true);
    setCart(emptyCart);
    setError("");
    async function load() {
      try {
        let next = await requestCart({ signal: controller.signal });
        const mergeKey = `freshcart-merge-${userId}`;
        let targets: Record<string, number> = {};
        try {
          targets = JSON.parse(localStorage.getItem(mergeKey) || "{}");
        } catch {
          targets = {};
        }
        for (const item of [...guest.current]) {
          if (controller.signal.aborted) return;
          const id = item.product._id;
          const existing = next.items.find((entry) => entry.product._id === id);
          const target =
            targets[id] || Math.min(999, (existing?.count || 0) + item.count);
          targets[id] = target;
          localStorage.setItem(mergeKey, JSON.stringify(targets));
          if (!existing)
            next = await requestCart({
              method: "POST",
              body: JSON.stringify({ productId: id }),
              signal: controller.signal,
            });
          next = await requestCart({
            method: "PUT",
            body: JSON.stringify({ productId: id, count: target }),
            signal: controller.signal,
          });
          saveGuest(guest.current.filter((entry) => entry.product._id !== id));
          delete targets[id];
          localStorage.setItem(mergeKey, JSON.stringify(targets));
        }
        try {
          localStorage.removeItem(mergeKey);
        } catch { }
        if (!controller.signal.aborted) setCart(next);
      } catch (error) {
        if (!controller.signal.aborted)
          setError(
            error instanceof Error
              ? error.message
              : "Unable to load your cart.",
          );
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    void load();
    return () => controller.abort();
  }, [userId, status, ready, revision, saveGuest]);

  async function mutate(operation: () => Promise<CartSnapshot>) {
    if (locked.current || loading || status === "loading") return false;
    locked.current = true;
    setBusy(true);
    setError("");
    try {
      setCart(await operation());
      return true;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to update your cart.";
      setError(message);
      toast.add({
        type: "error",
        title: "Cart could not be updated",
        description: message,
      });
      return false;
    } finally {
      locked.current = false;
      setBusy(false);
    }
  }

  function localUpdate(items: CartItem[]) {
    saveGuest(items);
    return Promise.resolve(localCart(items));
  }

  async function addItem(product: CartProduct, price: number, count = 1) {
    const success = await mutate(() => {
      if (userId)
        return requestCart({
          method: "POST",
          body: JSON.stringify({ productId: product._id, count }),
        });
      const existing = guest.current.find(
        (item) => item.product._id === product._id,
      );
      const nextCount = Math.min(
        999,
        product.quantity ?? 999,
        (existing?.count || 0) + count,
      );
      const cartProduct = {
        _id: product._id,
        title: product.title,
        imageCover: product.imageCover,
        category: { name: product.category.name },
        quantity: product.quantity,
      };
      return localUpdate(
        existing
          ? guest.current.map((item) =>
            item.product._id === product._id
              ? { ...item, count: nextCount }
              : item,
          )
          : [
            ...guest.current,
            { product: cartProduct, count: nextCount, price },
          ],
      );
    });
    if (success)
      toast.add({
        type: "success",
        title: "Added to cart",
        description: product.title,
      });
    return success;
  }

  return (
    <CartContext.Provider
      value={{
        ...cart,
        loading: loading || !ready || (status === "loading" && !session),
        busy,
        error,
        addItem,
        setQuantity: (id, count) =>
          mutate(() =>
            userId
              ? requestCart({
                method: "PUT",
                body: JSON.stringify({ productId: id, count }),
              })
              : localUpdate(
                guest.current.map((item) =>
                  item.product._id === id ? { ...item, count } : item,
                ),
              ),
          ),
        removeItem: (id) =>
          mutate(() =>
            userId
              ? requestCart(
                { method: "DELETE" },
                `?id=${encodeURIComponent(id)}`,
              )
              : localUpdate(
                guest.current.filter((item) => item.product._id !== id),
              ),
          ),
        clear: () =>
          mutate(() =>
            userId ? requestCart({ method: "DELETE" }) : localUpdate([]),
          ),
        applyCoupon: (couponName) =>
          mutate(() =>
            requestCart({
              method: "PUT",
              body: JSON.stringify({ couponName }),
            }),
          ),
        retry: () => setRevision((value) => value + 1),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context)
    throw new Error("Cart components must be rendered inside CartProvider.");
  return context;
}
