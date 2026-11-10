import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface SectionTitleProps {
  title: string;
  subtitle: string;
  action?: { label: string; href: string };
}
export default function SectionTitle({
  title,
  subtitle,
  action,
}: SectionTitleProps) {
  return (
    <div className="my-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div className="flex items-center gap-3">
        <div
          aria-hidden="true"
          className="h-8 w-1.5 bg-linear-to-b from-emerald-500 to-emerald-700 rounded-full"
        ></div>
        <h2 className="text-2xl font-bold text-gray-800 md:text-3xl">
          {title} <span className="text-emerald-600">{subtitle}</span>
        </h2>
      </div>
      {action && (
        <Link
          href={action.href}
          className="inline-flex items-center gap-2 self-end font-medium text-primary-600 hover:text-primary-700 sm:self-auto"
        >
          {action.label}
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      )}
    </div>
  );
}
