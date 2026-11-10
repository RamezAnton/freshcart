// import CommonSlider from "@/components/shared/CommonSlider/CommonSlider";
import { getCategories } from "@/services/categories.service";
import { CategoryResponse } from "@/types/response.type";
import CategoryCard from "../CategoryCard/CategoryCard";
import SectionTitle from "@/components/shared/SectionTitle/SectionTitle";
import Link from "next/link";
// import CategoriesSwiper from "./CategoriesSwiper";

export default async function CategoriesSlider() {
  const categories: CategoryResponse = await getCategories();

  return (
    <section className="container mx-auto px-4 py-12">
      <SectionTitle title="Shop By" subtitle="Category" action={{ label: "View All Categories", href: "/categories" }} />
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {categories.data.map((category) => (
          <Link key={category._id} href={`/categories/${category._id}`}>
            <CategoryCard image={category.image} name={category.name} />
          </Link>
        ))}
      </div>
    </section>
  );
}
