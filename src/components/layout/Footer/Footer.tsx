import Link from "next/link";
import {
  CreditCard,
  Headset,
  Mail,
  MapPin,
  Phone,
  RotateCcw,
  ShieldCheck,
  Truck,
} from "lucide-react";
import BrandLogo from "../BrandLogo";
import { footerGroups } from "../navigation";
import SocialIcon from "./SocialIcon";

const benefits = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders over 500 EGP",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "14-day return policy",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payment",
    description: "100% secure checkout",
  },
  { icon: Headset, title: "24/7 Support", description: "Contact us anytime" },
];

const socialLinks = [
  { name: "Facebook", icon: "facebook-f", href: "https://www.facebook.com/" },
  { name: "Twitter", icon: "twitter", href: "https://twitter.com/" },
  { name: "Instagram", icon: "instagram", href: "https://www.instagram.com/" },
  { name: "YouTube", icon: "youtube", href: "https://www.youtube.com/" },
] as const;

export default async function Footer() {
  "use cache";

  return (
    <footer id="footer" className="mt-auto bg-gray-900 text-white">
      <div className="border-y border-primary-100 bg-primary-50">
        <div className="container mx-auto px-4 py-6">
          <ul
            aria-label="Shopping benefits"
            className="grid grid-cols-2 gap-6 lg:grid-cols-4"
          >
            {benefits.map(({ icon: Icon, title, description }) => (
              <li key={title} className="flex items-center gap-3">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-600">
                  <Icon size={21} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">
                    {title}
                  </h3>
                  <p className="text-xs text-gray-500">{description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <BrandLogo footer />
            <p className="mt-6 mb-6 text-sm leading-relaxed text-gray-400">
              FreshCart is your one-stop destination for quality products. From
              fashion to electronics, we bring you the best brands at
              competitive prices with a seamless shopping experience.
            </p>
            <address className="mb-6 space-y-3 text-sm text-gray-400 not-italic">
              <a
                href="tel:+18001234567"
                className="flex items-center gap-3 transition-colors hover:text-primary-400"
              >
                <Phone
                  size={15}
                  className="shrink-0 text-primary-500"
                  aria-hidden="true"
                />
                +1 (800) 123-4567
              </a>
              <a
                href="mailto:support@freshcart.com"
                className="flex items-center gap-3 transition-colors hover:text-primary-400"
              >
                <Mail
                  size={15}
                  className="shrink-0 text-primary-500"
                  aria-hidden="true"
                />
                support@freshcart.com
              </a>
              <div className="flex items-start gap-3">
                <MapPin
                  size={16}
                  className="mt-0.5 shrink-0 text-primary-500"
                  aria-hidden="true"
                />
                <span>123 Commerce Street, New York, NY 10001</span>
              </div>
            </address>
            <div aria-label="Social media" className="flex items-center gap-3">
              {socialLinks.map(({ name, icon, href }) => (
                <a
                  key={name}
                  href={href}
                  aria-label={name}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-10 items-center justify-center rounded-full bg-gray-800 text-gray-400 transition-colors hover:bg-primary-600 hover:text-white"
                >
                  <SocialIcon name={icon} />
                </a>
              ))}
            </div>
          </div>
          {footerGroups.map(({ title, links }) => (
            <nav
              key={title}
              aria-label={`Footer ${title.toLowerCase()}`}
              className="lg:col-span-2"
            >
              <h2 className="mb-5 text-lg font-semibold">{title}</h2>
              <ul className="space-y-3">
                {links.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm text-gray-400 transition-colors hover:text-primary-400"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-center text-sm text-gray-500 md:text-left">
              © {new Date().getFullYear()} FreshCart. All rights reserved.
            </p>
            <ul
              aria-label="Accepted payment methods"
              className="flex flex-wrap items-center justify-center gap-4"
            >
              {["Visa", "Mastercard", "PayPal"].map((method) => (
                <li
                  key={method}
                  className="flex items-center gap-2 text-sm text-gray-500"
                >
                  <CreditCard size={16} aria-hidden="true" />
                  <span>{method}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
