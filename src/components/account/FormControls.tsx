"use client";

import { useState, type ReactNode, type InputHTMLAttributes } from "react";
import { Eye, EyeOff } from "lucide-react";

export const inputClass =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 disabled:bg-gray-50 disabled:text-gray-500";
export const primaryButton =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-primary-600 px-6 py-3 font-semibold text-white shadow-lg shadow-primary-600/20 transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-60";

export function FormField({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
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

export function PasswordInput(props: InputHTMLAttributes<HTMLInputElement>) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="relative">
      <input
        {...props}
        type={visible ? "text" : "password"}
        className={`${inputClass} pr-12`}
      />
      <button
        type="button"
        aria-label={`${visible ? "Hide" : "Show"} ${props["aria-label"] || "password"}`}
        aria-pressed={visible}
        onClick={() => setVisible(!visible)}
        className="absolute top-1/2 right-3 -translate-y-1/2 rounded-lg p-1 text-gray-400 hover:text-gray-700"
      >
        {visible ? (
          <EyeOff size={18} aria-hidden="true" />
        ) : (
          <Eye size={18} aria-hidden="true" />
        )}
      </button>
    </div>
  );
}

export function FormMessage({ error }: { error: string }) {
  return error ? (
    <p
      role="alert"
      className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700"
    >
      {error}
    </p>
  ) : null;
}
