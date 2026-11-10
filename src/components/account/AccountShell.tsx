"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ChevronRight, MapPin, Settings } from "lucide-react";

export default function AccountShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated")
      router.replace(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
  }, [status, pathname, router]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
        <aside className="w-full shrink-0 lg:w-72">
          <nav
            aria-label="My account"
            className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
          >
            <h2 className="border-b border-gray-100 p-4 font-bold text-gray-900">
              My Account
            </h2>
            <ul className="flex gap-1 p-2 lg:block">
              {[
                {
                  href: "/profile/addresses",
                  label: "My Addresses",
                  icon: MapPin,
                },
                {
                  href: "/profile/settings",
                  label: "Settings",
                  icon: Settings,
                },
              ].map(({ href, label, icon: Icon }) => {
                const active = pathname === href;
                return (
                  <li key={href} className="flex-1">
                    <Link
                      href={href}
                      aria-current={active ? "page" : undefined}
                      className={`group flex items-center gap-3 rounded-xl px-3 py-3 transition-colors sm:px-4 ${active ? "bg-primary-50 text-primary-700" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}
                    >
                      <span
                        className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${active ? "bg-primary-500 text-white" : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"}`}
                      >
                        <Icon size={17} aria-hidden="true" />
                      </span>
                      <span className="flex-1 text-sm font-medium sm:text-base">
                        {label}
                      </span>
                      <ChevronRight
                        size={14}
                        className="hidden sm:block"
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
