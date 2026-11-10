"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import {
  ArrowLeft,
  ArrowRight,
  LoaderCircle,
  LockKeyhole,
  Minus,
  PackageOpen,
  Plus,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Tag,
  Trash2,
  Truck,
  UserRound,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import RemoveCartItemDialog from "./RemoveCartItemDialog";
import AccountDialog from "@/components/account/AccountDialog";
import { inputClass, primaryButton } from "@/components/account/FormControls";
import { priceFormatter } from "@/lib/clientUtils";
import { useCart } from "./CartProvider";
import { toast } from "@/components/ui/toast";

export default function ShoppingCartPage() {
  const { data: session } = useSession();
  const cart = useCart();
  const [removing, setRemoving] = useState<{
    id: string;
    title: string;
  } | null>(null);
  const [removeError, setRemoveError] = useState("");
  const [clearing, setClearing] = useState(false);
  const [promoOpen, setPromoOpen] = useState(false);
  const [coupon, setCoupon] = useState("");
  const count = cart.items.reduce((total, item) => total + item.count, 0);
  const total = cart.discountedSubtotal ?? cart.subtotal;
  const freeShipping = total > 500;

  async function applyCoupon(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (await cart.applyCoupon(coupon)) {
      setPromoOpen(false);
      toast.add({ type: "success", title: "Promo code applied" });
    }
  }

  return (
    <main
      className={`flex-1 ${!cart.loading && !cart.items.length && !cart.error ? "bg-white" : "bg-gray-50/80"}`}
    >
      <div className="container mx-auto px-4 py-8 sm:py-10">
        {(cart.loading || cart.items.length > 0 || cart.error) && (
          <div className="mb-8">
            <Breadcrumb className="mb-4">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink render={<Link href="/" />}>
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>/</BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage>Shopping Cart</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <h1 className="flex items-center gap-3 text-2xl font-bold text-gray-900 sm:text-3xl">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary-600 text-white">
                <ShoppingCart size={26} aria-hidden="true" />
              </span>
              Shopping Cart
            </h1>
            {!cart.loading && (!cart.error || cart.items.length > 0) && (
              <p className="mt-2 text-gray-500">
                You have{" "}
                <span className="font-semibold text-primary-600">
                  {count} {count === 1 ? "item" : "items"}
                </span>{" "}
                in your cart
              </p>
            )}
          </div>
        )}
        {cart.error && (
          <div
            role="alert"
            className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-700"
          >
            <p>{cart.error}</p>
            <button
              type="button"
              disabled={cart.busy || cart.loading}
              onClick={cart.retry}
              className="font-semibold underline disabled:opacity-50"
            >
              Reload cart
            </button>
          </div>
        )}
        {cart.loading ? (
          <div role="status" className="grid gap-8 lg:grid-cols-3">
            <div className="space-y-4 lg:col-span-2">
              {[0, 1].map((key) => (
                <div
                  key={key}
                  className="h-52 animate-pulse rounded-2xl border border-gray-100 bg-white"
                />
              ))}
            </div>
            <div className="h-80 animate-pulse rounded-2xl border border-gray-100 bg-white" />
            <span className="sr-only">Loading your cart…</span>
          </div>
        ) : cart.items.length === 0 ? (
          !cart.error && (
            <div className="flex min-h-[55vh] flex-col items-center justify-center px-4 py-16 text-center">
              <span className="mb-8 flex size-28 items-center justify-center rounded-full bg-gray-100 text-gray-300 sm:size-32">
                <PackageOpen size={48} aria-hidden="true" />
              </span>
              <h1 className="mb-3 text-2xl font-bold text-gray-900">
                Your cart is empty
              </h1>
              <p className="max-w-md leading-relaxed text-gray-500">
                Looks like you haven&apos;t added anything to your cart yet.
                <br />
                Start exploring our products!
              </p>
              <Link href="/products" className={`${primaryButton} mt-8 px-8`}>
                Start Shopping
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
          )
        ) : (
          <div className="grid items-start gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {cart.items.map(({ product, count, price }) => (
                  <article
                    key={product._id}
                    className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5"
                  >
                    <div className="flex gap-4 sm:gap-6">
                      <Link
                        href={`/products/${product._id}`}
                        className="group relative h-fit shrink-0"
                      >
                        <div className="relative size-28 overflow-hidden rounded-xl border border-gray-100 bg-gray-50 sm:size-32">
                          <Image
                            src={product.imageCover}
                            alt={product.title}
                            fill
                            sizes="(max-width: 640px) 112px, 128px"
                            className="object-contain p-3 transition-transform group-hover:scale-105 sm:p-3"
                          />
                        </div>
                      </Link>
                      <div className="flex min-w-0 flex-1 flex-col">
                        <Link
                          href={`/products/${product._id}`}
                          className="mb-2 text-base leading-relaxed font-semibold text-gray-900 hover:text-primary-600 sm:text-lg"
                        >
                          {product.title}
                        </Link>
                        <div className="mb-3 flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-primary-50 px-2.5 py-1 text-xs font-medium text-primary-700">
                            {product.category?.name || "Product"}
                          </span>
                        </div>
                        <p className="mb-4 flex flex-wrap items-baseline gap-2">
                          <span className="text-lg font-bold text-primary-600">
                            {priceFormatter(price)}
                          </span>
                        </p>
                        <div className="mt-auto flex flex-wrap items-center justify-between gap-4">
                          <div className="flex items-center rounded-xl border border-gray-200 bg-gray-50 p-1">
                            <button
                              type="button"
                              aria-label={`Decrease quantity of ${product.title}`}
                              disabled={cart.busy || count <= 1}
                              onClick={() =>
                                void cart.setQuantity(product._id, count - 1)
                              }
                              className="flex size-8 items-center justify-center rounded-lg bg-white text-gray-500 shadow-sm hover:bg-gray-100 disabled:opacity-40"
                            >
                              <Minus size={14} aria-hidden="true" />
                            </button>
                            <span
                              aria-live="polite"
                              className="w-10 text-center font-bold text-gray-900 sm:w-12"
                            >
                              {count}
                            </span>
                            <button
                              type="button"
                              aria-label={`Increase quantity of ${product.title}`}
                              disabled={
                                cart.busy ||
                                count >= Math.min(999, product.quantity ?? 999)
                              }
                              onClick={() =>
                                void cart.setQuantity(product._id, count + 1)
                              }
                              className="flex size-8 items-center justify-center rounded-lg bg-primary-600 text-white shadow-sm hover:bg-primary-700 disabled:opacity-40"
                            >
                              <Plus size={14} aria-hidden="true" />
                            </button>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="text-right">
                              <p className="mb-0.5 text-xs text-gray-400">
                                Total
                              </p>
                              <p className="font-bold text-gray-900 sm:text-xl">
                                {priceFormatter(price * count).replace(
                                  / EGP$/,
                                  "",
                                )}{" "}
                                <span className="text-sm font-normal text-gray-500">
                                  EGP
                                </span>
                              </p>
                            </div>
                            <button
                              type="button"
                              aria-label={`Remove ${product.title} from cart`}
                              disabled={cart.busy}
                              onClick={() => {
                                setRemoveError("");
                                setRemoving({
                                  id: product._id,
                                  title: product.title,
                                });
                              }}
                              className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-red-200 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white disabled:opacity-40"
                            >
                              <Trash2 size={16} aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-gray-200 pt-6">
                <Link
                  href="/products"
                  className="flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700"
                >
                  <ArrowLeft size={15} aria-hidden="true" />
                  Continue Shopping
                </Link>
                <button
                  type="button"
                  disabled={cart.busy}
                  onClick={() => setClearing(true)}
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-red-500 disabled:opacity-50"
                >
                  <Trash2 size={14} aria-hidden="true" />
                  Clear all items
                </button>
              </div>
            </div>
            <aside className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm lg:sticky lg:top-24">
              <div
                className={`px-6 py-4 text-white ${session ? "bg-linear-to-r from-primary-600 to-primary-700" : "bg-gray-900"}`}
              >
                <h2 className="flex items-center gap-2 text-lg font-bold">
                  {session && <ShoppingBag size={18} aria-hidden="true" />}Order
                  Summary
                </h2>
                {session && (
                  <p className="mt-1 text-sm text-primary-100">
                    {count} {count === 1 ? "item" : "items"} in your cart
                  </p>
                )}
              </div>
              <div className="space-y-5 p-6">
                {session && freeShipping && (
                  <div className="flex items-center gap-3 rounded-xl bg-green-50 p-4">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                      <Truck size={20} aria-hidden="true" />
                    </span>
                    <div>
                      <p className="font-semibold text-green-700">
                        Free Shipping!
                      </p>
                      <p className="text-sm text-green-600">
                        You qualify for free delivery
                      </p>
                    </div>
                  </div>
                )}
                <dl className="space-y-3">
                  <div className="flex justify-between gap-3 text-gray-600">
                    <dt>
                      Subtotal
                      {!session &&
                        ` (${count} ${count === 1 ? "item" : "items"})`}
                    </dt>
                    <dd className="font-medium text-gray-900">
                      {priceFormatter(cart.subtotal)}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-3 text-gray-600">
                    <dt>Shipping</dt>
                    <dd className="text-right text-sm font-medium text-primary-600">
                      {session && freeShipping
                        ? "FREE"
                        : "Calculated at checkout"}
                    </dd>
                  </div>
                  {cart.discountedSubtotal !== undefined && (
                    <div className="flex justify-between gap-3 text-primary-600">
                      <dt>Discount</dt>
                      <dd>−{priceFormatter(cart.subtotal - total)}</dd>
                    </div>
                  )}
                  <div className="flex flex-wrap items-baseline justify-between gap-2 border-t border-dashed border-gray-200 pt-3">
                    <dt className="font-semibold text-gray-900">
                      {session && freeShipping ? "Total" : "Estimated Total"}
                    </dt>
                    <dd
                      className={`text-xl font-bold ${session ? "text-gray-900" : "text-primary-600"}`}
                    >
                      {priceFormatter(total)}
                    </dd>
                  </div>
                </dl>
                {session ? (
                  <>
                    <button
                      type="button"
                      disabled={cart.busy}
                      onClick={() => setPromoOpen(!promoOpen)}
                      aria-expanded={promoOpen}
                      aria-controls="cart-promo"
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 py-3 text-sm font-medium text-gray-600 hover:border-primary-400 hover:bg-primary-50 hover:text-primary-600"
                    >
                      <Tag size={15} aria-hidden="true" />
                      Apply Promo Code
                    </button>
                    {promoOpen && (
                      <form
                        id="cart-promo"
                        onSubmit={applyCoupon}
                        className="space-y-3"
                      >
                        <label
                          htmlFor="coupon"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Promo Code
                        </label>
                        <input
                          id="coupon"
                          required
                          maxLength={100}
                          value={coupon}
                          onChange={(event) => setCoupon(event.target.value)}
                          placeholder="Enter your code"
                          className={inputClass}
                          disabled={cart.busy}
                        />
                        <button
                          type="submit"
                          disabled={cart.busy}
                          className={`${primaryButton} w-full py-2.5`}
                        >
                          {cart.busy ? "Applying…" : "Apply Code"}
                        </button>
                      </form>
                    )}
                    <div>
                      <Link
                        href="/checkout"
                        className={`${primaryButton} w-full py-4`}
                      >
                        <LockKeyhole size={17} aria-hidden="true" />
                        Secure Checkout
                      </Link>
                    </div>
                    <div className="flex flex-wrap justify-center gap-4 py-2 text-xs text-gray-500">
                      <span className="flex items-center gap-1.5">
                        <ShieldCheck
                          size={14}
                          className="text-primary-500"
                          aria-hidden="true"
                        />
                        Secure Payment
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Truck
                          size={14}
                          className="text-blue-500"
                          aria-hidden="true"
                        />
                        Fast Delivery
                      </span>
                    </div>
                    <Link
                      href="/products"
                      className="block py-2 text-center text-sm font-medium text-primary-600 hover:text-primary-700"
                    >
                      ← Continue Shopping
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login?callbackUrl=%2Fcart"
                      className={`${primaryButton} w-full`}
                    >
                      <UserRound size={17} aria-hidden="true" />
                      Login to Checkout
                    </Link>
                    <p className="text-center text-xs text-gray-400">
                      Don&apos;t have an account?{" "}
                      <Link
                        href="/register?callbackUrl=%2Fcart"
                        className="text-primary-600 hover:underline"
                      >
                        Sign up
                      </Link>
                    </p>
                    <ul className="space-y-2 border-t border-gray-100 pt-4 text-xs text-gray-500">
                      <li>✓ Your cart items will be saved</li>
                      <li>✓ Track your orders easily</li>
                      <li>✓ Access exclusive member deals</li>
                    </ul>
                  </>
                )}
              </div>
            </aside>
          </div>
        )}
      </div>
      {removing && (
        <RemoveCartItemDialog
          title={removing.title}
          busy={cart.busy}
          error={removeError}
          onClose={() => setRemoving(null)}
          onRemove={async () => {
            if (await cart.removeItem(removing.id)) setRemoving(null);
            else
              setRemoveError(
                "The item could not be removed. Please try again.",
              );
          }}
        />
      )}
      {clearing && (
        <AccountDialog
          title="Clear your cart?"
          busy={cart.busy}
          onClose={() => setClearing(false)}
        >
          <p className="text-sm text-gray-600">
            Remove all {count} items from your cart?
          </p>
          <div className="mt-6 flex gap-3">
            <button
              type="button"
              disabled={cart.busy}
              onClick={() => setClearing(false)}
              className="flex-1 rounded-xl bg-gray-100 px-4 py-3 font-semibold text-gray-700 hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={cart.busy}
              onClick={async () => {
                if (await cart.clear()) setClearing(false);
              }}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 font-semibold text-white hover:bg-red-700 disabled:opacity-60"
            >
              {cart.busy && <LoaderCircle size={16} className="animate-spin" />}
              Clear Cart
            </button>
          </div>
        </AccountDialog>
      )}
    </main>
  );
}
