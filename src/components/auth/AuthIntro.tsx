import Image from "next/image";
import {
  Headset,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Star,
  Truck,
} from "lucide-react";
import loginImage from "@/assets/images/login.webp";

export function LoginIntro() {
  return (
    <div className="hidden space-y-6 text-center lg:block">
      <Image
        src={loginImage}
        alt="A shopping cart full of fresh fruit and vegetables"
        sizes="(min-width: 1024px) 560px, 0px"
        className="h-96 w-full rounded-2xl object-cover shadow-lg"
        loading="eager"
      />
      <div className="space-y-4">
        <h2 className="text-3xl font-bold leading-tight text-gray-800">
          FreshCart - Your One-Stop Shop for Fresh Products
        </h2>
        <p className="text-lg leading-relaxed text-gray-600">
          Join thousands of happy customers who trust FreshCart for their daily
          grocery needs
        </p>
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-gray-500">
          {[
            { icon: Truck, text: "Free Delivery" },
            { icon: ShieldCheck, text: "Secure Payment" },
            { icon: Headset, text: "24/7 Support" },
          ].map(({ icon: Icon, text }) => (
            <span key={text} className="flex items-center gap-2">
              <Icon size={15} className="text-primary-600" aria-hidden="true" />
              {text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function RegisterIntro() {
  return (
    <div>
      <h1 className="text-3xl leading-tight font-bold text-gray-800 sm:text-4xl">
        Welcome to <span className="text-primary-600">FreshCart</span>
      </h1>
      <p className="mt-2 mb-4 text-lg leading-relaxed text-gray-700 sm:text-xl">
        Join thousands of happy customers who enjoy fresh groceries delivered
        right to their doorstep.
      </p>
      <ul className="my-8 space-y-6">
        {[
          {
            icon: Star,
            title: "Premium Quality",
            text: "Premium quality products sourced from trusted suppliers.",
          },
          {
            icon: Truck,
            title: "Fast Delivery",
            text: "Same-day delivery available in most areas",
          },
          {
            icon: ShieldCheck,
            title: "Secure Shopping",
            text: "Your data and payments are completely secure",
          },
        ].map(({ icon: Icon, title, text }) => (
          <li key={title} className="flex items-start gap-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary-200 text-primary-600">
              <Icon
                size={21}
                fill={title === "Premium Quality" ? "currentColor" : "none"}
                aria-hidden="true"
              />
            </span>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
              <p className="mt-1 text-sm leading-relaxed text-gray-600 sm:text-base">
                {text}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <figure className="rounded-md border border-gray-100 bg-white p-4 shadow-sm">
        <figcaption className="mb-4 flex items-center gap-4">
          <svg
            aria-hidden="true"
            viewBox="0 0 48 48"
            className="size-12 shrink-0 rounded-full"
          >
            <circle cx="24" cy="24" r="24" fill="#85dc50" />
            <path d="M12 24C8 5 39 1 37 26l-3 12H13Z" fill="#493530" />
            <path d="M8 48V39c0-9 32-9 32 0v9" fill="#cc6169" />
            <path d="m18 31 6 10 6-10" fill="#fff" />
            <path d="M21 26h6v8h-6" fill="#e7af8f" />
            <ellipse cx="24" cy="20" rx="9" ry="12" fill="#f7c8a7" />
            <path
              d="M14 19c0-16 22-16 21 3-4-3-8-8-9-11-2 5-7 7-12 8"
              fill="#493530"
            />
          </svg>
          <div>
            <p className="font-medium text-gray-700">Sarah Johnson</p>
            <div
              aria-label="5 out of 5 stars"
              className="mt-1 flex gap-0.5 text-yellow-400"
            >
              {[0, 1, 2, 3, 4].map((i) => (
                <Star
                  key={i}
                  size={16}
                  fill="currentColor"
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>
        </figcaption>
        <blockquote className="text-sm leading-relaxed text-gray-600 italic sm:text-base">
          &quot;FreshCart has transformed my shopping experience. The quality of
          the products is outstanding, and the delivery is always on time.
          Highly recommend!&quot;
        </blockquote>
      </figure>
    </div>
  );
}

export function RecoveryIntro() {
  return (
    <div className="hidden space-y-6 text-center lg:block">
      <div className="relative flex h-96 items-center justify-center overflow-hidden rounded-2xl bg-linear-to-br from-primary-50 via-emerald-50 to-gray-100 shadow-lg">
        <span className="absolute top-8 left-8 size-24 rounded-full bg-primary-100/50" />
        <span className="absolute right-10 bottom-10 size-28 rounded-full bg-primary-100/50" />
        <div className="relative flex items-center gap-3">
          <span className="flex size-16 -rotate-12 items-center justify-center rounded-2xl bg-white text-primary-500 shadow-lg">
            <Mail size={26} aria-hidden="true" />
          </span>
          <span className="flex size-28 items-center justify-center rounded-3xl bg-white text-primary-600 shadow-xl">
            <span className="flex size-20 items-center justify-center rounded-2xl bg-primary-100">
              <LockKeyhole size={38} aria-hidden="true" />
            </span>
          </span>
          <span className="flex size-16 rotate-12 items-center justify-center rounded-2xl bg-white text-primary-500 shadow-lg">
            <ShieldCheck size={26} aria-hidden="true" />
          </span>
          <div className="absolute -bottom-8 left-1/2 flex -translate-x-1/2 gap-3">
            {[0, 1, 2].map((i) => (
              <span key={i} className="size-3 rounded-full bg-primary-500" />
            ))}
          </div>
        </div>
      </div>
      <h2 className="text-3xl font-bold text-gray-800">Reset Your Password</h2>
      <p className="text-lg leading-relaxed text-gray-600">
        Don&apos;t worry, it happens to the best of us. We&apos;ll help you get
        back into your account in no time.
      </p>
      <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
        {[
          { icon: Mail, text: "Email Verification" },
          { icon: ShieldCheck, text: "Secure Reset" },
          { icon: LockKeyhole, text: "Encrypted" },
        ].map(({ icon: Icon, text }) => (
          <span key={text} className="flex items-center gap-2">
            <Icon size={15} className="text-primary-600" aria-hidden="true" />
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
