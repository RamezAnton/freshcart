import { RegisterIntro } from "@/components/auth/AuthIntro";
import RegisterForm from "@/components/auth/RegisterForm";
export const metadata = { title: "Create Account | FreshCart" };
export default function RegisterPage() {
  return (
    <main className="flex-1 bg-gray-50 px-4 py-10 sm:py-16">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-2">
        <RegisterIntro />
        <RegisterForm />
      </div>
    </main>
  );
}
