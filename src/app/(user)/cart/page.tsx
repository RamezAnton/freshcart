import type { Metadata } from "next";
import ShoppingCartPage from "@/components/cart/ShoppingCartPage";

export const metadata: Metadata = { title: "Shopping Cart | FreshCart" };

export default function CartPage() {
  return <ShoppingCartPage />;
}
