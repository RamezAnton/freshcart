import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { z } from "zod";
import { accountRequest, AccountApiError } from "@/services/account.service";
import { parseSavedWishlist } from "@/lib/wishlist";

const productId = z.string().regex(/^[a-f\d]{24}$/i, "Invalid product.");
async function handle(request: NextRequest, method: "GET" | "POST" | "DELETE") {
  if (
    method !== "GET" &&
    request.headers.get("origin") !== request.nextUrl.origin
  )
    return Response.json(
      { message: "This request is not allowed." },
      { status: 403 },
    );
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET,
  });
  if (!token?.accessToken)
    return Response.json(
      { message: "Please sign in to access your saved wishlist." },
      { status: 401 },
    );
  const headers = { "Cache-Control": "private, no-store" };
  try {
    if (method === "GET") {
      const data = await accountRequest<{ data: unknown }>(
        "wishlist",
        token.accessToken,
      );
      return Response.json(
        { items: parseSavedWishlist(data.data) },
        { headers },
      );
    }
    if (method === "DELETE") {
      const id = productId.parse(request.nextUrl.searchParams.get("id"));
      await accountRequest(`wishlist/${id}`, token.accessToken, { method });
    } else {
      const values = z.object({ productId }).parse(await request.json());
      await accountRequest("wishlist", token.accessToken, {
        method,
        body: JSON.stringify(values),
      });
    }
    return Response.json({ success: true }, { headers });
  } catch (error) {
    const invalidRequest =
      method !== "GET" &&
      (error instanceof z.ZodError || error instanceof SyntaxError);
    return Response.json(
      {
        message: invalidRequest
          ? "Invalid product."
          : error instanceof AccountApiError
            ? error.message
            : "Unable to reach the wishlist service. Please try again.",
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
export const GET = (request: NextRequest) => handle(request, "GET");
export const POST = (request: NextRequest) => handle(request, "POST");
export const DELETE = (request: NextRequest) => handle(request, "DELETE");
