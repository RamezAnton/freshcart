"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import {
  CircleUserRound,
  Heart,
  LoaderCircle,
  LogOut,
  MapPin,
  Package,
  Settings,
  UserRound,
} from "lucide-react";
import type { AccountUser } from "@/interfaces/account.interface";
import { toast } from "@/components/ui/toast";

export function SignOutButton({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  const [busy, setBusy] = useState(false);
  async function logout() {
    setBusy(true);
    try {
      onClick?.();
      await signOut({ redirect: false, callbackUrl: "/login" });
      window.location.assign("/login");
    } catch {
      setBusy(false);
      toast.add({
        type: "error",
        title: "Unable to sign out",
        description: "Please try again.",
      });
    }
  }
  return (
    <button
      type="button"
      disabled={busy}
      onClick={() => void logout()}
      className={className}
    >
      {busy ? (
        <LoaderCircle size={14} className="animate-spin" aria-hidden="true" />
      ) : (
        <LogOut size={14} aria-hidden="true" />
      )}
      <span>{busy ? "Signing Out…" : "Sign Out"}</span>
    </button>
  );
}

export const accountLinks = [
  { href: "/profile", label: "My Profile", icon: UserRound },
  { href: "/orders", label: "My Orders", icon: Package },
  { href: "/wishlist", label: "My Wishlist", icon: Heart },
  { href: "/profile/addresses", label: "Addresses", icon: MapPin },
  { href: "/profile/settings", label: "Settings", icon: Settings },
];

export default function AccountMenu({ user }: { user: AccountUser }) {
  const ref = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    function close(event: PointerEvent) {
      if (!ref.current?.contains(event.target as Node) && ref.current)
        ref.current.open = false;
    }
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, []);
  return (
    <details
      ref={ref}
      className="relative"
      onKeyDown={(event) => {
        if (event.key === "Escape" && ref.current?.open) {
          event.preventDefault();
          event.stopPropagation();
          ref.current.open = false;
          ref.current.querySelector("summary")?.focus();
        }
      }}
    >
      <summary
        aria-label="Account"
        className="flex cursor-pointer list-none items-center justify-center rounded-full p-2.5 text-gray-500 transition-colors hover:bg-gray-100 hover:text-primary-600 [&::-webkit-details-marker]:hidden"
      >
        <CircleUserRound size={22} aria-hidden="true" />
      </summary>
      <div className="absolute top-full right-0 z-50 mt-2 w-64 max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl">
        <div className="border-b border-gray-100 p-4">
          <div className="flex items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600">
              <CircleUserRound size={22} aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-gray-800">
                {user.name}
              </p>
              <p className="truncate text-xs text-gray-400">{user.email}</p>
            </div>
          </div>
        </div>
        <nav aria-label="Account links" className="py-2">
          {accountLinks.map(({ href, label, icon: Icon }) => (
            <Link
              href={href}
              key={href}
              onClick={() => {
                if (ref.current) ref.current.open = false;
              }}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 transition-colors hover:bg-primary-50 hover:text-primary-600"
            >
              <Icon size={15} className="text-gray-400" aria-hidden="true" />
              {label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-gray-100 py-2">
          <SignOutButton className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-red-500 transition-colors hover:bg-red-50 disabled:opacity-60" />
        </div>
      </div>
    </details>
  );
}
