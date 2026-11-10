"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, Heart, Plus, RefreshCw, Star } from "lucide-react";
import { Product } from "@/interfaces/product.interface";
import { priceFormatter } from "@/lib/clientUtils";
import { useWishlist } from "@/components/wishlist/WishlistProvider";
import { useCart } from "@/components/cart/CartProvider";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem, busy, loading } = useCart();
  const wishlist = useWishlist();
  const isFavorite = wishlist.items.some((item) => item._id === product._id);

  const hasDiscount =
    typeof product.priceAfterDiscount === "number" &&
    product.priceAfterDiscount >= 0 &&
    product.priceAfterDiscount < product.price;

  const discountPercentage = hasDiscount
    ? Math.round(
        ((product.price - product.priceAfterDiscount!) / product.price) * 100,
      )
    : 0;

  const currentPrice = hasDiscount
    ? product.priceAfterDiscount!
    : product.price;

  const productUrl = `/products/${product._id}`;

  return (
    <div className="group flex h-full w-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Product Image */}
      <div className="relative h-60 w-full bg-white">
        <Link href={productUrl} className="relative block h-full w-full">
          <Image
            src={product.imageCover}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
            className="object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute top-3 left-3">
            <span className="rounded bg-red-500 px-2 py-1 text-xs font-medium text-white">
              -{discountPercentage}%
            </span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <button
            type="button"
            title={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
            aria-label={`${isFavorite ? "Remove" : "Save"} ${product.title} ${isFavorite ? "from" : "to"} wishlist`}
            aria-pressed={isFavorite}
            onClick={() => void wishlist.toggle(product)}
            disabled={wishlist.loading || wishlist.busy}
            className={`flex cursor-pointer size-8 items-center justify-center rounded-full bg-white shadow-sm transition-colors ${
              isFavorite ? "text-red-500" : "text-gray-600 hover:text-red-500"
            }`}
          >
            <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
          </button>

          <button
            type="button"
            title="Compare product"
            aria-label="Compare product"
            className="flex size-8 items-center justify-center rounded-full bg-white text-gray-600 shadow-sm transition-colors hover:text-green-600 cursor-pointer"
          >
            <RefreshCw size={18} />
          </button>

          <Link
            href={productUrl}
            title="View product"
            aria-label={`View ${product.title}`}
            className="flex size-8 items-center justify-center rounded-full bg-white text-gray-600 shadow-sm transition-colors hover:text-green-600"
          >
            <Eye size={18} />
          </Link>
        </div>
      </div>

      {/* Product Details */}
      <div className="flex flex-1 flex-col p-4">
        {/* Category */}
        <p className="mb-1 text-xs text-gray-500">{product.category.name}</p>

        {/* Product Title */}
        <h3
          className="mb-1 line-clamp-2 min-h-12 text-base font-medium text-gray-800 hover:text-green-600"
          title={product.title}
        >
          <Link href={productUrl}>{product.title}</Link>
        </h3>

        {/* Rating */}
        <div className="mb-2 flex items-center gap-2">
          <div className="flex items-center gap-0.5 text-yellow-400">
            {Array.from({ length: 5 }, (_, index) => (
              <Star
                key={index}
                size={17}
                strokeWidth={1.5}
                fill={
                  index < Math.floor(product.ratingsAverage)
                    ? "currentColor"
                    : "none"
                }
              />
            ))}
          </div>

          <span className="text-xs whitespace-nowrap text-gray-500">
            {product.ratingsAverage} ({product.ratingsQuantity})
          </span>
        </div>

        {/* Price and Cart */}
        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`text-lg font-bold ${
                hasDiscount ? "text-green-600" : "text-gray-800"
              }`}
            >
              {priceFormatter(currentPrice)}
            </span>

            {hasDiscount && (
              <span className="text-sm text-gray-500 line-through">
                {priceFormatter(product.price)}
              </span>
            )}
          </div>

          <button
            type="button"
            title="Add to cart"
            aria-label={`Add ${product.title} to cart`}
            className="flex cursor-pointer size-10 shrink-0 items-center justify-center rounded-full bg-green-600 text-white transition-colors hover:bg-green-700 disabled:opacity-70"
            disabled={product.quantity <= 0 || busy || loading}
            onClick={() => void addItem(product, currentPrice)}
          >
            <Plus size={24} strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
}
