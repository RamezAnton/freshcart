import type { ReactNode } from "react";
import Link from "next/link";
import { Filter, X } from "lucide-react";

interface ActiveFiltersProps {
  filters: { label: string; icon?: ReactNode }[];
}

export default function ActiveFilters({ filters }: ActiveFiltersProps) {
  if (filters.length === 0) return null;

  return (
    <nav
      aria-label="Active filters"
      className="mb-6 flex flex-wrap items-center gap-3"
    >
      <span className="flex items-center gap-2 text-sm text-gray-600">
        <Filter size={15} aria-hidden="true" />
        Active Filters:
      </span>
      {filters.map(({ label, icon }, index) => (
        <Link
          key={`${label}-${index}`}
          href="/products"
          aria-label={`Remove ${label} filter`}
          className="inline-flex min-w-0 max-w-full items-center gap-2 rounded-full bg-primary-100 px-3 py-1.5 text-sm font-medium text-primary-700 transition-colors hover:bg-primary-200 [&>svg]:shrink-0"
        >
          {icon}
          <span className="truncate">{label}</span>
          <X size={13} aria-hidden="true" />
        </Link>
      ))}
      <Link
        href="/products"
        className="text-sm text-gray-500 underline hover:text-gray-700"
      >
        Clear all
      </Link>
    </nav>
  );
}
