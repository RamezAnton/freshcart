import type { Metadata } from "next";
import Link from "next/link";
import { Cookie, Info, LockKeyhole, Settings2, ChartNoAxesCombined, Megaphone, SlidersHorizontal, Mail } from "lucide-react";
import LegalPage, { type LegalDocument } from "@/components/legal/LegalPage";

export const metadata: Metadata = { title: "Cookie Policy | FreshCart", description: "Learn how FreshCart uses cookies and browser storage, and how to manage your preferences." };

const textClass = "space-y-3 text-sm leading-relaxed text-gray-600";
const linkClass = "font-semibold text-primary-600 hover:underline";
const document: LegalDocument = {
  title: "Cookie Policy", icon: Cookie,
  notice: { title: "A little clarity about cookies", icon: Info, description: "This demo policy explains essential cookies and browser storage used by FreshCart. Analytics and advertising categories below are illustrative; this page does not activate tracking or change your consent settings." },
  articles: [
    { title: "What Are Cookies?", icon: Cookie, content: <div className={textClass}><p>Cookies are small text files stored by your browser when you visit a website. They help a site remember information between visits and keep essential features working.</p><p>Local storage is a separate browser feature that can remember shopping preferences and items on your device.</p></div> },
    { title: "Essential Cookies & Storage", icon: LockKeyhole, content: <div className={textClass}><p>FreshCart uses session cookies to recognize signed-in shoppers and protect account features.</p><p>Your guest cart and wishlist are saved in local storage so you can return to them on the same browser. Clearing that storage can remove items that have not been saved to an account.</p></div> },
    { title: "Preference Cookies", icon: Settings2, content: <div className={textClass}><p>On a full store, preference cookies may remember choices such as language or display settings to make future visits more convenient.</p><p>These are example uses for this demo, rather than a list of additional cookies currently installed.</p></div> },
    { title: "Analytics & Advertising", icon: ChartNoAxesCombined, content: <div className={textClass}><p>Analytics cookies can help a store understand which pages shoppers find useful. Advertising cookies can support relevant promotions.</p><p>These optional categories are described for demonstration only. This page does not enable analytics or advertising cookies.</p><p className="flex items-center gap-2 text-xs text-gray-500"><Megaphone size={15} aria-hidden="true" />No advertising preferences are changed here.</p></div> },
    { title: "Managing Browser Storage", icon: SlidersHorizontal, content: <div className={textClass}><p>You can review or delete site cookies and stored data in your browser settings. Look for Privacy, Site Data, or Cookies in your browser menu.</p><p>Blocking essential cookies may prevent sign-in from working. Deleting site data can sign you out and clear your guest cart and wishlist.</p><p>For more about personal information, read our <Link href="/privacy" className={linkClass}>Privacy Policy</Link>.</p></div> },
    { title: "Questions About This Policy?", icon: Mail, content: <div className={textClass}><p>Our support pages explain common account and shopping questions.</p><p>Visit the <Link href="/help" className={linkClass}>Help Center</Link> or <Link href="/contact" className={linkClass}>contact us</Link> if you need more information about this demo.</p></div> },
  ],
  related: { href: "/privacy", label: "View Privacy Policy" },
};

export default function Page() { return <LegalPage document={document} />; }
