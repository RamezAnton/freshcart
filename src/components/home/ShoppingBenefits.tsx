import { Headset, RotateCcw, ShieldCheck, Truck } from "lucide-react";

const benefits = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders over 500 EGP",
    color: "bg-blue-50 text-blue-500",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payment",
    description: "100% secure transactions",
    color: "bg-emerald-50 text-emerald-500",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "14-day return policy",
    color: "bg-orange-50 text-orange-500",
  },
  {
    icon: Headset,
    title: "24/7 Support",
    description: "Dedicated support team",
    color: "bg-purple-50 text-purple-500",
  },
];
export default function ShoppingBenefits() {
  return (
    <section aria-label="Why shop with FreshCart" className="bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map(({ icon: Icon, title, description, color }) => (
            <li
              key={title}
              className="flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm transition-shadow duration-300 hover:shadow-md"
            >
              <span
                className={`flex size-12 shrink-0 items-center justify-center rounded-full ${color}`}
              >
                <Icon size={20} aria-hidden="true" />
              </span>
              <div>
                <h2 className="text-sm font-semibold text-gray-800">{title}</h2>
                <p className="mt-1 text-xs text-gray-500">{description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
