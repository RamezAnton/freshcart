import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronDown,
  CircleHelp,
  Headset,
  Package,
  CreditCard,
  RotateCcw,
  UserRound,
  Heart,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import PageHeader from "@/components/shared/PageHeader/PageHeader";

export const metadata: Metadata = {
  title: "Help Center | FreshCart",
  description:
    "Find answers about shopping, accounts, payments, orders, and returns on FreshCart.",
};

const topics = [
  {
    id: "orders",
    title: "Orders & Checkout",
    description: "Review orders and place your next purchase.",
    icon: Package,
  },
  {
    id: "payments",
    title: "Payments",
    description: "Cash on delivery and secure online checkout.",
    icon: CreditCard,
  },
  {
    id: "account",
    title: "Your Account",
    description: "Sign-in, passwords, and saved addresses.",
    icon: UserRound,
  },
  {
    id: "returns",
    title: "Returns & Refunds",
    description: "Understand our sample return guidelines.",
    icon: RotateCcw,
  },
];
const questions = [
  {
    id: "orders",
    title: "How do I place an order?",
    answer: (
      <>
        Add products to your cart, sign in, and select Secure Checkout. Choose a
        saved delivery address or enter a new one, select a payment method, and
        review your order before continuing.
      </>
    ),
  },
  {
    id: "order-history",
    title: "Where can I see my previous orders?",
    answer: (
      <>
        Open{" "}
        <Link
          href="/orders"
          className="font-semibold text-primary-600 hover:underline"
        >
          My Orders
        </Link>{" "}
        from your account menu. Use Details on an order to view its products,
        delivery address, payment information, and totals. You will need to sign
        in first.
      </>
    ),
  },
  {
    id: "payments",
    title: "Which payment methods can I use?",
    answer: (
      <>
        Checkout offers cash on delivery and online card payment through Stripe.
        Card information is entered on Stripe’s hosted payment page. For cash
        orders, pay when your order arrives.
      </>
    ),
  },
  {
    id: "account",
    title: "What if I forget my password?",
    answer: (
      <>
        Use{" "}
        <Link
          href="/forget-password"
          className="font-semibold text-primary-600 hover:underline"
        >
          Forgot Password
        </Link>{" "}
        on the sign-in page. Enter your email, verify the reset code sent to
        you, and choose a new password.
      </>
    ),
  },
  {
    id: "addresses",
    title: "How do I manage delivery addresses?",
    answer: (
      <>
        Sign in and open{" "}
        <Link
          href="/profile/addresses"
          className="font-semibold text-primary-600 hover:underline"
        >
          My Addresses
        </Link>{" "}
        to add or remove an address. Your saved addresses are available to
        select during checkout.
      </>
    ),
  },
  {
    id: "guest-shopping",
    title: "Can I keep a cart or wishlist without signing in?",
    answer: (
      <>
        Yes. Items can be saved in this browser while you browse. Sign in to
        merge them with your account. Guest items may be lost if you clear
        browser storage or switch to another browser or device.
      </>
    ),
  },
  {
    id: "returns",
    title: "How do returns and refunds work?",
    answer: (
      <>
        Read our{" "}
        <Link
          href="/returns"
          className="font-semibold text-primary-600 hover:underline"
        >
          Returns &amp; Refunds
        </Link>{" "}
        page for the demo policy. To ask about an item, contact support with
        your order reference and the reason for your request. This demo does not
        process refunds automatically.
      </>
    ),
  },
  {
    id: "privacy",
    title: "Where can I learn about privacy and cookies?",
    answer: (
      <>
        Our{" "}
        <Link
          href="/privacy"
          className="font-semibold text-primary-600 hover:underline"
        >
          Privacy Policy
        </Link>{" "}
        and{" "}
        <Link
          href="/cookies"
          className="font-semibold text-primary-600 hover:underline"
        >
          Cookie Policy
        </Link>{" "}
        explain the demo’s policies and browser-storage features.
      </>
    ),
  },
];

