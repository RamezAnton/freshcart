"use server";

import { registerSchema, type RegisterFormValues } from "@/schema/register.schema";
import { forgotPasswordSchema, resetCodeSchema, resetPasswordSchema } from "@/schema/auth.schema";
import type { z } from "zod";

async function authRequest(path: string, body: object, method = "POST") {
  try {
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/${path}`, {
      method, body: JSON.stringify(body), headers: { "Content-Type": "application/json" },
      cache: "no-store", signal: AbortSignal.timeout(15000),
    });
    const data = await response.json();
    return { success: response.ok, message: typeof data.message === "string" ? data.message : response.ok ? "Success" : "Please try again." };
  } catch {
    return { success: false, message: "We couldn't connect. Please try again." };
  }
}

export async function registerHandler(values: RegisterFormValues) {
  const result = registerSchema.safeParse(values);
  if (!result.success) return { success: false, message: result.error.issues[0].message };
  const { terms, ...body } = result.data;
  void terms;
  return authRequest("signup", body);
}

export async function sendResetCode(values: z.infer<typeof forgotPasswordSchema>) {
  const result = forgotPasswordSchema.safeParse(values);
  if (!result.success) return { success: false, message: result.error.issues[0].message };
  return authRequest("forgotPasswords", result.data);
}

export async function verifyResetCode(values: z.infer<typeof resetCodeSchema>) {
  const result = resetCodeSchema.safeParse(values);
  if (!result.success) return { success: false, message: result.error.issues[0].message };
  return authRequest("verifyResetCode", result.data);
}

export async function resetPassword(values: z.infer<typeof resetPasswordSchema>) {
  const result = resetPasswordSchema.safeParse(values);
  if (!result.success) return { success: false, message: result.error.issues[0].message };
  return authRequest("resetPassword", { email: result.data.email, newPassword: result.data.newPassword }, "PUT");
}
