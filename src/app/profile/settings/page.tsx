import type { Metadata } from "next";
import AccountSettings from "@/components/account/AccountSettings";

export const metadata: Metadata = { title: "Account Settings | FreshCart" };

export default function SettingsPage() {
  return <AccountSettings />;
}
