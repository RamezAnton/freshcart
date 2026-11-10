import { Suspense } from "react";
import { Layers } from "lucide-react";
import { notFound } from "next/navigation";
import PageHeader from "@/components/shared/PageHeader/PageHeader";
import CollectionProducts, { CollectionProductsSkeleton } from "@/components/shared/CollectionProducts/CollectionProducts";
import { getCategory, getSubcategories } from "@/services/catalog.service";
import { getCategories } from "@/services/categories.service";
import { CategoryResponse } from "@/types/response.type";

type CategoryPageProps = {
  params: Promise<{ categoryId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateStaticParams() {
  const categories: CategoryResponse = await getCategories();
  return categories.data.map((category) => ({ categoryId: category._id }));
}

export async function generateMetadata({ params }: Pick<CategoryPageProps, "params">) {
  const { categoryId } = await params;
  const category = await getCategory(categoryId);
  return { title: `${category?.name ?? "Category not found"} | FreshCart` };
}

export default function CategoryDetails(props: CategoryPageProps) {
  return (
    <main className="flex-1 bg-gray-50/50">
      <Suspense fallback={<PageHeader title="Shop by Category" description="Explore our product categories" breadcrumbs={[{ label: "Categories", href: "/categories" }, { label: "Category" }]} icon={<Layers aria-hidden="true" />} />}>
        <CategoryHeader params={props.params} />
      </Suspense>
      <Suspense fallback={<CollectionProductsSkeleton />}>
        <CategoryContent {...props} />
      </Suspense>
    </main>
  );
}

async function CategoryHeader({ params }: Pick<CategoryPageProps, "params">) {
  const { categoryId } = await params;
  const category = await getCategory(categoryId);
  if (!category) notFound();

  return <PageHeader title={category.name} description={`Browse products in ${category.name}`} breadcrumbs={[{ label: "Categories", href: "/categories" }, { label: category.name }]} image={{ src: category.image, alt: category.name }} />;
}

async function CategoryContent({ params, searchParams }: CategoryPageProps) {
  const { categoryId } = await params;
  const category = await getCategory(categoryId);
  if (!category) notFound();
  const subcategories = await getSubcategories(categoryId);

  return <CollectionProducts categoryId={categoryId} name={category.name} basePath={`/categories/${categoryId}`} subcategories={subcategories} searchParams={searchParams} />;
}
