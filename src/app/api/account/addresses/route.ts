import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { addressSchema } from "@/schema/account.schema";
import { accountRequest, AccountApiError } from "@/services/account.service";
import type { Address } from "@/interfaces/account.interface";

async function handle(request: NextRequest, method: "GET" | "POST" | "DELETE") {
  if (method !== "GET" && request.headers.get("origin") !== request.nextUrl.origin) {
    return Response.json({ message: "This request is not allowed." }, { status: 403 });
  }
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET });
  if (!token?.accessToken) return Response.json({ message: "Please sign in to manage your addresses." }, { status: 401 });
  try {
    let path = "addresses";
    let body: string | undefined;
    if (method === "POST") {
      const values = addressSchema.safeParse(await request.json());
      if (!values.success) return Response.json({ message: values.error.issues[0].message }, { status: 400 });
      body = JSON.stringify(values.data);
    }
    if (method === "DELETE") {
      const id = request.nextUrl.searchParams.get("id");
      if (!id || !/^[a-f\d]{24}$/i.test(id)) return Response.json({ message: "Invalid address." }, { status: 400 });
      path += `/${id}`;
    }
    const data = await accountRequest<{ data: Address[] }>(path, token.accessToken, { method, body });
    return Response.json({ data: data.data }, { headers: { "Cache-Control": "private, no-store" } });
  } catch (error) {
    return Response.json({ message: error instanceof AccountApiError ? error.message : "Unable to reach the address service. Please try again." }, {
      status: error instanceof AccountApiError ? error.status : 502,
    });
  }
}

export const GET = (request: NextRequest) => handle(request, "GET");
export const POST = (request: NextRequest) => handle(request, "POST");
export const DELETE = (request: NextRequest) => handle(request, "DELETE");
