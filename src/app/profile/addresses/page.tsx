import type { Metadata } from "next";
import Addresses from "@/components/account/Addresses";

export const metadata: Metadata = { title: "My Addresses | FreshCart" };

export default function AddressesPage() {
  return <Addresses />;
}
