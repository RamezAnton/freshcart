import { z } from "zod";

export const wishlistStorageKey = "freshcart-guest-wishlist";
export const wishlistProductSchema = z.object({
  _id: z.string().regex(/^[a-f\d]{24}$/i),
  title: z.string().min(1),
  imageCover: z.url(),
  price: z.number().nonnegative(),
  priceAfterDiscount: z.number().nonnegative().optional(),
  quantity: z.number().int().nonnegative(),
  category: z.object({ name: z.string(), _id: z.string().optional() }),
});
export type WishlistProduct = z.infer<typeof wishlistProductSchema>;

export function uniqueWishlist(items: WishlistProduct[]) {
  return [...new Map(items.map((item) => [item._id, item])).values()];
}

export function readGuestWishlist(raw: string | null): WishlistProduct[] {
  try {
    const data: unknown = JSON.parse(raw || "[]");
    if (!Array.isArray(data)) return [];
    return uniqueWishlist(
      data.flatMap((item) => {
        const parsed = wishlistProductSchema.safeParse(item);
        return parsed.success ? [parsed.data] : [];
      }),
    );
  } catch {
    return [];
  }
}

export function parseSavedWishlist(data: unknown): WishlistProduct[] {
  return uniqueWishlist(z.array(wishlistProductSchema).parse(data));
}
