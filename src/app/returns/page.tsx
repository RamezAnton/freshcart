import type { Metadata } from "next";
import Link from "next/link";
import {
  RotateCcw,
  Info,
  CalendarDays,
  PackageCheck,
  ClipboardList,
  Ban,
  Wallet,
  Headset,
} from "lucide-react";
import LegalPage, { type LegalDocument } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Returns & Refunds | FreshCart",
  description:
    "Read FreshCart's demo return guidelines, eligibility requirements, and refund process.",
};

const textClass = "space-y-3 text-sm leading-relaxed text-gray-600";
const linkClass = "font-semibold text-primary-600 hover:underline";
const document: LegalDocument = {
  title: "Returns & Refunds",
  icon: RotateCcw,
  notice: {
    title: "Shop with a little more peace of mind",
    icon: Info,
    description:
      "This is an example returns policy for the FreshCart demo. It outlines a sample process; return collection, exchanges, and refunds are not processed automatically by this website.",
  },
  articles: [
    {
      title: "14-Day Return Window",
      icon: CalendarDays,
      content: (
        <div className={textClass}>
          <p>
            Our sample policy allows you to request a return within 14 days of
            receiving an eligible item.
          </p>
          <p>
            Keep your order reference and proof of purchase handy so support can
            identify the item you would like to return.
          </p>
        </div>
      ),
    },
    {
      title: "Keep Items in Original Condition",
      icon: PackageCheck,
      content: (
        <div className={textClass}>
          <p>
            Items should be unused, with original tags, accessories, and
            packaging included.
          </p>
          <p>
            Please pack returns securely to help prevent damage during
            transport. Inspect your order when it arrives and report missing or
            damaged items promptly.
          </p>
        </div>
      ),
    },
    {
      title: "How to Request a Return",
      icon: ClipboardList,
      content: (
        <ol className={`${textClass} list-decimal space-y-3 pl-5`}>
          <li>
            Find your order reference in{" "}
            <Link href="/orders" className={linkClass}>
              My Orders
            </Link>
            .
          </li>
          <li>
            Use{" "}
            <Link href="/contact" className={linkClass}>
              Contact Us
            </Link>{" "}
            and choose Order Support. Include the order reference, product, and
            reason for the return.
          </li>
          <li>Wait for support instructions before sending an item back.</li>
        </ol>
      ),
    },
    {
      title: "Items That May Be Excluded",
      icon: Ban,
      content: (
        <div className={textClass}>
          <p>
            In this sample policy, used or damaged items, personalized products,
            and opened hygiene or personal-care products may be ineligible.
          </p>
          <p>
            Exceptions can apply to products received damaged or incorrect.
            Describe the issue when contacting support so it can be reviewed.
          </p>
        </div>
      ),
    },
    {
      title: "Refunds & Exchanges",
      icon: Wallet,
      content: (
        <div className={textClass}>
          <p>
            For demonstration, approved refunds are estimated at 5–7 business
            days after a returned item is received and inspected. Your payment
            provider may require additional processing time.
          </p>
          <p>
            Support would confirm the refund amount and method. Exchanges would
            depend on product availability.
          </p>
          <p>
            Contact support before arranging a return or requesting an exchange.
          </p>
        </div>
      ),
    },
    {
      title: "We’re Here to Help",
      icon: Headset,
      content: (
        <div className={textClass}>
          <p>
            Not sure whether an item qualifies? Start with the{" "}
            <Link href="/help" className={linkClass}>
              Help Center
            </Link>{" "}
            or send your question through{" "}
            <Link href="/contact" className={linkClass}>
              Contact Us
            </Link>
            .
          </p>
          <p>
            Include your order reference, but never send card numbers, account
            passwords, or verification codes.
          </p>
        </div>
      ),
    },
  ],
  related: { href: "/help", label: "Visit Help Center" },
};

export default function Page() {
  return <LegalPage document={document} />;
}
