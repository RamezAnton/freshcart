"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  Gift,
  Headset,
  Heart,
  Mail,
  Menu,
  Phone,
  Search,
  ShoppingCart,
  Truck,
  UserRound,
  UserRoundPlus,
  X,
} from "lucide-react";
import BrandLogo from "../BrandLogo";
import { categoryLinks } from "../navigation";
import { useSession } from "next-auth/react";
import AccountMenu, { accountLinks, SignOutButton } from "./AccountMenu";
import { useWishlist } from "@/components/wishlist/WishlistProvider";
import { useCart } from "@/components/cart/CartProvider";

function ProductSearch({ mobile = false }: { mobile?: boolean }) {
  return (
    <form
      action="/products"
      role="search"
      className={
        mobile ? "w-full" : "hidden min-w-0 flex-1 lg:block lg:max-w-2xl"
      }
    >
      <div className="relative">
        <label
          htmlFor={mobile ? "mobile-product-search" : "product-search"}
          className="sr-only"
        >
          Search products
        </label>
        <input
          id={mobile ? "mobile-product-search" : "product-search"}
          name="search"
          type="search"
          placeholder="Search for products, brands and more..."
          className="w-full rounded-full border border-gray-200 bg-gray-50/50 py-3 pr-12 pl-5 text-sm text-gray-700 placeholder:text-gray-400 focus:border-primary-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20"
        />
        <button
          type="submit"
          aria-label="Search"
          className="absolute top-1/2 right-1.5 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-primary-600 text-white transition-colors hover:bg-primary-700"
        >
          <Search size={16} aria-hidden="true" />
        </button>
      </div>
    </form>
  );
}