export default function Page() {
  return (
    <main className="min-h-screen flex-1 bg-gray-50/70">
      <PageHeader
        title="Help Center"
        description="A little help for every step of your shopping journey"
        breadcrumbs={[{ label: "Help Center" }]}
        icon={<CircleHelp aria-hidden="true" />}
      />
      <div className="container mx-auto px-4 py-10 sm:py-12">
        <section aria-labelledby="help-topics">
          <div className="mb-6">
            <p className="mb-1 text-xs font-bold tracking-wider text-primary-600 uppercase">
              How can we help?
            </p>
            <h2 id="help-topics" className="text-2xl font-bold text-gray-900">
              Find the right answer
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Browse a topic or explore the frequently asked questions below.
            </p>
          </div>
          <nav
            aria-label="Help topics"
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {topics.map(({ id, title, description, icon: Icon }) => (
              <a
                key={id}
                href={`#${id}`}
                className="group flex items-start gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-colors hover:border-primary-200 hover:bg-primary-50 focus-visible:outline-2 focus-visible:outline-primary-500"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600 group-hover:bg-primary-100">
                  <Icon size={22} aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-semibold text-gray-900">
                    {title}
                  </span>
                  <span className="mt-1 block text-xs leading-relaxed text-gray-500">
                    {description}
                  </span>
                </span>
              </a>
            ))}
          </nav>
        </section>
        <div className="mt-10 grid items-start gap-8 lg:grid-cols-3">
          <section className="min-w-0 lg:col-span-2" aria-labelledby="help-faq">
            <h2 id="help-faq" className="mb-5 text-xl font-bold text-gray-900">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {questions.map(({ id, title, answer }) => (
                <details
                  id={id}
                  key={id}
                  className="group scroll-mt-44 rounded-2xl border border-gray-100 bg-white shadow-sm open:border-primary-200"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-5 py-5 text-sm font-semibold text-gray-900 focus-visible:outline-2 focus-visible:outline-primary-500 sm:text-base [&::-webkit-details-marker]:hidden">
                    {title}
                    <ChevronDown
                      size={18}
                      className="shrink-0 text-gray-400 transition-transform group-open:rotate-180 motion-reduce:transition-none"
                      aria-hidden="true"
                    />
                  </summary>
                  <div className="border-t border-gray-100 px-5 py-5 text-sm leading-relaxed text-gray-600">
                    {answer}
                  </div>
                </details>
              ))}
            </div>
          </section>
          <aside className="space-y-5 lg:sticky lg:top-36">
            <section className="rounded-2xl border border-primary-100 bg-primary-50 p-6">
              <span className="mb-4 flex size-12 items-center justify-center rounded-xl bg-white text-primary-600 shadow-sm">
                <Headset size={24} aria-hidden="true" />
              </span>
              <h2 className="text-xl font-bold text-gray-900">
                Still need a hand?
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                Send us your question and include an order reference if you have
                one.
              </p>
              <Link
                href="/contact"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary-600 px-5 py-3 text-sm font-semibold text-white hover:bg-primary-700"
              >
                Contact Us
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </section>
            <nav
              aria-label="Useful help links"
              className="rounded-2xl border border-gray-100 bg-white p-6"
            >
              <h2 className="mb-4 font-bold text-gray-900">Useful Links</h2>
              <ul className="space-y-4">
                {[
                  { href: "/orders", label: "My Orders", icon: Package },
                  {
                    href: "/profile/addresses",
                    label: "My Addresses",
                    icon: UserRound,
                  },
                  { href: "/wishlist", label: "My Wishlist", icon: Heart },
                  {
                    href: "/returns",
                    label: "Returns & Refunds",
                    icon: RotateCcw,
                  },
                  {
                    href: "/cookies",
                    label: "Cookie Policy",
                    icon: ShieldCheck,
                  },
                ].map(({ href, label, icon: Icon }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="flex items-center gap-3 text-sm text-gray-600 hover:text-primary-600"
                    >
                      <Icon
                        size={17}
                        className="text-primary-500"
                        aria-hidden="true"
                      />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <p className="px-1 text-xs leading-relaxed text-gray-400">
              FreshCart is a demo storefront. These answers describe the demo’s
              shopping features and example support policies.
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
}
