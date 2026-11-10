import { RecoveryIntro } from "@/components/auth/AuthIntro";
import PasswordRecoveryForm from "@/components/auth/PasswordRecoveryForm";
export const metadata = { title: "Reset Password | FreshCart" };
export default function ForgotPasswordPage() {
  return (
    <main className="flex flex-1 items-center bg-gray-50 px-4 py-10 sm:py-16">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-2">
        <RecoveryIntro />
        <PasswordRecoveryForm />
      </div>
    </main>
  );
}
