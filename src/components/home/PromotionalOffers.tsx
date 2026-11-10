import Link from "next/link";
import { ArrowRight } from "lucide-react";

const offers = [
  {
    label: "Deal of the Day",
    emoji: "🔥",
    title: "Fresh Organic Fruits",
    description: "Get up to 40% off on selected organic fruits",
    discount: "40% OFF",
    code: "ORGANIC40",
    action: "Shop Now",
    href: "/products",
    background: "from-emerald-500 to-emerald-700",
    color: "text-emerald-600",
  },
  {
    label: "New Arrivals",
    emoji: "✨",
    title: "Exotic Vegetables",
    description: "Discover our latest collection of premium vegetables",
    discount: "25% OFF",
    code: "FRESH25",
    action: "Explore Now",
    href: "/products?sort=newest",
    background: "from-orange-400 to-rose-500",
    color: "text-orange-500",
  },
];
export default function PromotionalOffers() {
  return (
    <section aria-label="FreshCart promotions" className="py-10">
      <div className="container mx-auto px-4">
        <div className="grid gap-6 md:grid-cols-2">
          {offers.map((offer) => (
            <article
              key={offer.code}
              className={`relative overflow-hidden rounded-2xl bg-linear-to-br ${offer.background} p-6 text-white sm:p-8`}
            >
              <span
                aria-hidden="true"
                className="absolute top-0 right-0 size-40 translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10"
              />
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-0 size-32 -translate-x-1/2 translate-y-1/2 rounded-full bg-white/10"
              />
              <div className="relative">
                <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-sm">
                  <span aria-hidden="true">{offer.emoji}</span>
                  {offer.label}
                </span>
                <h2 className="mb-2 text-2xl font-bold md:text-3xl">
                  {offer.title}
                </h2>
                <p className="mb-4 text-white/80">{offer.description}</p>
                <div className="mb-6 flex flex-wrap items-center gap-4">
                  <p className="text-3xl font-bold">{offer.discount}</p>
                  <p className="text-sm text-white/70">
                    Use code:{" "}
                    <strong className="text-white">{offer.code}</strong>
                  </p>
                </div>
                <Link
                  href={offer.href}
                  className={`inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold ${offer.color} transition-colors hover:bg-gray-100`}
                >
                  {offer.action}
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
