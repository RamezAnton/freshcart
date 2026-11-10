import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { z } from "zod";
import { accountRequest, AccountApiError } from "@/services/account.service";
import { emptyCart, normalizeCart } from "@/lib/cart";
import type { CartResponse } from "@/interfaces/cart.interface";

const productId = z.string().regex(/^[a-f\d]{24}$/i);
const quantitySchema = z.object({ productId, count: z.number().int().min(1).max(999) });
const addSchema = z.object({ productId, count: z.number().int().min(1).max(999).default(1) });
const couponSchema = z.object({ couponName: z.string().trim().min(1).max(100) });

async function handle(request: NextRequest, method: "GET" | "POST" | "PUT" | "DELETE") {
  if (method !== "GET" && request.headers.get("origin") !== request.nextUrl.origin) return Response.json({ message: "This request is not allowed." }, { status: 403 });
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET });
  if (!token?.accessToken) return Response.json({ message: "Please sign in to access your saved cart." }, { status: 401 });
  const respond = (data: CartResponse) => Response.json(normalizeCart(data), { headers: { "Cache-Control": "private, no-store" } });
  const readCart = () => accountRequest<CartResponse>("cart", token.accessToken, {}, "v2");
  try {
    if (method === "GET") return respond(await readCart());
    if (method === "DELETE") {
      const id = request.nextUrl.searchParams.get("id");
      if (id && !productId.safeParse(id).success) return Response.json({ message: "Invalid product." }, { status: 400 });
      const data = await accountRequest<CartResponse>(id ? `cart/${id}` : "cart", token.accessToken, { method }, "v2");
      return respond(id ? await readCart() : data);
    }
    const body = await request.json();
    if (method === "PUT" && "couponName" in body) {
      const { couponName } = couponSchema.parse(body);
      await accountRequest<CartResponse>("cart/applyCoupon", token.accessToken, { method, body: JSON.stringify({ couponName }) }, "v2");
      return respond(await readCart());
    }
    if (method === "PUT") {
      const values = quantitySchema.parse(body);
      await accountRequest<CartResponse>(`cart/${values.productId}`, token.accessToken, { method, body: JSON.stringify({ count: values.count }) }, "v2");
      return respond(await readCart());
    }
    const values = addSchema.parse(body);
    const data = await accountRequest<CartResponse>("cart", token.accessToken, { method: "POST", body: JSON.stringify({ productId: values.productId }) }, "v2");
    if (values.count > 1) {
      const count = data.data?.products?.find((item) => (typeof item.product === "string" ? item.product : item.product._id) === values.productId)?.count;
      if (count === undefined) throw new Error("Missing cart product");
      await accountRequest<CartResponse>(`cart/${values.productId}`, token.accessToken, { method: "PUT", body: JSON.stringify({ count: count + values.count - 1 }) }, "v2");
    }
    return respond(await readCart());
  } catch (error) {
    if (method === "GET" && error instanceof AccountApiError && error.status === 404) return Response.json(emptyCart, { headers: { "Cache-Control": "private, no-store" } });
    return Response.json({ message: error instanceof z.ZodError ? error.issues[0].message : error instanceof AccountApiError ? error.message : "Unable to reach the cart service. Please try again." }, {
      status: error instanceof z.ZodError || error instanceof SyntaxError ? 400 : error instanceof AccountApiError ? error.status : 502,
    });
  }
}

export const GET = (request: NextRequest) => handle(request, "GET");
export const POST = (request: NextRequest) => handle(request, "POST");
export const PUT = (request: NextRequest) => handle(request, "PUT");
export const DELETE = (request: NextRequest) => handle(request, "DELETE");
