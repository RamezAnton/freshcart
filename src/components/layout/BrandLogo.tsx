import Link from "next/link";
import { ShoppingCart } from "lucide-react";

export default function BrandLogo({ footer = false }: { footer?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="FreshCart home"
      className={`inline-flex shrink-0 items-center gap-1.5 ${footer ? "rounded-lg bg-white px-4 py-2" : ""}`}
    >
      <ShoppingCart
        aria-hidden="true"
        className={`${footer ? "size-8" : "size-6 lg:size-8"} text-primary-500`}
        strokeWidth={1.7}
      />
      <span
        className={`${footer ? "text-[28px]" : "text-xl lg:text-[26px]"} font-bold tracking-[-1.2px] text-gray-800`}
      >
        FreshCart
      </span>
    </Link>
  );
}
