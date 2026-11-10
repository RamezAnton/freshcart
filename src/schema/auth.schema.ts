import { z } from "zod";

export const emailSchema = z
  .string()
  .trim()
  .pipe(z.email("Enter a valid email address."));
export const strongPassword = z
  .string()
  .min(8, "Use at least 8 characters.")
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).+$/,
    "Include uppercase and lowercase letters, a number, and a symbol.",
  );
export const forgotPasswordSchema = z.object({ email: emailSchema });
export const resetCodeSchema = z.object({
  resetCode: z
    .string()
    .regex(/^\d{6}$/, "Enter the 6-digit verification code."),
});
export const resetPasswordSchema = z
  .object({
    email: emailSchema,
    newPassword: strongPassword,
    rePassword: z.string().min(1, "Confirm your password."),
  })
  .refine((values) => values.newPassword === values.rePassword, {
    message: "Passwords do not match.",
    path: ["rePassword"],
  });
