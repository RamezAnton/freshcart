"use client";

import { SessionProvider } from "next-auth/react";
import type { ReactNode } from "react";
import WishlistProvider from "@/components/wishlist/WishlistProvider";
import CartProvider from "@/components/cart/CartProvider";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <CartProvider>
        <WishlistProvider>{children}</WishlistProvider>
      </CartProvider>
    </SessionProvider>
  );
}
