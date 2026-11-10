import { z } from "zod";
import { emailSchema } from "./auth.schema";

export const defaultValues = { email: "", password: "", rememberMe: false };
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Enter your password."),
  rememberMe: z.boolean(),
});
export type LoginPayloadType = z.infer<typeof loginSchema>;
