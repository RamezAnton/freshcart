"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserRoundPlus } from "lucide-react";
import { registerHandler } from "@/actions/auth.action";
import {
  defaultValues,
  registerSchema,
  type RegisterFormValues,
} from "@/schema/register.schema";
import {
  AuthDivider,
  AuthError,
  AuthField,
  AuthInput,
  PasswordStrength,
  SocialAuthButtons,
  SubmitLabel,
  authSubmitClass,
  useAuthReturn,
} from "./AuthControls";

export default function RegisterForm() {
  const router = useRouter();
  const { suffix } = useAuthReturn();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    defaultValues,
    resolver: zodResolver(registerSchema),
  });
  async function submit(values: RegisterFormValues) {
    setError("");
    try {
      const result = await registerHandler(values);
      if (!result.success) {
        setError(result.message);
        return;
      }
      router.push(`/login${suffix}`);
    } catch {
      setError("We couldn't create your account. Please try again.");
    }
  }
  return (
    <div className="rounded-2xl bg-white px-6 py-10 shadow-xl sm:px-8">
      <h2 className="text-center text-2xl font-bold text-gray-800">
        Create Your Account
      </h2>
      <p className="mt-2 mb-6 text-center text-gray-600">
        Start your fresh journey with us today
      </p>
      <SocialAuthButtons compact />
      <AuthDivider compact />
      <form noValidate onSubmit={handleSubmit(submit)} className="space-y-5">
        <AuthError message={error} />
        {(
          [
            {
              name: "name",
              label: "Full Name",
              type: "text",
              placeholder: "Enter your full name",
              complete: "name",
            },
            {
              name: "email",
              label: "Email Address",
              type: "email",
              placeholder: "Enter your email address",
              complete: "email",
            },
            {
              name: "password",
              label: "Password",
              type: "password",
              placeholder: "Create a strong password",
              complete: "new-password",
            },
            {
              name: "rePassword",
              label: "Confirm Password",
              type: "password",
              placeholder: "Confirm your password",
              complete: "new-password",
            },
            {
              name: "phone",
              label: "Phone Number",
              type: "tel",
              placeholder: "Enter your phone number",
              complete: "tel",
            },
          ] as const
        ).map((field) => (
          <AuthField
            key={field.name}
            id={field.name}
            label={`${field.label}*`}
            error={errors[field.name]?.message}
          >
            <AuthInput
              {...register(field.name)}
              id={field.name}
              type={field.type}
              password={field.type === "password"}
              aria-label={field.label}
              placeholder={field.placeholder}
              autoComplete={field.complete}
              aria-invalid={!!errors[field.name]}
              aria-describedby={
                errors[field.name] ? `${field.name}-error` : undefined
              }
            />
            {field.name === "password" && (
              <PasswordStrength value={watch("password")} />
            )}
          </AuthField>
        ))}
        <div>
          <label className="flex items-start gap-2 text-sm leading-relaxed text-gray-600">
            <input
              {...register("terms")}
              type="checkbox"
              className="mt-1 size-4 shrink-0 accent-primary-600"
              aria-invalid={!!errors.terms}
              aria-describedby={errors.terms ? "terms-error" : undefined}
            />
            <span>
              I agree to the{" "}
              <Link href="/terms" className="text-primary-600 hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="text-primary-600 hover:underline"
              >
                Privacy Policy
              </Link>
            </span>
          </label>
          {errors.terms && (
            <p
              role="alert"
              id="terms-error"
              className="mt-2 text-sm text-red-600"
            >
              {errors.terms.message}
            </p>
          )}
        </div>
        <button disabled={isSubmitting} className={authSubmitClass}>
          <UserRoundPlus size={18} aria-hidden="true" />
          <SubmitLabel busy={isSubmitting} pending="Creating account…">
            Create My Account
          </SubmitLabel>
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link
          href={`/login${suffix}`}
          className="font-semibold text-primary-600 hover:underline"
        >
          Sign In
        </Link>
      </p>
    </div>
  );
}
