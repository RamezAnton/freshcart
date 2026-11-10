import slide from "@/assets/images/home-slider.webp";
import CommonSlider, { type Slide } from "@/components/shared/CommonSlider/CommonSlider";

const slides: Slide[] = [
  {
    src: slide.src,
    label: "Fresh products",
    title: "Fresh Products Delivered to your Door",
    description: "Get 20% off your first order",
    actions: [
      { label: "Shop Now", href: "/products" },
      { label: "View Deals", href: "/deals", secondary: true },
    ],
  },
  {
    src: slide.src,
    label: "Premium quality",
    title: "Premium Quality Guaranteed",
    description: "Fresh from farm to your table",
    accent: "blue",
    actions: [
      { label: "Shop Now", href: "/products" },
      { label: "Learn More", href: "/about", secondary: true },
    ],
  },
  {
    src: slide.src,
    label: "Fast delivery",
    title: "Fast & Free Delivery",
    description: "Same day delivery available",
    accent: "purple",
    actions: [
      { label: "Order Now", href: "/products" },
      { label: "Delivery Info", href: "/delivery", secondary: true },
    ],
  },
];

export default function MainSlider() {
  return (
    <section aria-label="FreshCart offers" className="w-full min-w-0">
      <CommonSlider slides={slides} variant="main" />
    </section>
  );
}
