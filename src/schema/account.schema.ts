import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().trim().min(3, "Enter at least 3 characters.").max(50),
  email: z.email("Enter a valid email address."),
  phone: z.string().trim().regex(/^(?:01[0125][0-9]{8}|(?:0020|\+20)1[0125][0-9]{8})$/, "Enter a valid Egyptian phone number."),
});

export const passwordSchema = z.object({
  currentPassword: z.string().min(1, "Enter your current password."),
  password: z.string().min(6, "Use at least 6 characters."),
  rePassword: z.string().min(1, "Confirm your new password."),
}).refine((values) => values.password === values.rePassword, {
  message: "Passwords do not match.", path: ["rePassword"],
}).refine((values) => values.password !== values.currentPassword, {
  message: "Choose a different password.", path: ["password"],
});

export const addressSchema = z.object({
  name: z.string().trim().min(1, "Enter an address name.").max(80),
  details: z.string().trim().min(3, "Enter the full address.").max(500),
  phone: profileSchema.shape.phone,
  city: z.string().trim().min(2, "Enter your city.").max(80),
});

export type ProfileValues = z.infer<typeof profileSchema>;
export type PasswordValues = z.infer<typeof passwordSchema>;
export type AddressValues = z.infer<typeof addressSchema>;
