import Link from "next/link";
import { PackageOpen } from "lucide-react";

export default function NoProducts() {
  return (
    <div className="flex flex-col items-center px-4 py-24 text-center sm:py-28">
      <span className="mb-6 flex size-20 items-center justify-center rounded-full bg-gray-100 text-gray-400">
        <PackageOpen size={32} aria-hidden="true" />
      </span>
      <h2 className="mb-2 text-lg font-bold text-gray-900">
        No Products Found
      </h2>
      <p className="mb-6 text-gray-500">
        No products match your current filters.
      </p>
      <Link
        href="/products"
        className="rounded-xl bg-primary-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-700"
      >
        View All Products
      </Link>
    </div>
  );
}
