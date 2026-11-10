import { z } from "zod";
import { emailSchema, strongPassword } from "./auth.schema";
import { profileSchema } from "./account.schema";

export const defaultValues = {
  name: "",
  email: "",
  password: "",
  rePassword: "",
  phone: "",
  terms: false,
};
const fields = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Enter at least 3 characters.")
    .max(20, "Use at most 20 characters."),
  email: emailSchema,
  password: strongPassword,
  rePassword: z.string().min(1, "Confirm your password."),
  phone: profileSchema.shape.phone,
});
export const registerPayloadSchema = fields.refine(
  (values) => values.password === values.rePassword,
  { message: "Passwords do not match.", path: ["rePassword"] },
);
export const registerSchema = fields
  .extend({
    terms: z
      .boolean()
      .refine(
        (accepted) => accepted,
        "Please accept the Terms of Service and Privacy Policy.",
      ),
  })
  .refine((values) => values.password === values.rePassword, {
    message: "Passwords do not match.",
    path: ["rePassword"],
  });
export type RegisterPayloadType = z.infer<typeof registerPayloadSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
