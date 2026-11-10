import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CollectionCardProps {
  name: string;
  image: string;
  href: string;
  variant?: "category" | "brand";
}

export default function CollectionCard({
  name,
  image,
  href,
  variant = "category",
}: CollectionCardProps) {
  const isBrand = variant === "brand";

  return (
    <Link
      href={href}
      className={cn(
        "group block rounded-2xl border border-gray-100 bg-white p-3 text-center shadow-sm transition-[border-color,box-shadow,transform] duration-200 motion-safe:hover:-translate-y-1 sm:p-5",
        isBrand
          ? "hover:border-violet-200 hover:shadow-lg"
          : "hover:border-primary-200 hover:shadow-lg",
      )}
    >
      <div
        className={cn(
          "relative aspect-square overflow-hidden rounded-xl",
          isBrand ? "bg-gray-50" : "bg-gray-100",
        )}
      >
        <Image
          src={image}
          alt=""
          fill
          sizes={
            isBrand
              ? "(max-width: 639px) 50vw, (max-width: 1023px) 25vw, 17vw"
              : "(max-width: 639px) 50vw, (max-width: 767px) 33vw, (max-width: 1023px) 25vw, 20vw"
          }
          className={cn(
            "transition-transform duration-300 motion-safe:group-hover:scale-105",
            isBrand ? "object-contain p-3 sm:p-4" : "object-cover",
          )}
        />
      </div>
      <h2
        className={cn(
          "mt-4 text-sm font-semibold text-gray-900 sm:text-base",
          isBrand
            ? "group-hover:text-violet-600"
            : "group-hover:text-primary-600",
        )}
      >
        {name}
      </h2>
      {!isBrand && (
        <span className="mt-2 flex min-h-5 items-center justify-center gap-1 text-[11px] text-primary-600 sm:text-xs md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100">
          View Subcategories <ArrowRight size={13} aria-hidden="true" />
        </span>
      )}
      {isBrand && <span className="sr-only">Browse {name} products</span>}
    </Link>
  );
}
