import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export default function CommerceHeader({ title, description, icon: Icon, checkout = false }: { title: string; description: string; icon: LucideIcon; checkout?: boolean }) {
  return <header className="mb-8">
    <Breadcrumb className="mb-6"><BreadcrumbList className="gap-2 text-sm text-gray-500">
      <BreadcrumbItem><BreadcrumbLink render={<Link href="/" />}>Home</BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator>/</BreadcrumbSeparator>
      {checkout && <><BreadcrumbItem><BreadcrumbLink render={<Link href="/cart" />}>Cart</BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator>/</BreadcrumbSeparator></>}
      <BreadcrumbItem><BreadcrumbPage>{checkout ? "Checkout" : "My Orders"}</BreadcrumbPage></BreadcrumbItem>
    </BreadcrumbList></Breadcrumb>
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div className="flex items-center gap-3 sm:gap-4"><span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-primary-500 to-primary-700 text-white shadow-lg shadow-primary-500/25 sm:size-14 sm:rounded-2xl"><Icon size={25} aria-hidden="true" /></span><div><h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{title}</h1><p className="mt-1 text-sm text-gray-500">{description}</p></div></div>
      <Link href={checkout ? "/cart" : "/products"} className="inline-flex items-center gap-2 self-start rounded-xl px-4 py-2 text-sm font-medium text-primary-600 transition-colors hover:bg-primary-50 hover:text-primary-700 sm:self-auto">{checkout ? <ArrowLeft size={17} aria-hidden="true" /> : <ShoppingBag size={17} aria-hidden="true" />}{checkout ? "Back to Cart" : "Continue Shopping"}</Link>
    </div>
  </header>;
}
