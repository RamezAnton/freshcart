import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, type LucideIcon } from "lucide-react";
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList,
  BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export interface LegalDocument {
  title: string;
  icon: LucideIcon;
  notice: { title: string; description: string; icon: LucideIcon };
  articles: { title: string; icon: LucideIcon; content: ReactNode }[];
  related: { href: string; label: string };
}

export default function LegalPage({ document }: { document: LegalDocument }) {
  const { title, icon: Icon, notice, articles, related } = document;
  const NoticeIcon = notice.icon;
  const privacy = related.href === "/terms";

  return (
    <main className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      <header className="bg-linear-to-br from-primary-600 via-primary-500 to-primary-400 text-white">
        <div className="container mx-auto px-4 py-12 sm:py-16">
          <Breadcrumb className="mb-8">
            <BreadcrumbList className="gap-2 text-white/70">
              <BreadcrumbItem>
                <BreadcrumbLink render={<Link href="/" />} className="hover:text-white">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-white/40">/</BreadcrumbSeparator>
              <BreadcrumbItem><BreadcrumbPage className="font-medium text-white">{title}</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <span className="flex size-20 shrink-0 items-center justify-center rounded-3xl bg-white/20 shadow-2xl shadow-primary-900/30 ring-1 ring-white/30 backdrop-blur-sm">
              <Icon className="size-9" aria-hidden="true" />
            </span>
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">{title}</h1>
              <p className="mt-2 text-lg text-white/80">Last updated: February 2026</p>
            </div>
          </div>
        </div>
      </header>
      <div className="container mx-auto px-4 py-12">
        <section aria-labelledby="legal-notice" className={`mb-12 rounded-3xl border bg-linear-to-r p-6 shadow-sm sm:p-8 ${privacy ? "border-primary-200 from-primary-50 to-primary-100/50" : "border-amber-200 from-amber-50 to-amber-100/50"}`}>
          <div className="flex items-start gap-4">
            <span className={`flex size-12 shrink-0 items-center justify-center rounded-2xl text-white shadow-lg ${privacy ? "bg-primary-500 shadow-primary-500/25" : "bg-amber-500 shadow-amber-500/25"}`}>
              <NoticeIcon size={22} aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <h2 id="legal-notice" className={`mb-2 text-lg font-bold ${privacy ? "text-primary-900" : "text-amber-900"}`}>{notice.title}</h2>
              <p className={`leading-relaxed ${privacy ? "text-primary-800" : "text-amber-800"}`}>{notice.description}</p>
            </div>
          </div>
        </section>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          {articles.map(({ title: articleTitle, icon: ArticleIcon, content }, index) => (
            <section key={articleTitle} aria-labelledby={`article-${index + 1}`} className="group rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:border-primary-100 hover:shadow-lg motion-reduce:transition-none sm:p-8">
              <div className="mb-5 flex items-start gap-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-primary-100 to-primary-50 text-primary-600 transition-all duration-300 group-hover:from-primary-500 group-hover:to-primary-400 group-hover:text-white motion-reduce:transition-none">
                  <ArticleIcon size={22} aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <span className="text-xs font-bold tracking-wider text-primary-600 uppercase">Article {index + 1}</span>
                  <h2 id={`article-${index + 1}`} className="text-xl font-bold text-gray-900">{articleTitle}</h2>
                </div>
              </div>
              {content}
            </section>
          ))}
        </div>
        <nav aria-label="Legal pages" className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-8 sm:flex-row">
          <Link href="/" className="inline-flex items-center gap-2 rounded-xl bg-gray-100 px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-200"><ArrowLeft size={16} aria-hidden="true" />Back to Home</Link>
          <Link href={related.href} className="inline-flex items-center gap-2 rounded-xl bg-primary-500 px-6 py-3 font-medium text-white shadow-lg shadow-primary-500/25 transition-colors hover:bg-primary-600">{related.label}<ArrowRight size={18} aria-hidden="true" /></Link>
        </nav>
      </div>
    </main>
  );
}
