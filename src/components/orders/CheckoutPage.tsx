"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Banknote, Bookmark, Building2, Check, CircleCheck, CreditCard, House, Info, LoaderCircle, LockKeyhole, MapPin, PackageCheck, Phone, Plus, ReceiptText, RotateCcw, ShieldCheck, ShoppingBag, Truck, type LucideIcon } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import { checkoutSchema, type CheckoutValues } from "@/lib/orders";
import type { Address } from "@/interfaces/account.interface";
import { priceFormatter } from "@/lib/clientUtils";
import CommerceHeader from "./CommerceHeader";

type ShippingAddress = CheckoutValues["shippingAddress"];
const fieldClass = "w-full rounded-xl border-2 border-gray-200 bg-white py-3.5 pr-4 pl-14 text-sm text-gray-900 transition-colors outline-none placeholder:text-gray-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 aria-invalid:border-red-400";

function Panel({ title, description, icon: Icon, children }: { title: string; description: string; icon: LucideIcon; children: ReactNode }) {
  return <section className="min-w-0 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"><div className="bg-linear-to-r from-primary-600 to-primary-700 px-6 py-4"><h2 className="flex items-center gap-2 text-lg font-bold text-white"><Icon size={19} aria-hidden="true" />{title}</h2><p className="mt-1 text-sm text-primary-100">{description}</p></div>{children}</section>;
}

