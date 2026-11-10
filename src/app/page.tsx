import CategoriesSlider from "@/components/home/CategoriesSlider/CategoriesSlider";
import MainSlider from "@/components/home/MainSlider/MainSlider";
import Products from "@/components/home/Products/Products";
import ShoppingBenefits from "@/components/home/ShoppingBenefits";
import PromotionalOffers from "@/components/home/PromotionalOffers";
import Newsletter from "@/components/home/Newsletter";

export default function Home() {
  return (
    <>
      {/* { Slider } */}
      <MainSlider />
      <ShoppingBenefits />
      {/* { Category } */}
      <CategoriesSlider />
      <PromotionalOffers />
      {/* { Featured Product } */}
      <Products />
      <Newsletter />
    </>
  );
}
