"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, LockKeyhole, Save, UserRound } from "lucide-react";
import {
  passwordSchema,
  profileSchema,
  type PasswordValues,
  type ProfileValues,
} from "@/schema/account.schema";
import type { AccountUser } from "@/interfaces/account.interface";
import { toast } from "@/components/ui/toast";
import {
  FormField,
  FormMessage,
  inputClass,
  PasswordInput,
  primaryButton,
} from "./FormControls";

function ProfileForm({ user }: { user: AccountUser }) {
  const { update, status } = useSession();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
    },
  });

  async function save(values: ProfileValues) {
    setError("");
    try {
      const session = await update({ profile: values });
      if (!session || session.updateError)
        throw new Error(
          session?.updateError || "Your session expired. Please sign in again.",
        );
      reset(values);
      toast.add({
        type: "success",
        title: "Profile updated",
        description: "Your personal details have been saved.",
      });
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to save your profile. Please try again.",
      );
    }
  }

  return (
    <form onSubmit={handleSubmit(save)} noValidate>
      <fieldset
        disabled={isSubmitting || status === "loading"}
        className="space-y-5"
      >
        <FormField
          id="profile-name"
          label="Full Name"
          error={errors.name?.message}
        >
          <input
            {...register("name")}
            id="profile-name"
            autoComplete="name"
            placeholder="Enter your name"
            className={inputClass}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "profile-name-error" : undefined}
          />
        </FormField>
        <FormField
          id="profile-email"
          label="Email Address"
          error={errors.email?.message}
        >
          <input
            {...register("email")}
            id="profile-email"
            type="email"
            autoComplete="email"
            placeholder="Enter your email"
            className={inputClass}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "profile-email-error" : undefined}
          />
        </FormField>
        <FormField
          id="profile-phone"
          label="Phone Number"
          error={errors.phone?.message}
        >
          <input
            {...register("phone")}
            id="profile-phone"
            type="tel"
            autoComplete="tel"
            placeholder="01xxxxxxxxx"
            className={inputClass}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "profile-phone-error" : undefined}
          />
        </FormField>
        <FormMessage error={error} />
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting || status === "loading"}
            className={primaryButton}
          >
            {isSubmitting ? (
              <LoaderCircle size={16} className="animate-spin" />
            ) : (
              <Save size={16} />
            )}{" "}
            {isSubmitting ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </fieldset>
    </form>
  );
}

function ChangePasswordForm() {
  const { update, status } = useSession();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PasswordValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { currentPassword: "", password: "", rePassword: "" },
  });

  async function save(values: PasswordValues) {
    setError("");
    try {
      const session = await update({ password: values });
      if (!session || session.updateError)
        throw new Error(
          session?.updateError || "Your session expired. Please sign in again.",
        );
      reset();
      toast.add({
        type: "success",
        title: "Password changed",
        description: "Your new password is ready to use.",
      });
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to change your password. Please try again.",
      );
    }
  }

  return (
    <form onSubmit={handleSubmit(save)} noValidate>
      <fieldset
        disabled={isSubmitting || status === "loading"}
        className="space-y-5"
      >
        {(
          [
            [
              "currentPassword",
              "Current Password",
              "Enter your current password",
              "current-password",
            ],
            [
              "password",
              "New Password",
              "Enter your new password",
              "new-password",
            ],
            [
              "rePassword",
              "Confirm New Password",
              "Confirm your new password",
              "new-password",
            ],
          ] as const
        ).map(([name, label, placeholder, autoComplete]) => (
          <FormField
            key={name}
            id={name}
            label={label}
            error={errors[name]?.message}
          >
            <PasswordInput
              {...register(name)}
              id={name}
              placeholder={placeholder}
              autoComplete={autoComplete}
              aria-label={label.toLowerCase()}
              aria-invalid={!!errors[name]}
              aria-describedby={
                errors[name]
                  ? `${name}-error`
                  : name === "password"
                    ? "password-hint"
                    : undefined
              }
            />
            {name === "password" && (
              <p id="password-hint" className="mt-1 text-xs text-gray-500">
                Must be at least 6 characters
              </p>
            )}
          </FormField>
        ))}
        <FormMessage error={error} />
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting || status === "loading"}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-600 px-6 py-3 font-semibold text-white shadow-lg shadow-amber-600/20 transition-colors hover:bg-amber-700 disabled:opacity-60"
          >
            {isSubmitting ? (
              <LoaderCircle size={16} className="animate-spin" />
            ) : (
              <LockKeyhole size={16} />
            )}{" "}
            {isSubmitting ? "Changing…" : "Change Password"}
          </button>
        </div>
      </fieldset>
    </form>
  );
}

export default function AccountSettings() {
  const { data: session } = useSession();
  if (!session?.user)
    return (
      <div
        role="status"
        className="flex min-h-64 items-center justify-center gap-3 rounded-3xl border border-gray-100 bg-white p-8 text-gray-500"
      >
        <LoaderCircle size={20} className="animate-spin" aria-hidden="true" />
        Loading your account…
      </div>
    );
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Account Settings</h2>
        <p className="mt-1 text-sm text-gray-500">
          Update your profile information and change your password
        </p>
      </div>
      <section className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
        <div className="border-b border-gray-100 p-6 sm:p-8">
          <div className="mb-6 flex items-center gap-4">
            <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary-100 text-primary-600">
              <UserRound size={24} aria-hidden="true" />
            </span>
            <div>
              <h3 className="font-bold text-gray-900">Profile Information</h3>
              <p className="text-sm text-gray-500">
                Update your personal details
              </p>
            </div>
          </div>
          <ProfileForm user={session.user} />
        </div>
        <div className="bg-gray-50 p-6 sm:p-8">
          <h3 className="mb-4 font-bold text-gray-900">Account Information</h3>
          <dl className="space-y-3 text-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <dt className="text-gray-500">User ID</dt>
              <dd className="break-all font-mono text-xs text-gray-700">
                {session.user.id}
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-gray-500">Role</dt>
              <dd className="rounded-lg bg-primary-100 px-3 py-1 font-medium text-primary-700 capitalize">
                {session.user.role || "user"}
              </dd>
            </div>
          </dl>
        </div>
      </section>
      <section className="overflow-hidden rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6 flex items-center gap-4">
          <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
            <LockKeyhole size={24} aria-hidden="true" />
          </span>
          <div>
            <h3 className="font-bold text-gray-900">Change Password</h3>
            <p className="text-sm text-gray-500">
              Update your account password
            </p>
          </div>
        </div>
        <ChangePasswordForm />
      </section>
    </div>
  );
}
