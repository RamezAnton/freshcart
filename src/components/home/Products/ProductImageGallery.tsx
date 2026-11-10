
"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

interface ProductImageGalleryProps {
  images: string[];
  title: string;
}

export default function ProductImageGallery({
  images,
  title,
}: ProductImageGalleryProps) {
  const [thumbsSwiper, setThumbsSwiper] =
    useState<SwiperType | null>(null);

  if (!images.length) return null;

  return (
    <div className="sticky top-4 rounded-xl bg-white p-4 shadow-sm">
      <Swiper
        modules={[Navigation, Thumbs]}
        // navigation
        spaceBetween={10}
        slidesPerView={1}
        thumbs={{
          swiper:
            thumbsSwiper && !thumbsSwiper.destroyed
              ? thumbsSwiper
              : null,
        }}
        className="mb-4"
      >
        {images.map((image, index) => (
          <SwiperSlide key={`${image}-${index}`}>
            <div className="relative h-80 w-full md:h-96">
              <Image
                src={image}
                alt={`${title} - Image ${index + 1}`}
                fill
                sizes="(max-width: 1024px) 100vw, 30vw"
                className="object-contain"
                priority={index === 0}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        modules={[Thumbs]}
        spaceBetween={10}
        slidesPerView={4}
        watchSlidesProgress
        className="[&_.swiper-slide-thumb-active]:border-green-600"
      >
        {images.map((image, index) => (
          <SwiperSlide
            key={`${image}-thumb-${index}`}
            className="cursor-pointer overflow-hidden rounded-lg border-2 border-transparent"
          >
            <div className="relative h-20 w-full">
              <Image
                src={image}
                alt={`${title} thumbnail ${index + 1}`}
                fill
                sizes="100px"
                className="object-contain"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
