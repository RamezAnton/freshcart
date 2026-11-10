import type { Metadata } from "next";
import OrdersPage from "@/components/orders/OrdersPage";

export const metadata: Metadata = {
  title: "My Orders | FreshCart",
  description: "View your FreshCart orders and delivery details.",
};
export default function Page() {
  return <OrdersPage />;
}
