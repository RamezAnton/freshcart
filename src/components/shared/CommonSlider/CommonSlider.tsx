"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./CommonSlider.css";

export interface Slide {
  src: string;
  label: string;
  title?: string;
  description?: string;
  accent?: "green" | "blue" | "purple";
  actions?: { label: string; href: string; secondary?: boolean }[];
}

interface CommonSliderProps {
  slides: Slide[];
  variant: "categories" | "main";
}

const accents = {
  green: "text-green-500",
  blue: "text-blue-500",
  purple: "text-purple-500",
};

export default function CommonSlider({ slides, variant }: CommonSliderProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!slides.length) return null;
  const main = variant === "main";
  const interactive = slides.length > 1;

  
  if (!mounted)
    return (
      <div className={`common-slider common-slider--${variant}`}>
        <SlideContent slide={slides[0]} main={main} eager />
      </div>
    );

  return (
    <Swiper
      className={`common-slider common-slider--${variant}`}
      slidesPerView={1}
      loop={interactive}
      pagination={interactive ? { clickable: true } : false}
      navigation={interactive}
      modules={[Pagination, Navigation, A11y]}
      a11y={{
        containerRoleDescriptionMessage: "carousel",
        itemRoleDescriptionMessage: "slide",
      }}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={slide.label}>
          <SlideContent slide={slide} main={main} eager={index === 0} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

function SlideContent({
  slide,
  main,
  eager,
}: {
  slide: Slide;
  main: boolean;
  eager: boolean;
}) {
  return (
    <div className={`relative isolate w-full ${main ? "h-100" : "h-96"}`}>
      <Image
        src={slide.src}
        alt={main && slide.title ? "" : slide.label}
        fill
        sizes="100vw"
        loading={main || eager ? "eager" : "lazy"}
        className="-z-10 object-cover"
      />
      {main && slide.title && (
        <div className="h-full bg-linear-to-r from-green-500/90 to-green-400/50 px-8 text-white sm:px-12">
          <div className="container mx-auto flex h-full flex-col justify-center px-4 pb-12 pt-10">
            <h2 className="slider-title mb-4 max-w-96 text-3xl font-bold leading-tight">
              {slide.title}
            </h2>
            {slide.description && (
              <p className="slider-description">{slide.description}</p>
            )}
            {slide.actions?.length ? (
              <div className="slider-actions mt-4 flex flex-wrap gap-2">
                {slide.actions.map((action) => (
                  <Link
                    key={action.label}
                    href={action.href}
                    className={`inline-flex items-center justify-center rounded-lg border-2 border-white/50 px-6 py-2 font-semibold transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white motion-reduce:transform-none ${action.secondary ? "bg-transparent text-white hover:bg-white/10" : `bg-white ${accents[slide.accent ?? "green"]}`}`}
                  >
                    {action.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
