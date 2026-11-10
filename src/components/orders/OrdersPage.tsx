"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Banknote, CalendarDays, ChevronDown, CircleCheck, Clock3, CreditCard, Hash, MapPin, Package, Phone, ReceiptText, ShoppingBag, Truck } from "lucide-react";
import { priceFormatter } from "@/lib/clientUtils";
import type { Order } from "@/lib/orders";
import CommerceHeader from "./CommerceHeader";

function ProductImage({ product, small = false }: { product: Order["cartItems"][number]["product"]; small?: boolean }) {
  return <span className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-xl border border-gray-100 bg-gray-50 ${small ? "size-16" : "size-20 sm:size-28 sm:rounded-2xl"}`}>{product?.imageCover ? <Image src={product.imageCover} alt={product.title} fill sizes={small ? "64px" : "(max-width: 640px) 80px, 112px"} className="object-contain p-2.5" /> : <Package size={25} className="text-gray-300" aria-hidden="true" />}</span>;
}

function OrderCard({ order }: { order: Order }) {
  const [expanded, setExpanded] = useState(false);
  const count = order.cartItems.reduce((total, item) => total + item.count, 0);
  const subtotal = order.cartItems.reduce((total, item) => total + item.price * item.count, 0);
  const adjustment = subtotal + order.shippingPrice + order.taxPrice - order.totalOrderPrice;
  const onTheWay = !order.isDelivered && order.paymentMethodType === "card";
  const statusLabel = order.isDelivered ? "Delivered" : onTheWay ? "On the way" : "Processing";
  const statusClass = order.isDelivered ? "bg-primary-100 text-primary-700" : onTheWay ? "bg-blue-100 text-blue-600" : "bg-amber-100 text-amber-600";
  const StatusIcon = order.isDelivered ? CircleCheck : onTheWay ? Truck : Clock3;
  const PaymentIcon = order.paymentMethodType === "cash" ? Banknote : CreditCard;
  const reference = order.id ?? order._id.slice(-8).toUpperCase();
  const detailsId = `order-${order._id}`;
  return <article className={`overflow-hidden rounded-2xl border bg-white transition-shadow ${expanded ? "border-primary-200 shadow-lg shadow-primary-100/50" : "border-gray-100 shadow-sm hover:border-gray-200 hover:shadow-md"}`}>
    <div className="p-4 sm:p-6"><div className="flex gap-3 sm:gap-5">
      <div className="relative h-fit shrink-0"><ProductImage product={order.cartItems[0]?.product ?? null} />{order.cartItems.length > 1 && <span className="absolute -top-2 -right-2 flex size-7 items-center justify-center rounded-full bg-gray-900 text-xs font-bold text-white shadow-lg">+{order.cartItems.length - 1}</span>}</div>
      <div className="min-w-0 flex-1"><div className="mb-3 flex items-start justify-between gap-3"><div><span className={`mb-2 inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold ${statusClass}`}><StatusIcon size={13} aria-hidden="true" />{statusLabel}</span><h2 className="flex items-center gap-1 text-lg font-bold text-gray-900"><Hash size={17} className="text-gray-400" aria-hidden="true" />{reference}</h2></div><span title={order.paymentMethodType === "cash" ? "Cash on delivery" : order.isPaid ? "Paid online" : "Online payment pending"} className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${order.paymentMethodType === "cash" ? "bg-gray-100 text-gray-500" : "bg-purple-100 text-purple-600"}`}><PaymentIcon size={18} aria-hidden="true" /><span className="sr-only">{order.paymentMethodType === "cash" ? "Cash on delivery" : order.isPaid ? "Paid online" : "Online payment pending"}</span></span></div>
        <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-gray-500 sm:text-sm"><time dateTime={order.createdAt} className="flex items-center gap-1.5"><CalendarDays size={13} aria-hidden="true" />{new Date(order.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" })}</time><span className="flex items-center gap-1.5"><ShoppingBag size={13} aria-hidden="true" />{count} {count === 1 ? "item" : "items"}</span><span className="flex items-center gap-1.5"><MapPin size={13} aria-hidden="true" />{order.shippingAddress.city}</span></div>
        <div className="flex flex-wrap items-center justify-between gap-3"><p className="text-lg font-bold text-gray-900 sm:text-2xl">{priceFormatter(order.totalOrderPrice)}</p><button type="button" aria-expanded={expanded} aria-controls={detailsId} onClick={() => setExpanded(value => !value)} className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors sm:px-4 ${expanded ? "bg-primary-600 text-white shadow-lg shadow-primary-600/25" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}><span>{expanded ? "Hide" : "Details"}</span><span className="sr-only"> order {reference}</span><ChevronDown size={16} className={expanded ? "rotate-180" : ""} aria-hidden="true" /></button></div>
      </div>
    </div></div>
    {expanded && <div id={detailsId} className="border-t border-gray-100 bg-gray-50/50"><div className="p-4 sm:p-6"><h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-gray-900"><ReceiptText size={20} className="text-primary-500" aria-hidden="true" />Order Items</h3><ul className="space-y-3">{order.cartItems.map((item, index) => <li key={item._id ?? `${item.product?._id}-${index}`} className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-3 sm:gap-4 sm:p-4"><ProductImage product={item.product} small /><div className="min-w-0 flex-1">{item.product ? <Link href={`/products/${item.product._id}`} className="block truncate text-sm font-medium text-gray-900 hover:text-primary-600 sm:text-base">{item.product.title}</Link> : <p className="text-sm font-medium text-gray-500">Product no longer available</p>}<p className="mt-1 text-xs text-gray-500 sm:text-sm">{item.count} × {priceFormatter(item.price)}</p></div><p className="text-right text-sm font-bold text-gray-900 sm:text-lg">{priceFormatter(item.count * item.price)}</p></li>)}</ul></div>
      <div className="grid gap-4 px-4 pb-4 sm:grid-cols-2 sm:px-6 sm:pb-6"><section className="rounded-xl border border-gray-100 bg-white p-4"><h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-900"><MapPin size={21} className="text-blue-500" aria-hidden="true" />Delivery Address</h3><p className="font-medium text-gray-900">{order.shippingAddress.city}</p><p className="mt-2 text-sm leading-relaxed whitespace-pre-line text-gray-600">{order.shippingAddress.details}</p><p className="mt-3 flex items-center gap-2 text-sm text-gray-600"><Phone size={14} aria-hidden="true" />{order.shippingAddress.phone}</p>{order.shippingAddress.postalCode && <p className="mt-2 text-xs text-gray-500">Postal code: {order.shippingAddress.postalCode}</p>}</section>
        <section className={`rounded-xl border p-4 ${order.isDelivered ? "border-primary-200 bg-primary-50" : "border-amber-200 bg-amber-50"}`}><h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-900"><ReceiptText size={21} className="text-amber-500" aria-hidden="true" />Order Summary</h3><dl className="space-y-2 text-sm"><div className="flex justify-between gap-2 text-gray-600"><dt>Subtotal</dt><dd>{priceFormatter(subtotal)}</dd></div><div className="flex justify-between gap-2 text-gray-600"><dt>Shipping</dt><dd>{order.shippingPrice === 0 ? "Free" : priceFormatter(order.shippingPrice)}</dd></div>{order.taxPrice > 0 && <div className="flex justify-between gap-2 text-gray-600"><dt>Tax</dt><dd>{priceFormatter(order.taxPrice)}</dd></div>}{Math.abs(adjustment) > 0.005 && <div className="flex justify-between gap-2 text-gray-600"><dt>{adjustment > 0 ? "Discount" : "Adjustment"}</dt><dd>{adjustment > 0 ? "−" : "+"}{priceFormatter(Math.abs(adjustment))}</dd></div>}<div className="flex justify-between gap-2 border-t border-gray-200/50 pt-3 text-gray-900"><dt className="font-semibold">Total</dt><dd className="font-bold">{priceFormatter(order.totalOrderPrice)}</dd></div><div className="flex justify-between gap-2 text-xs text-gray-500"><dt>Payment</dt><dd>{order.isPaid ? "Paid" : order.paymentMethodType === "cash" ? "Pay on delivery" : "Pending"}</dd></div></dl></section>
      </div>
    </div>}
  </article>;
}

