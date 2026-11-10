import type { Metadata } from "next";
import { Suspense } from "react";
import { Layers, PackageOpen, Search, Tags } from "lucide-react";
import ProductCard from "@/components/home/Products/ProductCard";
import PageHeader from "@/components/shared/PageHeader/PageHeader";
import ActiveFilters from "@/components/shared/ActiveFilters/ActiveFilters";
import NoProducts from "@/components/shared/NoProducts/NoProducts";
import { CollectionProductsSkeleton } from "@/components/shared/CollectionProducts/CollectionProducts";
import { getBrand, getBrowseProducts, getCategory, getSubcategories } from "@/services/catalog.service";

export const metadata: Metadata = { title: "Shop Products | FreshCart" };

type ProductsPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

async function resolveFilters(searchParams: ProductsPageProps["searchParams"]) {
  const params = await searchParams;
  const value = (key: string) => typeof params[key] === "string" ? params[key].trim() : "";
  const categoryId = value("category");
  const brandId = value("brand");
  const subcategoryId = value("subcategory");
  const [category, brand] = await Promise.all([
    categoryId ? getCategory(categoryId) : undefined,
    brandId ? getBrand(brandId) : undefined,
  ]);
  const subcategories = category && subcategoryId ? await getSubcategories(categoryId) : [];
  const subcategory = subcategories.find((item) => item._id === subcategoryId);

  return {
    categoryId, brandId, subcategoryId, category, brand, subcategory,
    search: value("search"),
    discount: value("discount") === "true",
    newest: value("sort") === "newest",
  };
}

function AllProductsHeader() {
  return <PageHeader title="All Products" description="Explore our complete product collection" breadcrumbs={[{ label: "All Products" }]} icon={<PackageOpen aria-hidden="true" />} />;
}

export default function ProductsPage({ searchParams }: ProductsPageProps) {
  return (
    <main className="flex-1 bg-[#fafbfc]">
      <Suspense fallback={<AllProductsHeader />}>
        <ProductsHeader searchParams={searchParams} />
      </Suspense>
      <Suspense fallback={<CollectionProductsSkeleton />}>
        <ProductResults searchParams={searchParams} />
      </Suspense>
    </main>
  );
}

async function ProductsHeader({ searchParams }: ProductsPageProps) {
  const { category, brand } = await resolveFilters(searchParams);
  if (category) {
    return (
      <PageHeader
        title={category.name}
        description={`Browse products in ${category.name}`}
        breadcrumbs={[{ label: "Categories", href: "/categories" }, { label: category.name }]}
        image={{ src: category.image, alt: category.name }}
      />
    );
  }
  if (brand) {
    return <PageHeader title={brand.name} description={`Shop the latest products from ${brand.name}`} breadcrumbs={[{ label: "Brands", href: "/brands" }, { label: brand.name }]} image={{ src: brand.image, alt: brand.name }} variant="purple" />;
  }
  return <AllProductsHeader />;
}

async function ProductResults({ searchParams }: ProductsPageProps) {
  const { categoryId, brandId, subcategoryId, category, brand, subcategory, search, discount, newest } = await resolveFilters(searchParams);
  const invalidFilter = (categoryId && !category) || (brandId && !brand) || (subcategoryId && !subcategory);
  const products = invalidFilter ? [] : await getBrowseProducts({ category: categoryId, brand: brandId, subcategory: subcategoryId });
  const matchingProducts = products.filter((product) => {
    const searchable = `${product.title} ${product.brand?.name ?? ""} ${product.category?.name ?? ""}`.toLowerCase();
    const isDiscounted = typeof product.priceAfterDiscount === "number" && product.priceAfterDiscount < product.price;
    return (!search || searchable.includes(search.toLowerCase())) && (!discount || isDiscounted);
  });
  if (newest) matchingProducts.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
  const activeFilters = [
    ...(categoryId ? [{ label: category?.name ?? "Unknown category", icon: <Layers size={13} aria-hidden="true" /> }] : []),
    ...(brandId ? [{ label: brand?.name ?? "Unknown brand", icon: <Tags size={13} aria-hidden="true" /> }] : []),
    ...(subcategoryId ? [{ label: subcategory?.name ?? "Unknown subcategory", icon: <Layers size={13} aria-hidden="true" /> }] : []),
    ...(search ? [{ label: search, icon: <Search size={13} aria-hidden="true" /> }] : []),
    ...(discount ? [{ label: "On Sale", icon: <Tags size={13} aria-hidden="true" /> }] : []),
  ];

  return (
    <section aria-label="Products" className="container mx-auto min-h-[75vh] px-4 py-8">
      <ActiveFilters filters={activeFilters} />
      <p className="mb-6 text-sm text-gray-500">Showing {matchingProducts.length} {matchingProducts.length === 1 ? "product" : "products"}</p>
      {matchingProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {matchingProducts.map((product) => <ProductCard key={product._id} product={product} />)}
        </div>
      ) : <NoProducts />}
    </section>
  );
}
