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
import {
  readGuestWishlist,
  wishlistProductSchema,
  wishlistStorageKey,
  type WishlistProduct,
} from "@/lib/wishlist";
import { toast } from "@/components/ui/toast";

interface WishlistContextValue {
  items: WishlistProduct[];
  loading: boolean;
  busy: boolean;
  error: string;
  toggle: (product: WishlistProduct) => Promise<boolean>;
  remove: (id: string) => Promise<boolean>;
  retry: () => void;
}
const WishlistContext = createContext<WishlistContextValue | null>(null);
async function requestWishlist(init: RequestInit = {}, query = "") {
  const response = await fetch(`/api/account/wishlist${query}`, {
    ...init,
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });
  const data = await response.json();
  if (!response.ok)
    throw new Error(data.message || "Unable to update your wishlist.");
  return data as { items?: WishlistProduct[] };
}

export default function WishlistProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { data: session, status } = useSession();
  const owner = session?.user.id ?? "guest";
  const [snapshot, setSnapshot] = useState<{
    owner: string;
    items: WishlistProduct[];
  }>({ owner: "", items: [] });
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [revision, setRevision] = useState(0);
  const guest = useRef<WishlistProduct[]>([]);
  const locked = useRef(false);
  const mutation = useRef<AbortController | null>(null);
  const items = snapshot.owner === owner ? snapshot.items : [];
  const saveGuest = useCallback((next: WishlistProduct[]) => {
    guest.current = next;
    try {
      localStorage.setItem(wishlistStorageKey, JSON.stringify(next));
    } catch {
      toast.add({
        type: "warning",
        title: "Wishlist storage unavailable",
        description: "Keep this tab open to retain your favorites.",
      });
    }
  }, []);

  useEffect(() => {
    try {
      guest.current = readGuestWishlist(
        localStorage.getItem(wishlistStorageKey),
      );
    } catch {
      guest.current = [];
    }
    setReady(true);
    function storage(event: StorageEvent) {
      if (event.key !== wishlistStorageKey) return;
      guest.current = readGuestWishlist(event.newValue);
      setRevision((value) => value + 1);
    }
    window.addEventListener("storage", storage);
    return () => window.removeEventListener("storage", storage);
  }, []);

  useEffect(() => {
    if (!ready || status === "loading") return;
    const controller = new AbortController();
    mutation.current?.abort();
    locked.current = false;
    setBusy(false);
    setError("");
    setLoading(true);
    async function load() {
      try {
        let next = guest.current;
        if (owner !== "guest") {
          const data = await requestWishlist({ signal: controller.signal });
          next = data.items ?? [];
          if (!controller.signal.aborted) setSnapshot({ owner, items: next });
          for (const product of [...guest.current]) {
            if (controller.signal.aborted) return;
            if (!next.some((item) => item._id === product._id)) {
              await requestWishlist({
                method: "POST",
                body: JSON.stringify({ productId: product._id }),
                signal: controller.signal,
              });
              next = [...next, product];
              if (!controller.signal.aborted)
                setSnapshot({ owner, items: next });
            }
            if (controller.signal.aborted) return;
            saveGuest(guest.current.filter((item) => item._id !== product._id));
          }
        }
        if (!controller.signal.aborted) setSnapshot({ owner, items: next });
      } catch (cause) {
        if (!controller.signal.aborted)
          setError(
            cause instanceof Error
              ? cause.message
              : "Unable to load your wishlist.",
          );
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    void load();
    return () => {
      controller.abort();
      mutation.current?.abort();
    };
  }, [owner, status, ready, revision, saveGuest]);

  async function mutate(
    product: WishlistProduct | undefined,
    id: string,
    removing: boolean,
  ) {
    if (locked.current || loading || !ready || status === "loading")
      return false;
    if (snapshot.owner !== owner) {
      setRevision((value) => value + 1);
      toast.add({
        type: "warning",
        title: "Reloading your wishlist",
        description: "Please try again once your saved items have loaded.",
      });
      return false;
    }
    const controller = new AbortController();
    mutation.current = controller;
    locked.current = true;
    setBusy(true);
    setError("");
    try {
      if (owner !== "guest")
        await requestWishlist(
          {
            method: removing ? "DELETE" : "POST",
            ...(removing ? {} : { body: JSON.stringify({ productId: id }) }),
            signal: controller.signal,
          },
          removing ? `?id=${encodeURIComponent(id)}` : "",
        );
      if (controller.signal.aborted) return false;
      const next = removing
        ? items.filter((item) => item._id !== id)
        : [...items, wishlistProductSchema.parse(product)];
      if (owner === "guest") saveGuest(next);
      setSnapshot({ owner, items: next });
      return true;
    } catch (cause) {
      if (!controller.signal.aborted) {
        const message =
          cause instanceof Error
            ? cause.message
            : "Unable to update your wishlist.";
        setError(message);
        toast.add({
          type: "error",
          title: "Wishlist could not be updated",
          description: message,
        });
      }
      return false;
    } finally {
      if (!controller.signal.aborted) {
        locked.current = false;
        setBusy(false);
      }
    }
  }

  return (
    <WishlistContext.Provider
      value={{
        items,
        loading: loading || !ready || status === "loading",
        busy,
        error,
        toggle: (product) =>
          mutate(
            product,
            product._id,
            items.some((item) => item._id === product._id),
          ),
        remove: (id) => mutate(undefined, id, true),
        retry: () => setRevision((value) => value + 1),
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
export function useWishlist() {
  const value = useContext(WishlistContext);
  if (!value)
    throw new Error(
      "Wishlist components must be rendered inside WishlistProvider.",
    );
  return value;
}