export default function OrdersPage() {
  const { data: session, status } = useSession();
  const userId = session?.user.id;
  const router = useRouter();
  const [snapshot, setSnapshot] = useState<{ owner: string; orders: Order[] }>({ owner: "", orders: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [revision, setRevision] = useState(0);
  useEffect(() => { if (status === "unauthenticated") router.replace("/login?callbackUrl=%2Forders"); }, [status, router]);
  useEffect(() => {
    if (!userId) return;
    const controller = new AbortController();
    setLoading(true); setError("");
    async function load() {
      try {
        const response = await fetch("/api/account/orders", { cache: "no-store", signal: controller.signal });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Unable to load your orders.");
        if (!controller.signal.aborted) setSnapshot({ owner: userId!, orders: data.orders });
      } catch (error) { if (!controller.signal.aborted) setError(error instanceof Error ? error.message : "Unable to load your orders."); }
      finally { if (!controller.signal.aborted) setLoading(false); }
    }
    void load(); return () => controller.abort();
  }, [userId, revision]);
  const orders = snapshot.owner === userId ? snapshot.orders : [];
  const pending = status !== "authenticated" || loading || (snapshot.owner !== userId && !error);
  return <main className="min-h-screen flex-1 bg-white"><div className="container mx-auto px-4 py-8"><CommerceHeader title="My Orders" description={pending || error ? "Track and manage your orders" : `Track and manage your ${orders.length} ${orders.length === 1 ? "order" : "orders"}`} icon={ShoppingBag} />
    {pending ? <div className="space-y-4" role="status" aria-label="Loading orders">{[0, 1, 2].map(item => <div key={item} className="h-48 animate-pulse rounded-2xl bg-gray-100" />)}<span className="sr-only">Loading orders…</span></div> : error ? <section role="alert" className="rounded-2xl border border-red-100 bg-red-50 p-6"><p className="text-red-600">{error}</p><button type="button" className="mt-4 rounded-xl bg-white px-4 py-2 font-semibold text-primary-600" onClick={() => setRevision(value => value + 1)}>Retry</button></section> : orders.length ? <div className="space-y-4">{orders.map(order => <OrderCard key={order._id} order={order} />)}</div> : <section className="py-20 text-center"><ShoppingBag className="mx-auto mb-5 size-16 text-primary-500" aria-hidden="true" /><h2 className="text-2xl font-bold text-gray-900">No orders yet</h2><p className="mt-2 text-gray-500">Your orders will appear here after you complete checkout.</p><Link href="/products" className="mt-6 inline-block rounded-xl bg-primary-600 px-6 py-3 font-semibold text-white hover:bg-primary-700">Start Shopping</Link></section>}
  </div></main>;
}
