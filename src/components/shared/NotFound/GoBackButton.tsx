"use client";

import { useRouter } from "next/navigation";
import NotFoundIcon from "./NotFoundIcon";

export default function GoBackButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() =>
        window.history.length > 1 ? router.back() : router.replace("/")
      }
      className="group inline-flex w-full items-center justify-center gap-3 rounded-2xl border border-gray-200 bg-white px-8 py-4 text-lg font-bold text-gray-700 shadow-md transition-[background-color,box-shadow,transform] duration-300 hover:bg-gray-50 hover:shadow-lg motion-safe:hover:-translate-y-1 sm:w-auto"
    >
      <NotFoundIcon
        name="arrow-left"
        className="size-5 transition-transform duration-300 motion-safe:group-hover:-translate-x-1"
      />
      Go Back
    </button>
  );
}