export default function CheckoutPage() {
  const cart = useCart();
  const { data: session, status } = useSession();
  const userId = session?.user.id;
  const router = useRouter();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [addressOwner, setAddressOwner] = useState("");
  const [addressLoading, setAddressLoading] = useState(true);
  const [addressError, setAddressError] = useState("");
  const [addressRevision, setAddressRevision] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState("new");
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "online">("cash");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [uncertain, setUncertain] = useState(false);
  const [placed, setPlaced] = useState(false);
  const locked = useRef(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ShippingAddress>({
    resolver: zodResolver(checkoutSchema.shape.shippingAddress),
    defaultValues: { city: "", details: "", phone: "" },
  });

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/login?callbackUrl=%2Fcheckout");
  }, [status, router]);

  useEffect(() => {
    setSelectedAddress("new");
    reset({ city: "", details: "", phone: "" });
  }, [userId, reset]);

  useEffect(() => {
    if (!userId) return;
    const controller = new AbortController();
    setAddressLoading(true); setAddressError("");
    async function load() {
      try {
        const response = await fetch("/api/account/addresses", { cache: "no-store", signal: controller.signal });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Unable to load saved addresses.");
        if (!Array.isArray(data.data)) throw new Error("Unable to load saved addresses.");
        if (!controller.signal.aborted) { setAddresses(data.data); setAddressOwner(userId!); }
      } catch (error) {
        if (!controller.signal.aborted) setAddressError(error instanceof Error ? error.message : "Unable to load saved addresses.");
      } finally { if (!controller.signal.aborted) setAddressLoading(false); }
    }
    void load();
    return () => controller.abort();
  }, [userId, addressRevision]);

  async function submit(shippingAddress: ShippingAddress) {
    if (locked.current || cart.loading || cart.busy || !cart.id || uncertain || placed) return;
    locked.current = true; setSubmitting(true); setError("");
    try {
      const response = await fetch("/api/account/orders", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ cartId: cart.id, shippingAddress, paymentMethod }) });
      const data = await response.json();
      if (!response.ok) { setUncertain(Boolean(data.uncertain)); throw new Error(data.message || "Unable to place your order."); }
      if (paymentMethod === "online") {
        const url = new URL(data.url);
        if (url.protocol !== "https:" || url.hostname !== "checkout.stripe.com") throw new Error("Unable to open secure payment.");
        window.location.assign(url.href);
      } else {
        setPlaced(true); cart.retry();
      }
    } catch (error) {
      if (error instanceof TypeError || error instanceof SyntaxError) {
        setUncertain(paymentMethod === "cash");
        setError(paymentMethod === "cash" ? "We could not confirm the result. Check My Orders before placing this order again." : "Unable to open payment. Please try again.");
      } else setError(error instanceof Error ? error.message : "Unable to place your order.");
    } finally { locked.current = false; setSubmitting(false); }
  }

  const count = cart.items.reduce((total, item) => total + item.count, 0);
  const total = cart.discountedSubtotal ?? cart.subtotal;
  const saved = addressOwner === userId ? addresses : [];
  const disabled = submitting || cart.busy;

  return <main className="min-h-screen flex-1 bg-linear-to-br from-gray-50 to-white py-8"><div className="container mx-auto px-4">
    <CommerceHeader title="Complete Your Order" description="Review your items and complete your purchase" icon={ReceiptText} checkout />
    {placed ? <section className="mx-auto max-w-xl rounded-2xl border border-primary-100 bg-white px-6 py-14 text-center shadow-sm" aria-live="polite"><CircleCheck className="mx-auto mb-5 size-16 text-primary-600" aria-hidden="true" /><h2 className="text-2xl font-bold text-gray-900">Your order has been placed!</h2><p className="mt-3 text-gray-500">Thank you for shopping with FreshCart. Pay cash when your order arrives.</p><Link href="/orders" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary-600 px-6 py-3 font-semibold text-white hover:bg-primary-700"><PackageCheck size={18} aria-hidden="true" />View My Orders</Link></section>
      : status !== "authenticated" || cart.loading ? <div className="grid gap-8 lg:grid-cols-3" role="status" aria-label="Loading checkout"><div className="h-96 animate-pulse rounded-2xl bg-gray-100 lg:col-span-2" /><div className="h-80 animate-pulse rounded-2xl bg-gray-100" /><span className="sr-only">Loading checkout…</span></div>
        : cart.error ? <section className="rounded-2xl border border-red-100 bg-white p-8" role="alert"><p className="text-red-600">{cart.error}</p><button onClick={cart.retry} type="button" className="mt-4 font-semibold text-primary-600">Reload cart</button></section>
          : !cart.items.length ? <section className="py-16 text-center"><ShoppingBag className="mx-auto mb-4 size-16 text-primary-500" aria-hidden="true" /><h2 className="text-2xl font-bold text-gray-900">Your cart is empty</h2><p className="mt-2 text-gray-500">Add some products before checking out.</p><Link href="/products" className="mt-6 inline-block rounded-xl bg-primary-600 px-6 py-3 font-semibold text-white">Browse Products</Link></section>
            : <form onSubmit={handleSubmit(submit)} noValidate><div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
              <div className="min-w-0 space-y-6 lg:col-span-2">
                <Panel title="Shipping Address" description="Where should we deliver your order?" icon={House}>
                  <div className="space-y-5 p-6">
                    <fieldset disabled={disabled} className="min-w-0 space-y-3 border-b border-gray-100 pb-5"><legend className="mb-3 flex items-center gap-2 font-semibold text-gray-800"><Bookmark size={17} className="text-primary-500" aria-hidden="true" />Saved Addresses</legend>
                      <p className="text-sm font-medium text-gray-600">Select a saved address or enter a new one below</p>
                      {addressLoading && <p role="status" className="flex items-center gap-2 text-sm text-gray-500"><LoaderCircle size={16} className="animate-spin" aria-hidden="true" />Loading addresses…</p>}
                      {addressError && <div role="alert" className="text-sm text-red-600">{addressError} <button type="button" className="font-semibold underline" onClick={() => setAddressRevision(value => value + 1)}>Retry</button><p className="mt-1 text-gray-500">You can still enter your address manually.</p></div>}
                      {!addressLoading && !addressError && !saved.length && <p className="text-sm text-gray-500">You have no saved addresses yet.</p>}
                      {saved.map(address => <label key={address._id} className={`flex cursor-pointer items-start gap-3 rounded-xl border-2 p-4 transition-colors has-focus-visible:ring-2 has-focus-visible:ring-primary-500 ${selectedAddress === address._id ? "border-primary-500 bg-primary-50" : "border-gray-200 hover:border-primary-200 hover:bg-gray-50"}`}>
                        <input type="radio" name="savedAddress" className="sr-only" checked={selectedAddress === address._id} onChange={() => { setSelectedAddress(address._id); reset({ city: address.city, details: address.details, phone: address.phone }); }} />
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-500"><MapPin size={20} aria-hidden="true" /></span><span className="min-w-0 flex-1"><span className="block font-semibold text-gray-900">{address.name}</span><span className="mt-0.5 block truncate text-sm text-gray-600">{address.details}</span><span className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500"><span className="flex items-center gap-1"><Phone size={12} aria-hidden="true" />{address.phone}</span><span className="flex items-center gap-1"><Building2 size={12} aria-hidden="true" />{address.city}</span></span></span>{selectedAddress === address._id && <Check size={18} className="text-primary-600" aria-hidden="true" />}
                      </label>)}
                      <label className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 border-dashed p-4 has-focus-visible:ring-2 has-focus-visible:ring-primary-500 ${selectedAddress === "new" ? "border-primary-500 bg-primary-50" : "border-gray-200"}`}><input type="radio" name="savedAddress" className="sr-only" checked={selectedAddress === "new"} onChange={() => { setSelectedAddress("new"); reset({ city: "", details: "", phone: "" }); }} /><span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary-500 text-white"><Plus size={22} aria-hidden="true" /></span><span><span className="block font-semibold text-primary-700">Use a different address</span><span className="mt-0.5 block text-xs text-gray-500">Enter a new shipping address manually</span></span></label>
                    </fieldset>
                    <div className="flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4"><Info size={22} className="shrink-0 text-blue-500" aria-hidden="true" /><div><p className="text-sm font-medium text-blue-800">Delivery Information</p><p className="mt-0.5 text-xs text-blue-600">Please ensure your address is accurate for smooth delivery</p></div></div>
                    <fieldset disabled={disabled} className="min-w-0 space-y-5">
                      {([{ name: "city", label: "City", placeholder: "e.g. Cairo, Alexandria, Giza", icon: Building2, autoComplete: "address-level2" }, { name: "details", label: "Street Address", placeholder: "Street name, building number, floor, apartment...", icon: MapPin, autoComplete: "street-address" }, { name: "phone", label: "Phone Number", placeholder: "01xxxxxxxxx", icon: Phone, autoComplete: "tel" }] as const).map(({ name, label, placeholder, icon: FieldIcon, autoComplete }) => <div key={name}><label htmlFor={name} className="mb-2 block text-sm font-semibold text-gray-700">{label} <span className="text-red-500">*</span></label><div className="relative"><span className={`pointer-events-none absolute left-4 flex size-8 items-center justify-center rounded-lg bg-gray-100 text-gray-400 ${name === "details" ? "top-3" : "top-1/2 -translate-y-1/2"}`}><FieldIcon size={17} aria-hidden="true" /></span>{name === "details" ? <textarea id={name} rows={3} autoComplete={autoComplete} {...register(name)} className={`${fieldClass} resize-none`} placeholder={placeholder} aria-invalid={Boolean(errors[name])} aria-describedby={errors[name] ? `${name}-error` : undefined} /> : <input id={name} type={name === "phone" ? "tel" : "text"} autoComplete={autoComplete} {...register(name)} className={fieldClass} placeholder={placeholder} aria-invalid={Boolean(errors[name])} aria-describedby={errors[name] ? `${name}-error` : undefined} />}</div>{errors[name] && <p id={`${name}-error`} className="mt-1 text-sm text-red-600" role="alert">{errors[name]?.message}</p>}{name === "phone" && <p className="mt-1 text-xs text-gray-400">Egyptian numbers only</p>}</div>)}
                    </fieldset>
                  </div>
                </Panel>
                <Panel title="Payment Method" description="Choose how you'd like to pay" icon={CreditCard}>
                  <fieldset disabled={disabled} className="min-w-0 space-y-4 p-6"><legend className="sr-only">Payment method</legend>
                    {([{ value: "cash", title: "Cash on Delivery", description: "Pay when your order arrives at your doorstep", icon: Banknote }, { value: "online", title: "Pay Online", description: "Secure payment with Credit/Debit Card via Stripe", icon: CreditCard }] as const).map(({ value, title, description, icon: PaymentIcon }) => <label key={value} className={`flex cursor-pointer items-center gap-4 rounded-xl border-2 p-5 transition-colors has-focus-visible:ring-2 has-focus-visible:ring-primary-500 ${paymentMethod === value ? "border-primary-500 bg-linear-to-r from-primary-50 to-emerald-50 shadow-sm" : "border-gray-200 hover:border-primary-200 hover:bg-gray-50"}`}><input type="radio" name="paymentMethod" className="sr-only" checked={paymentMethod === value} onChange={() => setPaymentMethod(value)} /><span className={`flex size-12 shrink-0 items-center justify-center rounded-xl sm:size-14 ${paymentMethod === value ? "bg-primary-500 text-white shadow-lg shadow-primary-500/30" : "bg-gray-100 text-gray-400"}`}><PaymentIcon size={24} aria-hidden="true" /></span><span className="min-w-0 flex-1"><span className={`block font-bold ${paymentMethod === value ? "text-primary-700" : "text-gray-900"}`}>{title}</span><span className="mt-0.5 block text-sm text-gray-500">{description}</span>{value === "online" && <span className="mt-2 flex flex-wrap gap-2 text-[10px] font-bold"><span className="rounded bg-blue-800 px-1.5 text-white italic">VISA</span><span className="rounded bg-gray-100 px-1.5 text-gray-700">Mastercard</span><span className="rounded bg-blue-500 px-1.5 text-white">AMEX</span></span>}</span><span className={`flex size-7 shrink-0 items-center justify-center rounded-full ${paymentMethod === value ? "bg-primary-600 text-white" : "border-2 border-gray-200"}`}>{paymentMethod === value && <Check size={16} aria-hidden="true" />}</span></label>)}
                    <div className="flex items-center gap-3 rounded-xl border border-green-100 bg-linear-to-r from-green-50 to-emerald-50 p-4"><ShieldCheck size={24} className="shrink-0 text-green-600" aria-hidden="true" /><div><p className="text-sm font-medium text-green-800">Secure &amp; Encrypted</p><p className="mt-0.5 text-xs text-green-600">Online payments are processed securely by Stripe</p></div></div>
                  </fieldset>
                </Panel>
              </div>
              <aside className="min-w-0 lg:sticky lg:top-36"><Panel title="Order Summary" description={`${count} ${count === 1 ? "item" : "items"}`} icon={ShoppingBag}><div className="p-5">
                <ul className="mb-5 max-h-56 space-y-3 overflow-y-auto pr-1">{cart.items.map(item => <li key={item.product._id} className="flex items-center gap-3 rounded-xl bg-gray-50 p-3"><div className="relative size-14 shrink-0 rounded-lg border border-gray-100 bg-white"><Image src={item.product.imageCover} alt={item.product.title} fill sizes="56px" className="object-contain p-1" /></div><div className="min-w-0 flex-1"><p className="truncate text-sm font-medium text-gray-900">{item.product.title}</p><p className="mt-0.5 text-xs text-gray-500">{item.count} × {priceFormatter(item.price)}</p></div><p className="text-right text-xs font-bold text-gray-900">{priceFormatter(item.price * item.count)}</p></li>)}</ul>
                <dl className="space-y-3 border-t border-gray-100 pt-4 text-sm"><div className="flex justify-between gap-3 text-gray-600"><dt>Subtotal</dt><dd className="font-medium">{priceFormatter(cart.subtotal)}</dd></div>{cart.discountedSubtotal !== undefined && <div className="flex justify-between gap-3 text-primary-600"><dt>Discount</dt><dd>−{priceFormatter(cart.subtotal - total)}</dd></div>}<div className="flex justify-between gap-3 text-gray-600"><dt className="flex items-center gap-2"><Truck size={15} aria-hidden="true" />Shipping</dt><dd className="text-right text-xs">Confirmed when order is placed</dd></div><div className="flex items-center justify-between gap-3 border-t border-gray-100 pt-4"><dt className="font-bold text-gray-900">Estimated Total</dt><dd className="text-xl font-bold text-primary-600">{priceFormatter(total)}</dd></div></dl>
                {error && <div role="alert" className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-600">{error}{uncertain && <Link href="/orders" className="mt-2 block font-semibold underline">Check My Orders</Link>}</div>}
                {!cart.id && <p role="alert" className="mt-4 text-sm text-red-600">Return to your cart and reload it before checking out.</p>}
                <button type="submit" disabled={disabled || !cart.id || uncertain} className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-primary-600 to-primary-700 py-4 font-bold text-white shadow-lg shadow-primary-600/20 transition-colors hover:from-primary-700 hover:to-primary-800 disabled:cursor-not-allowed disabled:opacity-60">{submitting ? <LoaderCircle size={19} className="animate-spin" aria-hidden="true" /> : <LockKeyhole size={18} aria-hidden="true" />}{submitting ? paymentMethod === "online" ? "Opening payment…" : "Placing order…" : paymentMethod === "online" ? "Continue to Secure Payment" : "Place Order"}</button>
                <div className="mt-4 flex flex-wrap justify-center gap-3 border-t border-gray-100 py-3 text-xs text-gray-500"><span className="flex items-center gap-1"><ShieldCheck size={13} className="text-primary-500" aria-hidden="true" />Secure</span><span className="flex items-center gap-1"><Truck size={13} className="text-blue-500" aria-hidden="true" />Fast Delivery</span><span className="flex items-center gap-1"><RotateCcw size={13} className="text-orange-500" aria-hidden="true" />Easy Returns</span></div>
              </div></Panel></aside>
            </div></form>}
  </div></main>;
}
