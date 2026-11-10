import "server-only";

export class AccountApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

export async function accountRequest<T>(
  path: string,
  token: string,
  init: RequestInit = {},
  version: "v1" | "v2" = "v1",
): Promise<T> {
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/${version}/${path}`,
    {
      ...init,
      headers: { "Content-Type": "application/json", token },
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
    },
  );
  const data = await response.json();
  if (!response.ok) {
    throw new AccountApiError(
      data.message ||
        data.errors?.[0]?.msg ||
        "The request could not be completed. Please try again.",
      response.status,
    );
  }
  return data as T;
}
