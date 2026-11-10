import type { ReactNode } from "react";
import { UserRound } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader/PageHeader";
import AccountShell from "@/components/account/AccountShell";

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex-1 bg-gray-50/70">
      <PageHeader
        title="My Account"
        description="Manage your addresses and account settings"
        breadcrumbs={[{ label: "My Account" }]}
        icon={<UserRound aria-hidden="true" />}
      />
      <AccountShell>{children}</AccountShell>
    </div>
  );
}
