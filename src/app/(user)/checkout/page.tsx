import type { Metadata } from "next";
import CheckoutPage from "@/components/orders/CheckoutPage";

export const metadata: Metadata = {
  title: "Checkout | FreshCart",
  description:
    "Choose your delivery address and payment method to complete your order.",
};
export default function Page() {
  return <CheckoutPage />;
}
