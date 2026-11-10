import { z } from "zod";
import type {
  CartItem,
  CartResponse,
  CartSnapshot,
} from "@/interfaces/cart.interface";

export const emptyCart: CartSnapshot = { items: [], subtotal: 0 };
export const cartStorageKey = "freshcart-guest-cart";

const storedItems = z.array(
  z.object({
    product: z.object({
      _id: z.string().regex(/^[a-f\d]{24}$/i),
      title: z.string(),
      imageCover: z.url(),
      category: z.object({ name: z.string() }),
      quantity: z.number().optional(),
    }),
    count: z.number().int().min(1).max(999),
    price: z.number().finite().nonnegative(),
  }),
);

export function readGuestCart(value: string | null): CartItem[] {
  try {
    const result = storedItems.safeParse(JSON.parse(value || "[]"));
    return result.success ? result.data : [];
  } catch {
    return [];
  }
}

export function localCart(items: CartItem[]): CartSnapshot {
  return {
    items,
    subtotal: items.reduce((total, item) => total + item.price * item.count, 0),
  };
}

export function normalizeCart(response: CartResponse): CartSnapshot {
  const items: CartItem[] = [];
  for (const item of response.data?.products || []) {
    if (!item.product || item.count <= 0) continue;
    if (typeof item.product === "string" || !item.product._id || !item.product.title || !item.product.imageCover) {
      throw new Error("Cart product details are missing");
    }
    items.push({ ...item, product: item.product });
  }
  return {
    items,
    subtotal: response.data?.totalCartPrice ?? localCart(items).subtotal,
    discountedSubtotal: response.data?.totalPriceAfterDiscount,
    id: response.data?._id,
  };
}
