import { z } from "zod";
import { addressSchema } from "@/schema/account.schema";

export const checkoutSchema = z.object({
  cartId: z.string().regex(/^[a-f\d]{24}$/i, "Reload your cart before checking out."),
  paymentMethod: z.enum(["cash", "online"]),
  shippingAddress: addressSchema.omit({ name: true }).extend({
    postalCode: z.string().trim().max(20).optional(),
  }),
});

const productSchema = z.object({
  _id: z.string(), title: z.string(), imageCover: z.string().optional(),
}).nullable();

const orderSchema = z.object({
  _id: z.string(), id: z.union([z.string(), z.number()]).optional(),
  user: z.union([z.string(), z.object({ _id: z.string() })]).optional(),
  createdAt: z.string().refine(value => Number.isFinite(Date.parse(value))), isPaid: z.boolean(), isDelivered: z.boolean(),
  paymentMethodType: z.string(), totalOrderPrice: z.number().finite().nonnegative(),
  shippingPrice: z.number().finite().nonnegative().default(0),
  taxPrice: z.number().finite().nonnegative().default(0),
  shippingAddress: z.object({ details: z.string(), city: z.string(), phone: z.string(), postalCode: z.string().optional() }),
  cartItems: z.array(z.object({
    _id: z.string().optional(), count: z.number().int().positive(),
    price: z.number().finite().nonnegative(), product: productSchema,
  })),
});

export type Order = z.infer<typeof orderSchema>;
export type CheckoutValues = z.infer<typeof checkoutSchema>;

export function parseOrders(value: unknown, userId: string): Order[] {
  const orders = z.array(orderSchema).parse(Array.isArray(value) ? value : z.object({ data: z.array(orderSchema) }).parse(value).data);
  return orders.filter((order) => !order.user || (typeof order.user === "string" ? order.user : order.user._id) === userId)
    .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
}

export function stripeCheckoutUrl(value: unknown): string {
  const data = z.object({ session: z.object({ url: z.url() }) }).parse(value);
  const url = new URL(data.session.url);
  if (url.protocol !== "https:" || url.hostname !== "checkout.stripe.com" || url.port || url.username || url.password) {
    throw new Error("Invalid payment destination");
  }
  return url.href;
}
