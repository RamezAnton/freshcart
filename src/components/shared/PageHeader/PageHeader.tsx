import { Fragment, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";

export interface PageHeaderProps {
  title: string;
  description: string;
  breadcrumbs: { label: string; href?: string }[];
  icon?: ReactNode;
  image?: { src: string; alt: string };
  variant?: "green" | "purple";
  className?: string;
}

export default function PageHeader({
  title,
  description,
  breadcrumbs,
  icon,
  image,
  variant = "green",
  className,
}: PageHeaderProps) {
  const trail = [{ label: "Home", href: "/" }, ...breadcrumbs];

  return (
    <section
      className={cn(
        "text-white",
        variant === "purple"
          ? "bg-linear-to-br from-violet-600 via-violet-500 to-purple-400"
          : "bg-linear-to-br from-primary-600 via-primary-500 to-primary-400",
        className,
      )}
    >
      <div className="container mx-auto px-4 py-9 sm:py-12 lg:py-14">
        <Breadcrumb className="mb-6">
          <BreadcrumbList className="gap-2 text-white/75 sm:gap-2">
            {trail.map(({ label, href }, index) => (
              <Fragment key={`${label}-${index}`}>
                {index > 0 && (
                  <BreadcrumbSeparator className="text-white/60">
                    /
                  </BreadcrumbSeparator>
                )}
                <BreadcrumbItem>
                  {href && index < trail.length - 1 ? (
                    <BreadcrumbLink
                      render={<Link href={href} />}
                      className="hover:text-white"
                    >
                      {label}
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage className="font-medium text-white">
                      {label}
                    </BreadcrumbPage>
                  )}
                </BreadcrumbItem>
              </Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex items-center gap-4 sm:gap-5">
          {(image || icon) && (
            <div className="relative flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-white/20 shadow-sm sm:size-16 [&>svg]:size-7 sm:[&>svg]:size-8">
              {image ? (
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="64px"
                  className="object-contain p-3"
                />
              ) : (
                icon
              )}
            </div>
          )}
          <div className="min-w-0">
            <h1 className="text-2xl leading-tight font-bold sm:text-3xl lg:text-4xl">
              {title}
            </h1>
            <p className="mt-1.5 text-sm leading-relaxed text-white/90 sm:text-base">
              {description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
