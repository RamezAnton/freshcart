"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  LockKeyhole,
  Mail,
  ShoppingCart,
  ShieldCheck,
  Users,
  Star,
} from "lucide-react";
import {
  loginSchema,
  defaultValues,
  type LoginPayloadType,
} from "@/schema/login.schema";
import {
  AuthDivider,
  AuthError,
  AuthField,
  AuthInput,
  SocialAuthButtons,
  SubmitLabel,
  authSubmitClass,
  useAuthReturn,
} from "./AuthControls";

export function AuthBrand() {
  return (
    <Link
      href="/"
      className="mb-6 flex items-center justify-center gap-2 text-2xl font-bold text-gray-800"
    >
      <ShoppingCart className="text-primary-600" size={30} aria-hidden="true" />
      FreshCart
    </Link>
  );
}

export default function LoginForm() {
  const router = useRouter();
  const { destination, suffix } = useAuthReturn();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginPayloadType>({
    defaultValues,
    resolver: zodResolver(loginSchema),
  });
  async function submit(values: LoginPayloadType) {
    setError("");
    try {
      const result = await signIn("credentials", {
        ...values,
        redirect: false,
      });
      if (!result?.ok) {
        setError("Incorrect email or password. Please try again.");
        return;
      }
      router.push(destination);
      router.refresh();
    } catch {
      setError("We couldn't connect. Please try again.");
    }
  }
  return (
    <div className="rounded-2xl bg-white p-6 shadow-xl sm:p-8 lg:p-12">
      <AuthBrand />
      <h1 className="text-center text-3xl font-bold text-gray-800">
        Welcome Back!
      </h1>
      <p className="mt-2 mb-8 text-center text-gray-600">
        Sign in to continue your fresh shopping experience
      </p>
      <SocialAuthButtons />
      <AuthDivider />
      <form noValidate onSubmit={handleSubmit(submit)} className="space-y-5">
        <AuthError message={error} />
        <AuthField
          id="email"
          label="Email Address"
          error={errors.email?.message}
        >
          <AuthInput
            {...register("email")}
            id="email"
            type="email"
            icon={Mail}
            autoComplete="email"
            placeholder="Enter your email address"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
        </AuthField>
        <AuthField
          id="password"
          label="Password"
          error={errors.password?.message}
          trailing={
            <Link
              href={`/forget-password${suffix}`}
              className="text-sm font-medium text-primary-600 hover:underline"
            >
              Forgot Password?
            </Link>
          }
        >
          <AuthInput
            {...register("password")}
            id="password"
            icon={LockKeyhole}
            password
            autoComplete="current-password"
            placeholder="Enter your password"
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? "password-error" : undefined}
          />
        </AuthField>
        <label className="flex items-center gap-2 text-sm text-gray-600">
          <input
            {...register("rememberMe")}
            type="checkbox"
            className="size-4 accent-primary-600"
          />
          Keep me signed in
          <span className="sr-only">for 7 days instead of 8 hours</span>
        </label>
        <button disabled={isSubmitting} className={authSubmitClass}>
          <SubmitLabel busy={isSubmitting} pending="Signing in…">
            Sign In
          </SubmitLabel>
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-gray-600">
        New to FreshCart?{" "}
        <Link
          href={`/register${suffix}`}
          className="font-semibold text-primary-600 hover:underline"
        >
          Create an account
        </Link>
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-5 border-t border-gray-100 pt-6 text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <ShieldCheck size={14} className="text-primary-600" />
          SSL Secured
        </span>
        <span className="flex items-center gap-1">
          <Users size={14} className="text-primary-600" />
          50K+ Users
        </span>
        <span className="flex items-center gap-1">
          <Star size={14} className="text-yellow-500" />
          4.9 Rating
        </span>
      </div>
    </div>
  );
}
