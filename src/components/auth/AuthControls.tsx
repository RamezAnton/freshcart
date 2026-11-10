"use client";

import {
  useEffect,
  useState,
  type ComponentPropsWithRef,
  type ReactNode,
} from "react";
import { Eye, EyeOff, LoaderCircle, type LucideIcon } from "lucide-react";
import { authDestination, passwordStrength } from "@/lib/auth";

export const authInputClass =
  "w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-800 outline-none transition-colors placeholder:text-gray-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 disabled:bg-gray-50";
export const authSubmitClass =
  "inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary-600 px-4 py-3 text-base font-semibold text-white shadow-lg shadow-primary-600/15 transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50";

export function AuthField({
  id,
  label,
  error,
  children,
  trailing,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
  trailing?: ReactNode;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3">
        <label htmlFor={id} className="text-sm font-semibold text-gray-700">
          {label}
        </label>
        {trailing}
      </div>
      {children}
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-1.5 text-sm text-red-600"
        >
          {error}
        </p>
      )}
    </div>
  );
}

export function AuthInput({
  icon: Icon,
  password = false,
  className = "",
  ...props
}: ComponentPropsWithRef<"input"> & { icon?: LucideIcon; password?: boolean }) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="relative">
      <input
        {...props}
        type={password ? (visible ? "text" : "password") : props.type}
        className={`${authInputClass} ${Icon ? "pl-12" : ""} ${password ? "pr-12" : ""} ${className}`}
      />
      {Icon && (
        <Icon
          size={18}
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-gray-400"
        />
      )}
      {password && (
        <button
          type="button"
          aria-label={`${visible ? "Hide" : "Show"} ${props["aria-label"] || "password"}`}
          aria-pressed={visible}
          onClick={() => setVisible(!visible)}
          className="absolute top-1/2 right-3 -translate-y-1/2 rounded-lg p-1 text-gray-400 hover:text-gray-600"
        >
          {visible ? (
            <EyeOff size={18} aria-hidden="true" />
          ) : (
            <Eye size={18} aria-hidden="true" />
          )}
        </button>
      )}
    </div>
  );
}

export function PasswordStrength({ value }: { value: string }) {
  const strength = passwordStrength(value);
  const color =
    strength.percent < 60
      ? "bg-red-500"
      : strength.percent < 80
        ? "bg-amber-500"
        : strength.percent < 100
          ? "bg-lime-500"
          : "bg-primary-500";
  return (
    <div className="mt-3">
      <div className="flex items-center gap-2">
        <div
          role="progressbar"
          aria-label={`Password strength: ${strength.label}`}
          aria-valuenow={strength.percent}
          aria-valuemin={0}
          aria-valuemax={100}
          className="h-1 flex-1 overflow-hidden rounded-full bg-gray-200"
        >
          <div
            className={`h-full transition-[width] ${color}`}
            style={{ width: `${strength.percent}%` }}
          />
        </div>
        <span className="min-w-12 text-xs font-medium text-gray-500">
          {strength.label}
        </span>
      </div>
      <p className="mt-2 text-xs text-gray-500">
        Use at least 8 characters with uppercase and lowercase letters, numbers,
        and symbols.
      </p>
    </div>
  );
}

export function SocialAuthButtons({ compact = false }: { compact?: boolean }) {
  return (
    <div>
      <div className={compact ? "grid grid-cols-2 gap-2" : "space-y-3"}>
        {["Google", "Facebook"].map((name) => (
          <button
            type="button"
            key={name}
            disabled
            aria-label={`${compact ? "Sign up" : "Continue"} with ${name} (not available yet)`}
            title={`${name} sign-in is not configured yet`}
            className="flex w-full cursor-not-allowed items-center justify-center gap-3 rounded-xl border-2 border-gray-200 px-3 py-3 text-sm font-medium text-gray-700"
          >
            <span
              aria-hidden="true"
              className={
                name === "Google"
                  ? "text-xl font-bold text-red-500"
                  : "flex size-4 items-center justify-center rounded-full bg-blue-600 font-bold text-white"
              }
            >
              {name === "Google" ? "G" : "f"}
            </span>
            {compact ? name : `Continue with ${name}`}
          </button>
        ))}
      </div>
      <p className="mt-2 text-center text-xs text-gray-400">
        Social sign-in isn&apos;t available yet. Please use email.
      </p>
    </div>
  );
}

export function AuthDivider({ compact = false }: { compact?: boolean }) {
  return (
    <div className="relative my-6 flex items-center justify-center">
      <span className="absolute inset-x-0 h-px bg-gray-200" />
      <span className="relative bg-white px-4 text-xs font-medium text-gray-500">
        {compact ? "or" : "OR CONTINUE WITH EMAIL"}
      </span>
    </div>
  );
}

export function AuthError({ message }: { message: string }) {
  return message ? (
    <p
      role="alert"
      className="rounded-xl border border-red-100 bg-red-50 p-3 text-sm text-red-700"
    >
      {message}
    </p>
  ) : null;
}

export function SubmitLabel({
  busy,
  children,
  pending = "Please wait…",
}: {
  busy: boolean;
  children: ReactNode;
  pending?: string;
}) {
  return (
    <>
      {busy && (
        <LoaderCircle size={17} className="animate-spin" aria-hidden="true" />
      )}
      {busy ? pending : children}
    </>
  );
}

export function useAuthReturn() {
  const [search, setSearch] = useState("");
  useEffect(() => {
    setSearch(window.location.search);
  }, []);
  const destination = authDestination(search);
  const suffix =
    destination === "/"
      ? ""
      : `?callbackUrl=${encodeURIComponent(destination)}`;
  return { search, destination, suffix };
}
