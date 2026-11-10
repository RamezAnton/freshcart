import { ArrowRight, Gift, Leaf, Mail, Truck } from "lucide-react";

const storePaths = {
  apple:
    "M319.1 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7-55.8 .9-115.1 44.5-115.1 133.2 0 26.2 4.8 53.3 14.4 81.2 12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zM262.5 104.5c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z",
  play: "M293.6 234.3L72.9 13 353.7 174.2 293.6 234.3zM15.3 0C2.3 6.8-6.4 19.2-6.4 35.3l0 441.3c0 16.1 8.7 28.5 21.7 35.3L271.9 255.9 15.3 0zM440.5 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM72.9 499L353.7 337.8 293.6 277.7 72.9 499z",
};

export default function Newsletter() {
  return (
    <section
      aria-labelledby="newsletter-heading"
      className="bg-linear-to-b from-white to-gray-50 py-16"
    >
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-emerald-100/50 bg-linear-to-br from-emerald-50 via-white to-teal-50 shadow-2xl shadow-emerald-500/10">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-0 right-0 size-80 translate-x-1/4 -translate-y-1/2 rounded-full bg-linear-to-br from-emerald-200/40 to-transparent blur-3xl"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-0 size-64 -translate-x-1/4 translate-y-1/2 rounded-full bg-linear-to-tr from-teal-200/30 to-transparent blur-3xl"
          />
          <div className="relative grid gap-8 p-6 sm:p-8 lg:grid-cols-5 lg:p-14">
            <div className="space-y-6 lg:col-span-3">
              <div className="flex items-center gap-4">
                <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30">
                  <Mail size={24} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-semibold tracking-wide text-emerald-600 uppercase">
                    Newsletter
                  </p>
                  <p className="text-xs text-gray-500">50,000+ subscribers</p>
                </div>
              </div>
              <div>
                <h2
                  id="newsletter-heading"
                  className="text-3xl leading-snug font-bold text-gray-900 lg:text-4xl"
                >
                  Get the Freshest Updates{" "}
                  <span className="text-emerald-600">Delivered Free</span>
                </h2>
                <p className="mt-3 text-lg text-gray-500">
                  Weekly recipes, seasonal offers &amp; exclusive member perks.
                </p>
              </div>
              <ul className="flex flex-wrap gap-3">
                {[
                  { icon: Leaf, text: "Fresh Picks Weekly" },
                  { icon: Truck, text: "Free Delivery Codes" },
                  { icon: Gift, text: "Members-Only Deals" },
                ].map(({ icon: Icon, text }) => (
                  <li
                    key={text}
                    className="flex items-center gap-2.5 rounded-full border border-emerald-100 bg-white/80 px-4 py-2.5 shadow-sm backdrop-blur-sm"
                  >
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                      <Icon size={13} aria-hidden="true" />
                    </span>
                    <span className="text-sm font-medium text-gray-700">
                      {text}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="pt-2">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <label htmlFor="newsletter-email" className="sr-only">
                    Email address for newsletter
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    disabled
                    placeholder="you@example.com"
                    aria-describedby="newsletter-status"
                    className="w-full min-w-0 flex-1 rounded-2xl border-2 border-gray-200 bg-white px-5 py-4 text-base text-gray-800 shadow-sm disabled:cursor-not-allowed"
                  />
                  <button
                    type="button"
                    disabled
                    aria-describedby="newsletter-status"
                    className="flex cursor-not-allowed items-center justify-center gap-3 rounded-2xl bg-linear-to-r from-emerald-600 to-emerald-500 px-8 py-4 font-semibold text-white opacity-60 shadow-lg shadow-emerald-500/30"
                  >
                    Subscribe
                    <ArrowRight size={16} aria-hidden="true" />
                  </button>
                </div>
                <p
                  id="newsletter-status"
                  className="mt-3 pl-1 text-xs text-gray-500"
                >
                  Newsletter subscriptions are coming soon.
                </p>
              </div>
            </div>
            <div className="lg:col-span-2 lg:border-l lg:border-emerald-100 lg:pl-8">
              <div className="flex h-full flex-col justify-center">
                <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-gray-900 to-gray-800 p-6 text-white sm:p-8">
                  <span
                    aria-hidden="true"
                    className="absolute top-0 right-0 size-32 rounded-full bg-emerald-500/20 blur-2xl"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 size-24 rounded-full bg-teal-500/20 blur-2xl"
                  />
                  <div className="relative space-y-5">
                    <p className="inline-block rounded-full border border-emerald-500/30 bg-emerald-500/20 px-3 py-1.5 text-xs font-semibold text-emerald-400">
                      📱 MOBILE APP
                    </p>
                    <h3 className="text-2xl leading-tight font-bold">
                      Shop Faster on Our App
                    </h3>
                    <p className="text-sm leading-relaxed text-gray-400">
                      Get app-exclusive deals &amp; 15% off your first order.
                    </p>
                    <div className="flex flex-col gap-3 pt-2">
                      {["App Store", "Google Play"].map((store) => (
                        <a
                          key={store}
                          href="#"
                          aria-label={`${store} download`}
                          className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-left transition-all hover:scale-[1.02] hover:bg-white/15"
                        >
                          <svg
                            className="size-6 shrink-0"
                            viewBox={
                              store === "App Store"
                                ? "0 0 384 512"
                                : "0 0 448 512"
                            }
                            aria-hidden="true"
                          >
                            <path
                              fill="currentColor"
                              d={
                                store === "App Store"
                                  ? storePaths.apple
                                  : storePaths.play
                              }
                            />
                          </svg>
                          <span>
                            <span className="block text-[10px] tracking-wide text-gray-400 uppercase">
                              {store === "App Store"
                                ? "Download on"
                                : "Get it on"}
                            </span>
                            <span className="block text-sm font-semibold">
                              {store}
                            </span>
                          </span>
                        </a>
                      ))}
                    </div>
                    <p className="text-xs text-emerald-300">
                      App downloads coming soon
                    </p>
                    <div className="flex flex-wrap items-center gap-2 pt-2 text-sm">
                      <span
                        aria-label="5 out of 5 stars"
                        className="text-yellow-400"
                      >
                        ★★★★★
                      </span>
                      <span className="text-gray-400">
                        4.9 • 100K+ downloads
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
