import type { Metadata } from "next";
import {
  FileText,
  TriangleAlert,
  CircleCheck,
  UserCheck,
  IdCard,
  CreditCard,
  Truck,
  RotateCcw,
  Scale,
  Mail,
} from "lucide-react";
import LegalPage, { type LegalDocument } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service | FreshCart",
  description:
    "By accessing and using FreshCart, you accept and agree to be bound by the terms and provisions of this agreement. Please read these terms carefully before using our services.",
};

const document: LegalDocument = {
  title: "Terms of Service",
  icon: FileText,
  notice: {
    title: "Important Notice",
    description:
      "By accessing and using FreshCart, you accept and agree to be bound by the terms and provisions of this agreement. Please read these terms carefully before using our services.",
    icon: TriangleAlert,
  },
  articles: [
    {
      title: "Acceptance of Terms",
      icon: CircleCheck,
      content: (
        <div className="space-y-3">
          <div className="flex items-start gap-3 text-gray-600 leading-relaxed">
            <span className="text-xs font-bold text-primary-500 bg-primary-50 px-2 py-0.5 rounded-md mt-0.5 shrink-0">
              1.1
            </span>
            <p className="text-sm">
              By accessing or using the Service, you acknowledge that you have
              read, understood, and agree to be bound by these Terms.
            </p>
          </div>
          <div className="flex items-start gap-3 text-gray-600 leading-relaxed">
            <span className="text-xs font-bold text-primary-500 bg-primary-50 px-2 py-0.5 rounded-md mt-0.5 shrink-0">
              1.2
            </span>
            <p className="text-sm">
              If you do not agree to these Terms, you must not access or use the
              Service.
            </p>
          </div>
          <div className="flex items-start gap-3 text-gray-600 leading-relaxed">
            <span className="text-xs font-bold text-primary-500 bg-primary-50 px-2 py-0.5 rounded-md mt-0.5 shrink-0">
              1.3
            </span>
            <p className="text-sm">
              We reserve the right to modify these Terms at any time, and such
              modifications shall be effective immediately upon posting.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "User Eligibility",
      icon: UserCheck,
      content: (
        <div className="space-y-3">
          <div className="flex items-start gap-3 text-gray-600 leading-relaxed">
            <span className="text-xs font-bold text-primary-500 bg-primary-50 px-2 py-0.5 rounded-md mt-0.5 shrink-0">
              2.1
            </span>
            <p className="text-sm">
              The Service is intended for users who are at least eighteen (18)
              years of age.
            </p>
          </div>
          <div className="flex items-start gap-3 text-gray-600 leading-relaxed">
            <span className="text-xs font-bold text-primary-500 bg-primary-50 px-2 py-0.5 rounded-md mt-0.5 shrink-0">
              2.2
            </span>
            <p className="text-sm">
              By using the Service, you represent and warrant that you are of
              legal age to form a binding contract.
            </p>
          </div>
          <div className="flex items-start gap-3 text-gray-600 leading-relaxed">
            <span className="text-xs font-bold text-primary-500 bg-primary-50 px-2 py-0.5 rounded-md mt-0.5 shrink-0">
              2.3
            </span>
            <p className="text-sm">
              If you are accessing the Service on behalf of a legal entity, you
              represent that you have the authority to bind such entity.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Account Registration",
      icon: IdCard,
      content: (
        <div className="space-y-3">
          <div className="flex items-start gap-3 text-gray-600 leading-relaxed">
            <span className="text-xs font-bold text-primary-500 bg-primary-50 px-2 py-0.5 rounded-md mt-0.5 shrink-0">
              3.1
            </span>
            <p className="text-sm">
              You may be required to create an account to access certain
              features of the Service.
            </p>
          </div>
          <div className="flex items-start gap-3 text-gray-600 leading-relaxed">
            <span className="text-xs font-bold text-primary-500 bg-primary-50 px-2 py-0.5 rounded-md mt-0.5 shrink-0">
              3.2
            </span>
            <p className="text-sm">
              You agree to provide accurate, current, and complete information
              during registration.
            </p>
          </div>
          <div className="flex items-start gap-3 text-gray-600 leading-relaxed">
            <span className="text-xs font-bold text-primary-500 bg-primary-50 px-2 py-0.5 rounded-md mt-0.5 shrink-0">
              3.3
            </span>
            <p className="text-sm">
              You are solely responsible for maintaining the confidentiality of
              your account credentials.
            </p>
          </div>
          <div className="flex items-start gap-3 text-gray-600 leading-relaxed">
            <span className="text-xs font-bold text-primary-500 bg-primary-50 px-2 py-0.5 rounded-md mt-0.5 shrink-0">
              3.4
            </span>
            <p className="text-sm">
              You agree to notify us immediately of any unauthorized use of your
              account.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Orders and Payments",
      icon: CreditCard,
      content: (
        <div className="space-y-3">
          <div className="flex items-start gap-3 text-gray-600 leading-relaxed">
            <span className="text-xs font-bold text-primary-500 bg-primary-50 px-2 py-0.5 rounded-md mt-0.5 shrink-0">
              4.1
            </span>
            <p className="text-sm">
              All orders placed through the Service are subject to acceptance
              and availability.
            </p>
          </div>
          <div className="flex items-start gap-3 text-gray-600 leading-relaxed">
            <span className="text-xs font-bold text-primary-500 bg-primary-50 px-2 py-0.5 rounded-md mt-0.5 shrink-0">
              4.2
            </span>
            <p className="text-sm">
              Prices are subject to change without notice prior to order
              confirmation.
            </p>
          </div>
          <div className="flex items-start gap-3 text-gray-600 leading-relaxed">
            <span className="text-xs font-bold text-primary-500 bg-primary-50 px-2 py-0.5 rounded-md mt-0.5 shrink-0">
              4.3
            </span>
            <p className="text-sm">
              Payment must be made in full at the time of purchase through
              approved payment methods.
            </p>
          </div>
          <div className="flex items-start gap-3 text-gray-600 leading-relaxed">
            <span className="text-xs font-bold text-primary-500 bg-primary-50 px-2 py-0.5 rounded-md mt-0.5 shrink-0">
              4.4
            </span>
            <p className="text-sm">
              We reserve the right to refuse or cancel any order at our sole
              discretion.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Shipping and Delivery",
      icon: Truck,
      content: (
        <div className="space-y-3">
          <div className="flex items-start gap-3 text-gray-600 leading-relaxed">
            <span className="text-xs font-bold text-primary-500 bg-primary-50 px-2 py-0.5 rounded-md mt-0.5 shrink-0">
              5.1
            </span>
            <p className="text-sm">
              Shipping times are estimates only and are not guaranteed.
            </p>
          </div>
          <div className="flex items-start gap-3 text-gray-600 leading-relaxed">
            <span className="text-xs font-bold text-primary-500 bg-primary-50 px-2 py-0.5 rounded-md mt-0.5 shrink-0">
              5.2
            </span>
            <p className="text-sm">
              Risk of loss and title for items purchased pass to you upon
              delivery to the carrier.
            </p>
          </div>
          <div className="flex items-start gap-3 text-gray-600 leading-relaxed">
            <span className="text-xs font-bold text-primary-500 bg-primary-50 px-2 py-0.5 rounded-md mt-0.5 shrink-0">
              5.3
            </span>
            <p className="text-sm">
              We are not responsible for delays caused by carriers, customs, or
              other factors beyond our control.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Returns and Refunds",
      icon: RotateCcw,
      content: (
        <div className="space-y-3">
          <div className="flex items-start gap-3 text-gray-600 leading-relaxed">
            <span className="text-xs font-bold text-primary-500 bg-primary-50 px-2 py-0.5 rounded-md mt-0.5 shrink-0">
              6.1
            </span>
            <p className="text-sm">
              Our return policy allows returns within 14 days of delivery for
              most items.
            </p>
          </div>
          <div className="flex items-start gap-3 text-gray-600 leading-relaxed">
            <span className="text-xs font-bold text-primary-500 bg-primary-50 px-2 py-0.5 rounded-md mt-0.5 shrink-0">
              6.2
            </span>
            <p className="text-sm">
              Products must be unused and in original packaging.
            </p>
          </div>
          <div className="flex items-start gap-3 text-gray-600 leading-relaxed">
            <span className="text-xs font-bold text-primary-500 bg-primary-50 px-2 py-0.5 rounded-md mt-0.5 shrink-0">
              6.3
            </span>
            <p className="text-sm">
              Refunds will be processed within 5-7 business days after receiving
              the returned item.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Limitation of Liability",
      icon: Scale,
      content: (
        <p className="text-sm text-gray-600 leading-relaxed">
          To the maximum extent permitted by applicable law, FreshCart shall not
          be liable for any indirect, incidental, special, consequential, or
          punitive damages, or any loss of profits or revenues, whether incurred
          directly or indirectly.
        </p>
      ),
    },
    {
      title: "Contact Us",
      icon: Mail,
      content: (
        <p className="text-sm text-gray-600 leading-relaxed">
          If you have any questions about these Terms, please contact us at{" "}
          <a
            href="mailto:support@freshcart.com"
            className="text-primary-600 hover:text-primary-700 font-semibold hover:underline"
          >
            support@freshcart.com
          </a>
        </p>
      ),
    },
  ],
  related: { href: "/privacy", label: "View Privacy Policy" },
};

export default function Page() {
  return <LegalPage document={document} />;
}
