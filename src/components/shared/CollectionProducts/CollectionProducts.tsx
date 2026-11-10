import Link from "next/link";
import { ArrowLeft, ArrowRight, Layers, Tags } from "lucide-react";
import ProductCard from "@/components/home/Products/ProductCard";
import { Subcategory } from "@/interfaces/subcategory.interface";
import { getCollectionProducts } from "@/services/catalog.service";
import { cn } from "@/lib/utils";
import ActiveFilters from "@/components/shared/ActiveFilters/ActiveFilters";
import NoProducts from "@/components/shared/NoProducts/NoProducts";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

interface CollectionProductsProps {
  categoryId?: string;
  brandId?: string;
  name: string;
  basePath: string;
  subcategories?: Subcategory[];
  searchParams: SearchParams;
}

export function CollectionProductsSkeleton() {
  return (
    <section
      aria-label="Loading products"
      aria-busy="true"
      className="container mx-auto px-4 py-10"
    >
      <p className="mb-6 text-sm text-gray-500" role="status">
        Loading products…
      </p>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <div
            key={index}
            className="h-80 rounded-xl bg-gray-100 motion-safe:animate-pulse"
          />
        ))}
      </div>
    </section>
  );
}

export default async function CollectionProducts({
  categoryId,
  brandId,
  name,
  basePath,
  subcategories = [],
  searchParams,
}: CollectionProductsProps) {
  const params = await searchParams;
  const requestedPage =
    typeof params.page === "string" ? Number(params.page) : 1;
  const page =
    Number.isSafeInteger(requestedPage) && requestedPage > 0
      ? requestedPage
      : 1;
  const selectedSubcategory = subcategories.find(
    (subcategory) => subcategory._id === params.subcategory,
  );
  const products = await getCollectionProducts({
    category: categoryId,
    brand: brandId,
    subcategory: selectedSubcategory?._id,
    page,
  });

  function pageHref(nextPage: number) {
    const query = new URLSearchParams({ page: String(nextPage) });
    if (selectedSubcategory) query.set("subcategory", selectedSubcategory._id);
    return `${basePath}?${query}`;
  }

  return (
    <div className="container mx-auto px-4 py-10">
      {subcategories.length > 0 && (
        <section aria-labelledby="subcategories-title" className="mb-10">
          <h2
            id="subcategories-title"
            className="mb-5 text-xl font-bold text-gray-900"
          >
            Shop by subcategory
          </h2>
          <nav
            aria-label="Filter by subcategory"
            className="flex flex-wrap gap-2.5"
          >
            <Link
              href={basePath}
              aria-current={!selectedSubcategory ? "page" : undefined}
              className={cn(
                "rounded-full border px-4 py-2 text-sm transition-colors",
                !selectedSubcategory
                  ? "border-primary-600 bg-primary-600 font-semibold text-white"
                  : "border-gray-200 bg-white text-gray-600 hover:border-primary-500 hover:text-primary-600",
              )}
            >
              All {name}
            </Link>
            {subcategories.map((subcategory) => (
              <Link
                key={subcategory._id}
                href={`${basePath}?subcategory=${subcategory._id}`}
                aria-current={
                  selectedSubcategory?._id === subcategory._id
                    ? "page"
                    : undefined
                }
                className={cn(
                  "rounded-full border px-4 py-2 text-sm transition-colors",
                  selectedSubcategory?._id === subcategory._id
                    ? "border-primary-600 bg-primary-600 font-semibold text-white"
                    : "border-gray-200 bg-white text-gray-600 hover:border-primary-500 hover:text-primary-600",
                )}
              >
                {subcategory.name}
              </Link>
            ))}
          </nav>
        </section>
      )}
      <ActiveFilters
        filters={[
          {
            label: name,
            icon: brandId ? (
              <Tags size={13} aria-hidden="true" />
            ) : (
              <Layers size={13} aria-hidden="true" />
            ),
          },
          ...(selectedSubcategory
            ? [
                {
                  label: selectedSubcategory.name,
                  icon: <Layers size={13} aria-hidden="true" />,
                },
              ]
            : []),
        ]}
      />
      <section aria-labelledby="collection-products-title">
        <h2 id="collection-products-title" className="sr-only">
          {selectedSubcategory?.name ?? name} Products
        </h2>
        <p className="mb-6 text-sm text-gray-500">
          Showing {products.data.length}{" "}
          {products.metadata.numberOfPages > 1 ? `of ${products.results} ` : ""}
          {products.results === 1 ? "product" : "products"}
        </p>
        {products.data.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.data.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <NoProducts />
        )}
        {products.metadata.numberOfPages > 1 && (
          <nav
            aria-label="Product pagination"
            className="mt-10 flex items-center justify-center gap-5 text-sm"
          >
            {page > 1 && (
              <Link
                href={pageHref(page - 1)}
                className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 hover:border-primary-500 hover:text-primary-600"
              >
                <ArrowLeft size={15} aria-hidden="true" />
                Previous
              </Link>
            )}
            <span className="text-gray-500">
              Page {page} of {products.metadata.numberOfPages}
            </span>
            {page < products.metadata.numberOfPages && (
              <Link
                href={pageHref(page + 1)}
                className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 hover:border-primary-500 hover:text-primary-600"
              >
                Next
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            )}
          </nav>
        )}
      </section>
    </div>
  );
}
