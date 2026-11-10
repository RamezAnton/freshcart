import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { z } from "zod";
import { accountRequest, AccountApiError } from "@/services/account.service";
import { checkoutSchema, parseOrders, stripeCheckoutUrl } from "@/lib/orders";
import { normalizeCart } from "@/lib/cart";
import type { CartResponse } from "@/interfaces/cart.interface";

const headers = { "Cache-Control": "private, no-store" };

export async function GET(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET,
  });
  if (!token?.accessToken || !token.user?.id)
    return Response.json(
      { message: "Please sign in to see your orders." },
      { status: 401, headers },
    );
  try {
    const data = await accountRequest<unknown>(
      `orders/user/${encodeURIComponent(token.user.id)}`,
      token.accessToken,
    );
    return Response.json(
      { orders: parseOrders(data, token.user.id) },
      { headers },
    );
  } catch (error) {
    return Response.json(
      {
        message:
          error instanceof AccountApiError
            ? error.message
            : "Unable to load your orders. Please try again.",
      },
      {
        status: error instanceof AccountApiError ? error.status : 502,
        headers,
      },
    );
  }
}

export async function POST(request: NextRequest) {
  if (request.headers.get("origin") !== request.nextUrl.origin)
    return Response.json(
      { message: "This request is not allowed." },
      { status: 403, headers },
    );
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET,
  });
  if (!token?.accessToken)
    return Response.json(
      { message: "Please sign in to check out." },
      { status: 401, headers },
    );
  let creatingOrder = false;
  let validated = false;
  try {
    const values = checkoutSchema.parse(await request.json());
    validated = true;
    const cart = normalizeCart(
      await accountRequest<CartResponse>("cart", token.accessToken, {}, "v2"),
    );
    if (!cart.items.length)
      return Response.json(
        {
          message: "Your cart is empty. Add some products before checking out.",
        },
        { status: 409, headers },
      );
    if (cart.id !== values.cartId)
      return Response.json(
        {
          message:
            "Your cart has changed. Return to your cart and review it before placing the order.",
        },
        { status: 409, headers },
      );
    const body = JSON.stringify({ shippingAddress: values.shippingAddress });
    if (values.paymentMethod === "online") {
      const data = await accountRequest<unknown>(
        `orders/checkout-session/${cart.id}?url=${encodeURIComponent(request.nextUrl.origin)}`,
        token.accessToken,
        { method: "POST", body },
      );
      return Response.json({ url: stripeCheckoutUrl(data) }, { headers });
    }
    creatingOrder = true;
    const data = await accountRequest<{ data?: { _id?: string } }>(
      `orders/${cart.id}`,
      token.accessToken,
      { method: "POST", body },
      "v2",
    );
    return Response.json(
      { success: true, orderId: data.data?._id },
      { headers },
    );
  } catch (error) {
    const uncertain =
      creatingOrder &&
      (!(error instanceof AccountApiError) || error.status >= 500);
    const invalidRequest =
      !validated &&
      (error instanceof z.ZodError || error instanceof SyntaxError);
    return Response.json(
      {
        message: uncertain
          ? "We could not confirm the result. Check My Orders before placing this order again."
          : invalidRequest
            ? "Check your shipping address and payment details."
            : error instanceof AccountApiError
              ? error.message
              : "Unable to start checkout. Please try again.",
        uncertain,
      },
      {
        status: invalidRequest
          ? 400
          : error instanceof AccountApiError
            ? error.status
            : 502,
        headers,
      },
    );
  }
}
