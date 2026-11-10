import { LoginIntro } from "@/components/auth/AuthIntro";
import LoginForm from "@/components/auth/LoginForm";
export const metadata = { title: "Sign In | FreshCart" };
export default function LoginPage() {
  return (
    <main className="flex flex-1 items-center bg-gray-50 px-4 py-10 sm:py-16">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-2">
        <LoginIntro />
        <LoginForm />
      </div>
    </main>
  );
}
