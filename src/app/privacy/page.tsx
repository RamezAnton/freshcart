import type { Metadata } from "next";
import {
  ShieldCheck,
  LockKeyhole,
  Database,
  Settings,
  Share2,
  UserCheck,
  Cookie,
  Clock,
  Mail,
} from "lucide-react";
import LegalPage, { type LegalDocument } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy | FreshCart",
  description:
    "This Privacy Policy describes how FreshCart collects, uses, and protects your personal information when you use our services. We are committed to ensuring that your privacy is protected.",
};

const document: LegalDocument = {
  title: "Privacy Policy",
  icon: ShieldCheck,
  notice: {
    title: "Your Privacy Matters",
    description:
      "This Privacy Policy describes how FreshCart collects, uses, and protects your personal information when you use our services. We are committed to ensuring that your privacy is protected.",
    icon: LockKeyhole,
  },
  articles: [
    {
      title: "Information We Collect",
      icon: Database,
      content: (
        <div className="space-y-3">
          <div className="flex items-start gap-3 text-gray-600 leading-relaxed">
            <span className="text-xs font-bold text-primary-500 bg-primary-50 px-2 py-0.5 rounded-md mt-0.5 shrink-0">
              1.1
            </span>
            <p className="text-sm">
              <strong className="text-gray-800">Personal Data: </strong>Name,
              email address, phone number, and shipping address.
            </p>
          </div>
          <div className="flex items-start gap-3 text-gray-600 leading-relaxed">
            <span className="text-xs font-bold text-primary-500 bg-primary-50 px-2 py-0.5 rounded-md mt-0.5 shrink-0">
              1.2
            </span>
            <p className="text-sm">
              <strong className="text-gray-800">Payment Data: </strong>Credit
              card information processed securely through our payment providers.
            </p>
          </div>
          <div className="flex items-start gap-3 text-gray-600 leading-relaxed">
            <span className="text-xs font-bold text-primary-500 bg-primary-50 px-2 py-0.5 rounded-md mt-0.5 shrink-0">
              1.3
            </span>
            <p className="text-sm">
              <strong className="text-gray-800">Technical Data: </strong>IP
              address, browser type, device information, and access times.
            </p>
          </div>
          <div className="flex items-start gap-3 text-gray-600 leading-relaxed">
            <span className="text-xs font-bold text-primary-500 bg-primary-50 px-2 py-0.5 rounded-md mt-0.5 shrink-0">
              1.4
            </span>
            <p className="text-sm">
              <strong className="text-gray-800">Usage Data: </strong>Pages
              viewed, products browsed, and actions taken within our platform.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "How We Use Your Information",
      icon: Settings,
      content: (
        <div className="space-y-3">
          <div className="flex items-start gap-3 text-gray-600 leading-relaxed">
            <span className="text-xs font-bold text-primary-500 bg-primary-50 px-2 py-0.5 rounded-md mt-0.5 shrink-0">
              2.1
            </span>
            <p className="text-sm">To process and fulfill your orders.</p>
          </div>
          <div className="flex items-start gap-3 text-gray-600 leading-relaxed">
            <span className="text-xs font-bold text-primary-500 bg-primary-50 px-2 py-0.5 rounded-md mt-0.5 shrink-0">
              2.2
            </span>
            <p className="text-sm">
              To send order confirmations and shipping updates.
            </p>
          </div>
          <div className="flex items-start gap-3 text-gray-600 leading-relaxed">
            <span className="text-xs font-bold text-primary-500 bg-primary-50 px-2 py-0.5 rounded-md mt-0.5 shrink-0">
              2.3
            </span>
            <p className="text-sm">
              To provide customer support and respond to inquiries.
            </p>
          </div>
          <div className="flex items-start gap-3 text-gray-600 leading-relaxed">
            <span className="text-xs font-bold text-primary-500 bg-primary-50 px-2 py-0.5 rounded-md mt-0.5 shrink-0">
              2.4
            </span>
            <p className="text-sm">
              To improve our products, services, and user experience.
            </p>
          </div>
          <div className="flex items-start gap-3 text-gray-600 leading-relaxed">
            <span className="text-xs font-bold text-primary-500 bg-primary-50 px-2 py-0.5 rounded-md mt-0.5 shrink-0">
              2.5
            </span>
            <p className="text-sm">
              To send promotional communications (with your consent).
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Data Protection",
      icon: ShieldCheck,
      content: (
        <div className="space-y-3">
          <div className="flex items-start gap-3 text-gray-600 leading-relaxed">
            <span className="text-xs font-bold text-primary-500 bg-primary-50 px-2 py-0.5 rounded-md mt-0.5 shrink-0">
              3.1
            </span>
            <p className="text-sm">
              We implement industry-standard encryption (SSL/TLS) for all data
              transfers.
            </p>
          </div>
          <div className="flex items-start gap-3 text-gray-600 leading-relaxed">
            <span className="text-xs font-bold text-primary-500 bg-primary-50 px-2 py-0.5 rounded-md mt-0.5 shrink-0">
              3.2
            </span>
            <p className="text-sm">
              Payment information is processed by PCI-compliant payment
              providers.
            </p>
          </div>
          <div className="flex items-start gap-3 text-gray-600 leading-relaxed">
            <span className="text-xs font-bold text-primary-500 bg-primary-50 px-2 py-0.5 rounded-md mt-0.5 shrink-0">
              3.3
            </span>
            <p className="text-sm">
              We conduct regular security audits and vulnerability assessments.
            </p>
          </div>
          <div className="flex items-start gap-3 text-gray-600 leading-relaxed">
            <span className="text-xs font-bold text-primary-500 bg-primary-50 px-2 py-0.5 rounded-md mt-0.5 shrink-0">
              3.4
            </span>
            <p className="text-sm">
              Access to personal data is restricted to authorized personnel
              only.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Information Sharing",
      icon: Share2,
      content: (
        <div className="space-y-3">
          <div className="flex items-start gap-3 text-gray-600 leading-relaxed">
            <span className="text-xs font-bold text-primary-500 bg-primary-50 px-2 py-0.5 rounded-md mt-0.5 shrink-0">
              4.1
            </span>
            <p className="text-sm">
              We do not sell, trade, or rent your personal information to third
              parties.
            </p>
          </div>
          <div className="flex items-start gap-3 text-gray-600 leading-relaxed">
            <span className="text-xs font-bold text-primary-500 bg-primary-50 px-2 py-0.5 rounded-md mt-0.5 shrink-0">
              4.2
            </span>
            <p className="text-sm">
              We may share data with trusted service providers who assist in our
              operations.
            </p>
          </div>
          <div className="flex items-start gap-3 text-gray-600 leading-relaxed">
            <span className="text-xs font-bold text-primary-500 bg-primary-50 px-2 py-0.5 rounded-md mt-0.5 shrink-0">
              4.3
            </span>
            <p className="text-sm">
              We may disclose information when required by law or to protect our
              rights.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Your Rights",
      icon: UserCheck,
      content: (
        <div className="space-y-3">
          <div className="flex items-start gap-3 text-gray-600 leading-relaxed">
            <span className="text-xs font-bold text-primary-500 bg-primary-50 px-2 py-0.5 rounded-md mt-0.5 shrink-0">
              5.1
            </span>
            <p className="text-sm">
              <strong className="text-gray-800">Access: </strong>Request a copy
              of your personal data.
            </p>
          </div>
          <div className="flex items-start gap-3 text-gray-600 leading-relaxed">
            <span className="text-xs font-bold text-primary-500 bg-primary-50 px-2 py-0.5 rounded-md mt-0.5 shrink-0">
              5.2
            </span>
            <p className="text-sm">
              <strong className="text-gray-800">Rectification: </strong>Request
              correction of inaccurate data.
            </p>
          </div>
          <div className="flex items-start gap-3 text-gray-600 leading-relaxed">
            <span className="text-xs font-bold text-primary-500 bg-primary-50 px-2 py-0.5 rounded-md mt-0.5 shrink-0">
              5.3
            </span>
            <p className="text-sm">
              <strong className="text-gray-800">Erasure: </strong>Request
              deletion of your personal data.
            </p>
          </div>
          <div className="flex items-start gap-3 text-gray-600 leading-relaxed">
            <span className="text-xs font-bold text-primary-500 bg-primary-50 px-2 py-0.5 rounded-md mt-0.5 shrink-0">
              5.4
            </span>
            <p className="text-sm">
              <strong className="text-gray-800">Portability: </strong>Request
              your data in a portable format.
            </p>
          </div>
          <div className="flex items-start gap-3 text-gray-600 leading-relaxed">
            <span className="text-xs font-bold text-primary-500 bg-primary-50 px-2 py-0.5 rounded-md mt-0.5 shrink-0">
              5.5
            </span>
            <p className="text-sm">
              <strong className="text-gray-800">Opt-out: </strong>Unsubscribe
              from marketing communications at any time.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Cookies",
      icon: Cookie,
      content: (
        <div className="space-y-3">
          <div className="flex items-start gap-3 text-gray-600 leading-relaxed">
            <span className="text-xs font-bold text-primary-500 bg-primary-50 px-2 py-0.5 rounded-md mt-0.5 shrink-0">
              6.1
            </span>
            <p className="text-sm">
              We use cookies to enhance your browsing experience and remember
              preferences.
            </p>
          </div>
          <div className="flex items-start gap-3 text-gray-600 leading-relaxed">
            <span className="text-xs font-bold text-primary-500 bg-primary-50 px-2 py-0.5 rounded-md mt-0.5 shrink-0">
              6.2
            </span>
            <p className="text-sm">
              You can control cookie settings through your browser preferences.
            </p>
          </div>
          <div className="flex items-start gap-3 text-gray-600 leading-relaxed">
            <span className="text-xs font-bold text-primary-500 bg-primary-50 px-2 py-0.5 rounded-md mt-0.5 shrink-0">
              6.3
            </span>
            <p className="text-sm">
              Disabling cookies may affect the functionality of certain
              features.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Data Retention",
      icon: Clock,
      content: (
        <p className="text-sm text-gray-600 leading-relaxed">
          We retain your personal information only for as long as necessary to
          fulfill the purposes outlined in this policy, or as required by law.
          Account data is deleted within 30 days of account closure upon
          request.
        </p>
      ),
    },
    {
      title: "Contact Us",
      icon: Mail,
      content: (
        <p className="text-sm text-gray-600 leading-relaxed">
          For questions about this Privacy Policy or to exercise your rights,
          contact our Data Protection Officer at{" "}
          <a
            href="mailto:privacy@freshcart.com"
            className="text-primary-600 hover:text-primary-700 font-semibold hover:underline"
          >
            privacy@freshcart.com
          </a>
        </p>
      ),
    },
  ],
  related: { href: "/terms", label: "View Terms of Service" },
};

export default function Page() {
  return <LegalPage document={document} />;
}
