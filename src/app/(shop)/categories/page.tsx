import type { Metadata } from "next";
import { Layers } from "lucide-react";
import CollectionCard from "@/components/shared/CollectionCard/CollectionCard";
import PageHeader from "@/components/shared/PageHeader/PageHeader";
import { getCategories } from "@/services/categories.service";
import { CategoryResponse } from "@/types/response.type";

export const metadata: Metadata = { title: "All Categories | FreshCart" };

export default async function CategoryPage() {
  const categories: CategoryResponse = await getCategories();

  return (
    <main className="flex-1 bg-gray-50/50">
      <PageHeader title="All Categories" description="Browse our wide range of product categories" breadcrumbs={[{ label: "Categories" }]} icon={<Layers aria-hidden="true" />} />
      <section aria-label="Product categories" className="container mx-auto min-h-[60vh] px-4 pt-10 pb-20 lg:pb-40">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 md:grid-cols-4 lg:grid-cols-5">
          {categories.data.map((category) => <CollectionCard key={category._id} name={category.name} image={category.image} href={`/categories/${category._id}`} />)}
        </div>
        {categories.data.length === 0 && <p className="py-16 text-center text-gray-500">No categories are available yet. Check back soon.</p>}
      </section>
    </main>
  );
}
