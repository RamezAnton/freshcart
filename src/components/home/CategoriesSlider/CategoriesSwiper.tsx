"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import CategoryCard from "../CategoryCard/CategoryCard";

import "swiper/css";
import "swiper/css/navigation";

interface Category {
  image: string;
  name: string;
}

interface CategoriesSwiperProps {
  categories: Category[];
}

export default function CategoriesSwiper({
  categories,
}: CategoriesSwiperProps) {
  return (
    <Swiper
      modules={[Navigation]}
      navigation
      spaceBetween={20}
      slidesPerView={2}
      breakpoints={{
        640: { slidesPerView: 3 },
        768: { slidesPerView: 4 },
        1024: { slidesPerView: 5 },
        1280: { slidesPerView: 6 },
      }}
    >
      {categories.map((category, index) => (
        <SwiperSlide key={`${category.name}-${index}`}>
          <CategoryCard image={category.image} name={category.name} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