export default function Navbar() {
  const { items } = useCart();
  const wishlist = useWishlist();
  const cartCount = items.reduce((total, item) => total + item.count, 0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const categoryButton = useRef<HTMLButtonElement>(null);
  const navLink =
    "font-medium text-gray-700 transition-colors hover:text-primary-600";

  const links = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Shop" },
    { href: "/brands", label: "Brands" },
  ];

  const { data: session, status } = useSession();
  const user = session?.user ?? null;
  return (
    <>
      <div className="hidden border-b border-gray-100 bg-white text-sm lg:block">
        <div className="container mx-auto px-4">
          <div className="flex h-10 items-center justify-between gap-4">
            <div className="flex items-center gap-6 text-gray-500">
              <span className="flex items-center gap-2">
                <Truck
                  size={14}
                  className="text-primary-600"
                  aria-hidden="true"
                />
                Free Shipping on Orders 500 EGP
              </span>
              <span className="hidden items-center gap-2 xl:flex">
                <Gift
                  size={14}
                  className="text-primary-600"
                  aria-hidden="true"
                />
                New Arrivals Daily
              </span>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4 text-gray-500">
                <a
                  href="tel:+18001234567"
                  className="flex items-center gap-1.5 transition-colors hover:text-primary-600"
                >
                  <Phone size={13} aria-hidden="true" />
                  +1 (800) 123-4567
                </a>
                <a
                  href="mailto:support@freshcart.com"
                  className="flex items-center gap-1.5 transition-colors hover:text-primary-600"
                >
                  <Mail size={13} aria-hidden="true" />
                  support@freshcart.com
                </a>
              </div>
              <span className="h-4 w-px bg-gray-200" aria-hidden="true" />
              <div className="flex items-center gap-4 text-gray-600">
                {status === "loading" && !user ? (
                  <span
                    className="h-4 w-36 animate-pulse rounded bg-gray-100"
                    aria-label="Loading account"
                  />
                ) : user ? (
                  <>
                    <Link
                      href="/profile"
                      className="flex items-center gap-1.5 hover:text-primary-600"
                    >
                      <UserRound size={13} aria-hidden="true" />
                      <span className="max-w-36 truncate">{user.name}</span>
                    </Link>
                    <SignOutButton className="flex items-center gap-1.5 hover:text-red-500 disabled:opacity-60" />
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="flex items-center gap-1.5 hover:text-primary-600"
                    >
                      <UserRound size={13} aria-hidden="true" />
                      Sign In
                    </Link>
                    <Link
                      href="/register"
                      className="flex items-center gap-1.5 hover:text-primary-600"
                    >
                      <UserRoundPlus size={14} aria-hidden="true" />
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <header
        className="sticky top-0 z-40 bg-white shadow-sm"
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            if (categoriesOpen) {
              setCategoriesOpen(false);
              categoryButton.current?.focus();
            } else if (mobileOpen) {
              setMobileOpen(false);
              menuButton.current?.focus();
            }
          }
        }}
      >
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between gap-4 lg:h-18 lg:gap-5 2xl:gap-8">
            <BrandLogo />
            <ProductSearch />
            <nav
              aria-label="Main navigation"
              className="hidden shrink-0 items-center gap-6 xl:flex"
            >
              <Link href="/" className={navLink}>
                Home
              </Link>
              <Link href="/products" className={navLink}>
                Shop
              </Link>
              <div
                className="relative"
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget))
                    setCategoriesOpen(false);
                }}
              >
                <button
                  ref={categoryButton}
                  type="button"
                  aria-expanded={categoriesOpen}
                  aria-controls="desktop-categories"
                  onClick={() => setCategoriesOpen(!categoriesOpen)}
                  className={`flex items-center gap-1.5 py-2 ${navLink}`}
                >
                  Categories
                  <ChevronDown
                    size={12}
                    aria-hidden="true"
                    className={`transition-transform ${categoriesOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {categoriesOpen && (
                  <div
                    id="desktop-categories"
                    className="absolute top-full left-0 min-w-52 rounded-xl border border-gray-100 bg-white py-2 shadow-xl"
                  >
                    {categoryLinks.map(({ href, label }) => (
                      <Link
                        key={href}
                        href={href}
                        onClick={() => setCategoriesOpen(false)}
                        className="block px-4 py-2.5 text-sm text-gray-600 transition-colors hover:bg-primary-50 hover:text-primary-600"
                      >
                        {label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <Link href="/brands" className={navLink}>
                Brands
              </Link>
            </nav>
            <div className="flex shrink-0 items-center gap-1 lg:gap-2">
              <Link
                href="/contact"
                aria-label="Support — 24/7 Help"
                className="mr-2 hidden items-center gap-2 border-r border-gray-200 pr-3 transition-opacity hover:opacity-80 lg:flex"
              >
                <span className="flex size-10 items-center justify-center rounded-full bg-primary-50 text-primary-600">
                  <Headset size={19} aria-hidden="true" />
                </span>
                <span className="hidden text-xs 2xl:block">
                  <span className="block text-gray-400">Support</span>
                  <span className="font-semibold text-gray-700">24/7 Help</span>
                </span>
              </Link>
              <Link
                href="/wishlist"
                aria-label={`Wishlist, ${wishlist.items.length} saved ${wishlist.items.length === 1 ? "item" : "items"}`}
                className="relative rounded-full p-2.5 text-gray-500 transition-colors hover:bg-gray-100 hover:text-primary-600"
              >
                <Heart size={22} aria-hidden="true" />
                {wishlist.items.length > 0 && (
                  <span className="absolute top-0 right-0 flex size-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-semibold text-white">
                    {wishlist.items.length}
                  </span>
                )}
              </Link>
              <Link
                href="/cart"
                aria-label={`Shopping cart, ${cartCount} ${cartCount === 1 ? "item" : "items"}`}
                className="relative rounded-full p-2.5 text-gray-500 transition-colors hover:bg-gray-100 hover:text-primary-600"
              >
                <ShoppingCart size={23} aria-hidden="true" />
                {cartCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-primary-600 px-1 text-[10px] font-bold text-white ring-2 ring-white">
                    {cartCount}
                  </span>
                )}
              </Link>
              {status === "loading" && !user ? (
                <span
                  className="hidden size-10 animate-pulse rounded-full bg-gray-100 lg:block"
                  aria-label="Loading account"
                />
              ) : user ? (
                <div className="hidden lg:block">
                  <AccountMenu user={user} />
                </div>
              ) : (
                <Link
                  href="/login"
                  className="ml-2 hidden items-center gap-2 rounded-full bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-primary-600/20 transition-colors hover:bg-primary-700 lg:flex"
                >
                  <UserRound size={14} aria-hidden="true" />
                  Sign In
                </Link>
              )}
              <button
                ref={menuButton}
                type="button"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                aria-controls="mobile-navigation"
                onClick={() => setMobileOpen(!mobileOpen)}
                className="ml-1 flex size-10 items-center justify-center rounded-full bg-primary-600 text-white transition-colors hover:bg-primary-700 lg:hidden"
              >
                {mobileOpen ? (
                  <X size={20} aria-hidden="true" />
                ) : (
                  <Menu size={20} aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
          <nav
            aria-label="Tablet navigation"
            className="hidden items-center gap-6 border-t border-gray-100 py-3 lg:flex xl:hidden"
          >
            <Link className={navLink} href="/">
              Home
            </Link>
            <Link className={navLink} href="/products">
              Shop
            </Link>
            <Link className={navLink} href="/categories">
              Categories
            </Link>
            <Link className={navLink} href="/brands">
              Brands
            </Link>
          </nav>
          {mobileOpen && (
            <div
              id="mobile-navigation"
              className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-gray-100 py-4 lg:hidden"
            >
              <ProductSearch mobile />
              <nav
                aria-label="Mobile navigation"
                className="mt-4 flex flex-col"
                onClick={(event) => {
                  if ((event.target as HTMLElement).closest("a"))
                    setMobileOpen(false);
                }}
              >
                {links.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className={`rounded-lg px-3 py-2.5 hover:bg-gray-50 ${navLink}`}
                  >
                    {label}
                  </Link>
                ))}
                <details className="px-3 py-2.5 text-gray-700">
                  <summary className="cursor-pointer font-medium">
                    Categories
                  </summary>
                  <div className="mt-2 flex flex-col">
                    {categoryLinks.map(({ href, label }) => (
                      <Link
                        key={href}
                        href={href}
                        className="rounded-lg px-3 py-2 text-sm hover:bg-primary-50 hover:text-primary-600"
                      >
                        {label}
                      </Link>
                    ))}
                  </div>
                </details>
                {user ? (
                  <div className="mt-3 border-t border-gray-100 pt-4">
                    <p className="px-3 pb-2 text-sm font-semibold text-gray-900">
                      {user.name}
                    </p>
                    {accountLinks.map(({ href, label, icon: Icon }) => (
                      <Link
                        key={href}
                        href={href}
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-600 hover:bg-primary-50 hover:text-primary-600"
                      >
                        <Icon size={16} aria-hidden="true" />
                        {label}
                      </Link>
                    ))}
                    <SignOutButton className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-500 hover:bg-red-50" />
                  </div>
                ) : status === "unauthenticated" ? (
                  <div className="mt-3 flex gap-3 border-t border-gray-100 pt-4">
                    <Link
                      href="/login"
                      className="flex-1 rounded-full bg-primary-600 px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-primary-700"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/register"
                      className="flex-1 rounded-full border border-gray-200 px-4 py-2.5 text-center text-sm font-semibold text-gray-700 hover:bg-gray-50"
                    >
                      Sign Up
                    </Link>
                  </div>
                ) : null}
                <a
                  href="mailto:support@freshcart.com"
                  className="mt-4 flex items-center gap-2 px-3 text-sm text-gray-500"
                >
                  <Headset size={16} aria-hidden="true" />
                  24/7 Support
                </a>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
