"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import {
  ArrowLeft,
  ArrowRight,
  Heart,
  ShoppingCart,
  Trash2,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useWishlist } from "./WishlistProvider";
import { useCart } from "@/components/cart/CartProvider";
import { priceFormatter } from "@/lib/clientUtils";

export default function WishlistPage() {
  const wishlist = useWishlist();
  const cart = useCart();
  const { status } = useSession();
  const empty =
    !wishlist.loading && !wishlist.error && wishlist.items.length === 0;
  return (
    <main className="min-h-screen flex-1 bg-gray-50/50">
      {empty ? (
        <div className="container mx-auto px-4 py-20">
          <div className="mx-auto max-w-sm text-center">
            <span className="mx-auto mb-6 flex size-20 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
              <Heart size={32} aria-hidden="true" />
            </span>
            <h1 className="mb-2 text-xl font-bold text-gray-900">
              Your wishlist is empty
            </h1>
            <p className="mb-6 text-sm leading-relaxed text-gray-500">
              Browse products and save your favorites here.
              {status === "unauthenticated" &&
                " Sign in to sync your wishlist across devices."}
            </p>
            <div className="flex flex-col gap-3">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary-600 px-6 py-3 font-semibold text-white hover:bg-primary-700"
              >
                Browse Products
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              {status === "unauthenticated" && (
                <Link
                  href="/login?callbackUrl=%2Fwishlist"
                  className="rounded-xl border border-gray-200 bg-white px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="border-b border-gray-100 bg-white">
            <div className="container mx-auto px-4 py-8">
              <Breadcrumb className="mb-5">
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink render={<Link href="/" />}>
                      Home
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>/</BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbPage>Wishlist</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              <div className="flex items-center gap-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-500">
                  <Heart size={22} fill="currentColor" aria-hidden="true" />
                </span>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    My Wishlist
                  </h1>
                  {!wishlist.loading &&
                    (!wishlist.error || wishlist.items.length > 0) && (
                      <p className="mt-1 text-sm text-gray-500">
                        {wishlist.items.length}{" "}
                        {wishlist.items.length === 1 ? "item" : "items"} saved
                      </p>
                    )}
                </div>
              </div>
            </div>
          </div>
          <div className="container mx-auto px-4 py-8">
            {wishlist.error && (
              <div
                role="alert"
                className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-700"
              >
                <p>{wishlist.error}</p>
                <button
                  type="button"
                  disabled={wishlist.busy || wishlist.loading}
                  onClick={wishlist.retry}
                  className="font-semibold underline disabled:opacity-50"
                >
                  Reload wishlist
                </button>
              </div>
            )}
            {wishlist.loading ? (
              <div role="status" className="space-y-3">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="h-28 animate-pulse rounded-xl bg-white"
                  />
                ))}
                <span className="sr-only">Loading your wishlist…</span>
              </div>
            ) : (
              wishlist.items.length > 0 && (
                <div className="overflow-hidden rounded-2xl border border-gray-200/70 bg-white">
                  <div
                    aria-hidden="true"
                    className="hidden grid-cols-[minmax(0,1fr)_120px_120px_180px] gap-4 border-b border-gray-100 bg-gray-50 px-6 py-4 text-sm text-gray-500 md:grid"
                  >
                    <span>Product</span>
                    <span className="text-center">Price</span>
                    <span className="text-center">Status</span>
                    <span className="text-center">Actions</span>
                  </div>
                  <ul className="divide-y divide-gray-100">
                    {wishlist.items.map((product, index) => {
                      const discounted =
                        typeof product.priceAfterDiscount === "number" &&
                        product.priceAfterDiscount < product.price;
                      const price = discounted
                        ? product.priceAfterDiscount!
                        : product.price;
                      const inStock = product.quantity > 0;
                      return (
                        <li
                          key={product._id}
                          className="grid grid-cols-[80px_minmax(0,1fr)] items-center gap-4 p-4 sm:p-6 md:grid-cols-[minmax(0,1fr)_120px_120px_180px]"
                        >
                          <Link
                            href={`/products/${product._id}`}
                            className="col-span-2 flex min-w-0 items-center gap-4 md:col-span-1"
                          >
                            <span className="relative size-20 shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
                              <Image
                                src={product.imageCover}
                                alt={product.title}
                                fill
                                sizes="80px"
                                loading={index === 0 ? "eager" : "lazy"}
                                className="object-contain p-2"
                              />
                            </span>
                            <span className="min-w-0">
                              <span className="block font-medium text-gray-900 hover:text-primary-600">
                                {product.title}
                              </span>
                              <span className="mt-1 block text-sm text-gray-500">
                                {product.category.name}
                              </span>
                            </span>
                          </Link>
                          <div className="col-span-2 flex items-baseline gap-2 md:col-span-1 md:block md:text-center">
                            <p className="font-semibold text-gray-900">
                              {priceFormatter(price)}
                            </p>
                            {discounted && (
                              <p className="mt-1 text-xs text-gray-400 line-through">
                                {priceFormatter(product.price)}
                              </p>
                            )}
                          </div>
                          <span
                            className={`col-span-2 w-fit rounded-full px-3 py-1 text-xs font-medium md:col-span-1 md:mx-auto ${inStock ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"}`}
                          >
                            <span aria-hidden="true">● </span>
                            {inStock ? "In Stock" : "Out of Stock"}
                          </span>
                          <div className="col-span-2 flex items-center gap-2 md:col-span-1 md:justify-end">
                            <button
                              type="button"
                              disabled={!inStock || cart.busy || cart.loading}
                              onClick={() => void cart.addItem(product, price)}
                              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-50"
                            >
                              <ShoppingCart size={15} aria-hidden="true" />
                              Add to Cart
                            </button>
                            <button
                              type="button"
                              aria-label={`Remove ${product.title} from wishlist`}
                              disabled={wishlist.busy}
                              onClick={() => void wishlist.remove(product._id)}
                              className="rounded-lg border border-gray-200 p-2.5 text-gray-400 hover:border-red-200 hover:bg-red-50 hover:text-red-500 disabled:opacity-50"
                            >
                              <Trash2 size={16} aria-hidden="true" />
                            </button>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )
            )}
            <Link
              href="/products"
              className="mt-8 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary-600"
            >
              <ArrowLeft size={15} aria-hidden="true" />
              Continue Shopping
            </Link>
          </div>
        </>
      )}
    </main>
  );
}
