
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Star,
  Minus,
  Plus,
  ShoppingCart,
  Zap,
  Heart,
  Share2,
  Truck,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";

import type { Product } from "@/interfaces/product.interface";
import { priceFormatter } from "@/lib/clientUtils";
import { useWishlist } from "@/components/wishlist/WishlistProvider";
import { useCart } from "@/components/cart/CartProvider";
import { useRouter } from "next/navigation";

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({
  product,
}: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1);
  const { addItem, busy, loading } = useCart();
  const router = useRouter();
  const wishlist = useWishlist();
  const isFavorite = wishlist.items.some((item) => item._id === product._id);

  const inStock = product.quantity > 0;

  const hasDiscount =
    typeof product.priceAfterDiscount === "number" &&
    product.priceAfterDiscount >= 0 &&
    product.priceAfterDiscount < product.price;

  const currentPrice = hasDiscount
    ? product.priceAfterDiscount!
    : product.price;

  const discountPercentage = hasDiscount
    ? Math.round(
        ((product.price - currentPrice) / product.price) * 100
      )
    : 0;

  const totalPrice = currentPrice * quantity;

  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const increaseQuantity = () => {
    setQuantity((prev) =>
      Math.min(product.quantity, prev + 1)
    );
  };

  const handleQuantityChange = (value: number) => {
    if (!Number.isFinite(value)) return;

    setQuantity(
      Math.min(
        Math.max(1, Math.trunc(value)),
        Math.max(1, product.quantity)
      )
    );
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.title,
          url: window.location.href,
        });
      } catch {
        // User cancelled or sharing is unavailable.
      }
    } else {
      await navigator.clipboard.writeText(
        window.location.href
      );
    }
  };

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      {/* Category and Brand */}
      <div className="mb-4 flex flex-wrap gap-2">
        <Link
          href={`/categories/${product.category._id}`}
          className="rounded-full bg-green-50 px-3 py-1.5 text-xs text-green-700 transition hover:bg-green-100"
        >
          {product.category.name}
        </Link>

        {product.brand && (
          <span className="rounded-full bg-gray-100 px-3 py-1.5 text-xs text-gray-700">
            {product.brand.name}
          </span>
        )}
      </div>

      {/* Product Title */}
      <h1 className="mb-3 text-2xl font-bold text-gray-900 lg:text-3xl">
        {product.title}
      </h1>

      {/* Rating */}
      <div className="mb-4 flex items-center gap-3">
        <div className="flex items-center gap-0.5 text-yellow-400">
          {Array.from({ length: 5 }, (_, index) => (
            <Star
              key={index}
              size={18}
              fill={
                index < Math.floor(product.ratingsAverage)
                  ? "currentColor"
                  : "none"
              }
            />
          ))}
        </div>

        <span className="text-sm text-gray-600">
          {product.ratingsAverage} (
          {product.ratingsQuantity} reviews)
        </span>
      </div>

      {/* Price */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <span className="text-3xl font-bold text-gray-900">
          {priceFormatter(currentPrice)}
        </span>

        {hasDiscount && (
          <>
            <span className="text-lg text-gray-400 line-through">
              {priceFormatter(product.price)}
            </span>

            <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-medium text-white">
              Save {discountPercentage}%
            </span>
          </>
        )}
      </div>

      {/* Stock */}
      <div className="mb-6 flex items-center gap-2">
        <span
          className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm ${
            inStock
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          <span
            className={`size-2 rounded-full ${
              inStock ? "bg-green-500" : "bg-red-500"
            }`}
          />
          {inStock ? "In Stock" : "Out of Stock"}
        </span>
      </div>

      {/* Description */}
      <div className="mb-6 border-t border-gray-100 pt-5">
        <p className="leading-relaxed text-gray-600">
          {product.description}
        </p>
      </div>

      {/* Quantity */}
      <div className="mb-6">
        <label
          htmlFor="quantity"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Quantity
        </label>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center overflow-hidden rounded-lg border-2 border-gray-200">
            <button
              type="button"
              onClick={decreaseQuantity}
              disabled={!inStock || quantity <= 1}
              aria-label="Decrease quantity"
              className="px-4 py-3 text-gray-600 transition hover:bg-gray-100 hover:text-green-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Minus size={16} />
            </button>

            <input
              id="quantity"
              type="number"
              min={1}
              max={Math.max(1, product.quantity)}
              value={quantity}
              disabled={!inStock}
              onChange={(e) =>
                handleQuantityChange(Number(e.target.value))
              }
              className="w-16 border-0 text-center text-lg font-medium focus:outline-none disabled:opacity-50"
            />

            <button
              type="button"
              onClick={increaseQuantity}
              disabled={!inStock || quantity >= product.quantity}
              aria-label="Increase quantity"
              className="px-4 py-3 text-gray-600 transition hover:bg-gray-100 hover:text-green-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Plus size={16} />
            </button>
          </div>

          <span className="text-sm text-gray-500">
            {product.quantity} available
          </span>
        </div>
      </div>

      {/* Total Price */}
      <div className="mb-6 rounded-lg bg-gray-50 p-4">
        <div className="flex items-center justify-between gap-3">
          <span className="text-gray-600">
            Total Price:
          </span>

          <span className="text-2xl font-bold text-green-600">
            {priceFormatter(totalPrice)}
          </span>
        </div>
      </div>

      {/* Cart Actions */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          disabled={!inStock || busy || loading}
          onClick={() => void addItem(product, currentPrice, quantity)}
          className="flex cursor-pointer flex-1 items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3.5 font-medium text-white shadow-lg shadow-green-600/25 transition-all hover:bg-green-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ShoppingCart size={18} />
          Add to Cart
        </button>

        <button
          type="button"
          disabled={!inStock || busy || loading}
          onClick={async () => { if (await addItem(product, currentPrice, quantity)) router.push("/cart"); }}
          className="flex cursor-pointer flex-1 items-center justify-center gap-2 rounded-xl bg-gray-900 px-6 py-3.5 font-medium text-white transition-all hover:bg-gray-800 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Zap size={18} />
          Buy Now
        </button>
      </div>

      {/* Wishlist and Share */}
      <div className="mb-6 flex gap-3">
        <button
          type="button"
          onClick={() => void wishlist.toggle(product)}
          disabled={wishlist.loading || wishlist.busy}
          aria-pressed={isFavorite}
          className={`flex cursor-pointer flex-1 items-center justify-center gap-2 rounded-xl border-2 px-4 py-3 font-medium transition ${
            isFavorite
              ? "border-red-300 bg-red-50 text-red-600"
              : "border-gray-200 text-gray-700 hover:border-green-300 hover:text-green-600"
          }`}
        >
          <Heart
            size={18}
            fill={isFavorite ? "currentColor" : "none"}
          />
          {isFavorite ? "In Wishlist" : "Add to Wishlist"}
        </button>

        <button
          type="button"
          onClick={handleShare}
          aria-label="Share product"
          className="rounded-xl cursor-pointer border-2 border-gray-200 px-4 py-3 text-gray-700 transition hover:border-green-300 hover:text-green-600"
        >
          <Share2 size={18} />
        </button>
      </div>

      {/* Service Features */}
      <div className="border-t border-gray-100 pt-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
              <Truck size={20} />
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-900">
                Free Delivery
              </h4>
              <p className="text-xs text-gray-500">
                Orders over $50
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
              <RotateCcw size={20} />
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-900">
                30 Days Return
              </h4>
              <p className="text-xs text-gray-500">
                Money back
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-900">
                Secure Payment
              </h4>
              <p className="text-xs text-gray-500">
                100% Protected
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
