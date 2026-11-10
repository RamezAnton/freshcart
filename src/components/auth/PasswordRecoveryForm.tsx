"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { ArrowLeft, Check, KeyRound, LockKeyhole, Mail } from "lucide-react";
import {
  sendResetCode,
  verifyResetCode,
  resetPassword,
} from "@/actions/auth.action";
import {
  forgotPasswordSchema,
  resetCodeSchema,
  resetPasswordSchema,
} from "@/schema/auth.schema";
import { AuthBrand } from "./LoginForm";
import {
  AuthError,
  AuthField,
  AuthInput,
  PasswordStrength,
  SubmitLabel,
  authSubmitClass,
  useAuthReturn,
} from "./AuthControls";

export default function PasswordRecoveryForm() {
  const { suffix } = useAuthReturn();
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setError("");
    setNotice("");
    const values =
      step === 0
        ? forgotPasswordSchema.safeParse({ email })
        : step === 1
          ? resetCodeSchema.safeParse({ resetCode: code })
          : resetPasswordSchema.safeParse({
            email,
            newPassword: password,
            rePassword: confirmation,
          });
    if (!values.success) {
      setError(values.error.issues[0].message);
      return;
    }
    setBusy(true);
    try {
      const result =
        step === 0
          ? await sendResetCode({ email })
          : step === 1
            ? await verifyResetCode({ resetCode: code })
            : await resetPassword({
              email,
              newPassword: password,
              rePassword: confirmation,
            });
      if (!result.success) {
        setError(result.message);
        return;
      }
      if (step === 0) setEmail(email.trim());
      setStep(step + 1);
      setPassword("");
      setConfirmation("");
    } catch {
      setError("We couldn't connect. Please try again.");
    } finally {
      setBusy(false);
    }
  }
  async function resend() {
    if (busy) return;
    setBusy(true);
    setError("");
    setNotice("");
    try {
      const result = await sendResetCode({ email });
      if (result.success) {
        setCode("");
        setNotice(
          "A new verification code has been sent. Check your inbox and spam folder.",
        );
      } else setError(result.message);
    } catch {
      setError("We couldn't send the code. Please try again.");
    } finally {
      setBusy(false);
    }
  }
  const titles = [
    "Forgot Password?",
    "Check Your Email",
    "Create New Password",
    "Password Reset!",
  ];
  return (
    <div className="rounded-2xl bg-white p-6 shadow-xl sm:p-8 lg:p-12">
      <AuthBrand />
      <h1 className="text-center text-3xl font-bold text-gray-800">
        {titles[step]}
      </h1>
      <p className="mt-3 text-center leading-relaxed text-gray-500">
        {step === 0 ? (
          "No worries, we'll send you a reset code"
        ) : step === 1 ? (
          <>
            We sent a 6-digit verification code to{" "}
            <strong className="break-all text-gray-700">{email}</strong>
          </>
        ) : step === 2 ? (
          "Your new password must be different from previously used passwords"
        ) : (
          "Your password has been changed. Sign in with your new password."
        )}
      </p>
      <ol
        aria-label="Password recovery progress"
        className="my-8 flex items-center justify-center"
      >
        {[Mail, KeyRound, LockKeyhole].map((Icon, i) => (
          <li
            key={i}
            aria-current={i === step ? "step" : undefined}
            className="flex items-center"
          >
            {i > 0 && (
              <span
                className={`h-0.5 w-10 sm:w-14 ${step >= i ? "bg-primary-500" : "bg-gray-200"}`}
              />
            )}
            <span
              aria-label={`${["Email", "Verify code", "New password"][i]}${step > i ? " complete" : ""}`}
              className={`flex size-10 items-center justify-center rounded-full ${step >= i ? "bg-primary-600 text-white" : "bg-gray-100 text-gray-400"}`}
            >
              {step > i ? <Check size={18} /> : <Icon size={18} />}
            </span>
          </li>
        ))}
      </ol>
      {step < 3 ? (
        <form noValidate onSubmit={submit} className="space-y-5">
          <AuthError message={error} />
          {notice && (
            <p
              role="status"
              className="rounded-xl bg-primary-50 p-3 text-sm text-primary-700"
            >
              {notice}
            </p>
          )}
          {step === 0 ? (
            <AuthField id="recovery-email" label="Email Address">
              <AuthInput
                id="recovery-email"
                type="email"
                icon={Mail}
                autoComplete="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={busy}
              />
            </AuthField>
          ) : step === 1 ? (
            <>
              <AuthField id="reset-code" label="Verification Code">
                <AuthInput
                  id="reset-code"
                  className="text-center text-2xl tracking-[0.5em]"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={6}
                  placeholder="000000"
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                  disabled={busy}
                  aria-describedby="code-help"
                />
              </AuthField>
              <p id="code-help" className="text-center text-sm text-gray-500">
                Didn&apos;t receive the code?{" "}
                <button
                  type="button"
                  disabled={busy}
                  onClick={resend}
                  className="font-semibold text-primary-600 hover:underline disabled:opacity-50"
                >
                  Resend Code
                </button>
              </p>
            </>
          ) : (
            <>
              <AuthField id="new-password" label="New Password">
                <AuthInput
                  id="new-password"
                  password
                  icon={LockKeyhole}
                  aria-label="new password"
                  autoComplete="new-password"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={busy}
                />
                <PasswordStrength value={password} />
              </AuthField>
              <AuthField id="confirm-password" label="Confirm New Password">
                <AuthInput
                  id="confirm-password"
                  password
                  icon={LockKeyhole}
                  aria-label="confirm new password"
                  autoComplete="new-password"
                  placeholder="Confirm new password"
                  value={confirmation}
                  onChange={(e) => setConfirmation(e.target.value)}
                  disabled={busy}
                />
              </AuthField>
            </>
          )}
          <button disabled={busy} className={authSubmitClass}>
            <SubmitLabel busy={busy}>
              {["Send Reset Code", "Verify Code", "Reset Password"][step]}
            </SubmitLabel>
          </button>
        </form>
      ) : (
        <Link href={`/login${suffix}`} className={authSubmitClass}>
          Sign In
        </Link>
      )}
      {step === 1 && (
        <button
          type="button"
          disabled={busy}
          onClick={() => {
            setStep(0);
            setError("");
            setNotice("");
            setCode("");
          }}
          className="mx-auto mt-6 block text-sm text-gray-500 hover:text-primary-600"
        >
          Change email address
        </button>
      )}
      <Link
        href={`/login${suffix}`}
        className="mt-6 flex items-center justify-center gap-2 text-sm font-medium text-gray-600 hover:text-primary-600"
      >
        <ArrowLeft size={16} />
        Back to Sign In
      </Link>
    </div>
  );
}
