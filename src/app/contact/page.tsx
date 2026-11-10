import type { Metadata } from "next";
import { Clock3, Headset, CircleHelp, Mail, MapPin, Phone } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader/PageHeader";
import ContactForm from "@/components/contact/ContactForm";
import SocialIcon from "@/components/layout/Footer/SocialIcon";

export const metadata: Metadata = {
  title: "Contact Us | FreshCart",
  description: "Get in touch with the FreshCart support team.",
};

export default function ContactPage() {
  return (
    <main className="flex-1 bg-gray-50/70">
      <PageHeader
        title="Contact Us"
        description="We'd love to hear from you. Get in touch with our team."
        breadcrumbs={[{ label: "Contact Us" }]}
        icon={<Headset aria-hidden="true" />}
      />
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-1">
            {[
              {
                icon: Phone,
                title: "Phone",
                description: "Mon-Fri from 8am to 6pm",
                href: "tel:+18001234567",
                text: "+1 (800) 123-4567",
              },
              {
                icon: Mail,
                title: "Email",
                description: "We'll respond within 24 hours",
                href: "mailto:support@freshcart.com",
                text: "support@freshcart.com",
              },
              {
                icon: MapPin,
                title: "Office",
                description:
                  "123 Commerce Street\nNew York, NY 10001\nUnited States",
              },
              {
                icon: Clock3,
                title: "Business Hours",
                description:
                  "Monday - Friday: 8am - 6pm\nSaturday: 9am - 4pm\nSunday: Closed",
              },
            ].map(({ icon: Icon, title, description, href, text }) => (
              <section
                key={title}
                className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <h2 className="mb-1 font-semibold text-gray-900">
                      {title}
                    </h2>
                    <p className="whitespace-pre-line text-sm text-gray-500">
                      {description}
                    </p>
                    {href && (
                      <a
                        href={href}
                        className="mt-2 inline-block break-all font-medium text-primary-600 hover:underline"
                      >
                        {text}
                      </a>
                    )}
                  </div>
                </div>
              </section>
            ))}
            <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="mb-4 font-semibold text-gray-900">Follow Us</h2>
              <div className="flex gap-3">
                {(["facebook-f", "twitter", "instagram"] as const).map(
                  (name) => (
                    <a
                      key={name}
                      href={`https://${name === "facebook-f" ? "facebook" : name}.com/`}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={
                        name === "facebook-f"
                          ? "Facebook"
                          : name === "twitter"
                            ? "Twitter"
                            : "Instagram"
                      }
                      className="flex size-10 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors hover:bg-primary-600 hover:text-white"
                    >
                      <SocialIcon name={name} />
                    </a>
                  ),
                )}
                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="flex size-10 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors hover:bg-primary-600 hover:text-white"
                >
                  <span aria-hidden="true" className="font-bold">
                    in
                  </span>
                </a>
              </div>
            </section>
          </div>
          <div className="lg:col-span-2">
            <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:p-8">
              <div className="mb-6 flex items-center gap-3">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                  <Headset size={22} aria-hidden="true" />
                </span>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Send us a Message
                  </h2>
                  <p className="text-sm text-gray-500">
                    Fill out the form and we&apos;ll get back to you
                  </p>
                </div>
              </div>
              <ContactForm />
            </section>
            <section className="mt-6 rounded-2xl border border-primary-100 bg-primary-50 p-6">
              <div className="flex items-start gap-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white text-primary-600 shadow-sm">
                  <CircleHelp size={22} aria-hidden="true" />
                </span>
                <div>
                  <h2 className="mb-1 font-semibold text-gray-900">
                    Looking for quick answers?
                  </h2>
                  <p className="mb-3 text-sm text-gray-600">
                    Check out our Help Center for frequently asked questions
                    about orders, shipping, returns, and more.
                  </p>
                  <details>
                    <summary className="cursor-pointer text-sm font-medium text-primary-600 hover:underline">
                      Visit Help Center →
                    </summary>
                    <dl className="mt-4 space-y-4 text-sm text-gray-600">
                      <div>
                        <dt className="font-semibold text-gray-900">
                          When is shipping free?
                        </dt>
                        <dd className="mt-1">
                          Shipping is free on orders over 500 EGP.
                        </dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-gray-900">
                          Can I return an item?
                        </dt>
                        <dd className="mt-1">
                          We offer a 14-day return policy. Contact support with
                          your order details for help.
                        </dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-gray-900">
                          How do I get help with an order?
                        </dt>
                        <dd className="mt-1">
                          Choose Order Support in the form above and include
                          your order number in your message.
                        </dd>
                      </div>
                    </dl>
                  </details>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
