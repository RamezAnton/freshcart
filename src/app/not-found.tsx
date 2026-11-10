import Link from "next/link";
import GoBackButton from "@/components/shared/NotFound/GoBackButton";
import NotFoundIcon from "@/components/shared/NotFound/NotFoundIcon";
import styles from "./not-found.module.css";

const decorations = [
  { icon: "apple-whole", position: "top-[10%] left-[5%] size-10 text-primary-200", duration: "6s", delay: "0s" },
  { icon: "carrot", position: "top-[20%] right-[10%] size-8 text-primary-200", duration: "8s", delay: "1s" },
  { icon: "lemon", position: "bottom-[25%] left-[8%] size-8 text-primary-200", duration: "7s", delay: "0.5s" },
  { icon: "seedling", position: "bottom-[15%] right-[15%] size-10 text-primary-200", duration: "9s", delay: "2s" },
  { icon: "apple-whole", position: "top-1/2 left-[15%] size-6 text-primary-100", duration: "5s", delay: "1.5s" },
  { icon: "carrot", position: "top-[40%] right-[5%] size-6 text-primary-100", duration: "6s", delay: "0.8s" },
] as const;

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-1 items-center justify-center overflow-hidden bg-[#fafbfc] px-4 py-16">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {decorations.map(({ icon, position, duration, delay }, index) => (
          <div key={index} className={`absolute ${position} ${styles.float}`} style={{ animationDuration: duration, animationDelay: delay }}>
            <NotFoundIcon name={icon} className="size-full" />
          </div>
        ))}
        <div className="absolute top-0 right-0 size-125 rounded-full bg-linear-to-bl from-primary-100/40 to-transparent blur-3xl" />
        <div className="absolute bottom-0 left-0 size-100 rounded-full bg-linear-to-tr from-primary-100/30 to-transparent blur-3xl" />
      </div>
      <div className="relative z-10 w-full max-w-xl">
        <div aria-hidden="true" className="mb-10 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 h-52 w-64 rounded-[32px] bg-primary-100/50 blur-2xl sm:h-60 sm:w-72" />
            <div className="relative h-52 w-64 sm:h-60 sm:w-72">
              <div className="absolute inset-x-0 top-4 mx-auto flex h-40 w-52 items-center justify-center overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl shadow-gray-200/60 sm:h-44 sm:w-60">
                <div className="absolute inset-0 bg-linear-to-br from-primary-50/80 via-transparent to-primary-100/40" />
                <NotFoundIcon name="cart-shopping" className="relative size-16 text-primary-400/80 sm:size-20" />
              </div>
              <div className="absolute -top-2 -right-2 sm:top-0 sm:right-0">
                <div className="relative">
                  <div className="absolute -inset-2 rounded-full bg-white shadow-lg" />
                  <div className="relative flex size-16 items-center justify-center rounded-full bg-linear-to-br from-primary-500 to-primary-600 shadow-lg shadow-primary-500/40 sm:size-20">
                    <span className="text-xl font-black tracking-tight text-white sm:text-2xl">404</span>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-1 left-1/2 flex -translate-x-1/2 items-center justify-center gap-4 text-primary-400">
                <span className="size-2.5 rounded-full bg-current" />
                <span className="h-4 w-8 rounded-b-full border-b-[3px] border-current" />
                <span className="size-2.5 rounded-full bg-current" />
              </div>
            </div>
          </div>
        </div>
        <div className="mb-10 text-center">
          <h1 className="mb-4 text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">Oops! Nothing Here</h1>
          <p className="mx-auto max-w-md text-lg leading-relaxed text-gray-500">Looks like this page went out of stock! Don&apos;t worry, there&apos;s plenty more fresh content to explore.</p>
        </div>
        <div className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/" className="group inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-primary-600 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-primary-600/25 transition-[background-color,box-shadow,transform] duration-300 hover:bg-primary-700 hover:shadow-xl hover:shadow-primary-600/30 motion-safe:hover:-translate-y-1 sm:w-auto">
            <NotFoundIcon name="house" className="size-5 transition-transform duration-300 motion-safe:group-hover:scale-110" />Go to Homepage
          </Link>
          <GoBackButton />
        </div>
        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
          <p className="mb-4 text-center text-sm font-medium tracking-wider text-gray-400 uppercase">Popular Destinations</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/products" className="rounded-xl bg-primary-50 px-5 py-2.5 text-sm font-semibold text-primary-700 transition-colors hover:bg-primary-100">All Products</Link>
            <Link href="/categories" className="rounded-xl bg-gray-100 px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-200">Categories</Link>
            <Link href="/products?discount=true" className="rounded-xl bg-gray-100 px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-200">Today&apos;s Deals</Link>
            <Link href="/contact" className="rounded-xl bg-gray-100 px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-200">Contact Us</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
