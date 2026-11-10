import { Brand } from "@/interfaces/brand.interface";
import { Category } from "@/interfaces/category.interface";
import { Product } from "@/interfaces/product.interface";
import { Subcategory } from "@/interfaces/subcategory.interface";
import { getCategories } from "./categories.service";

interface CatalogResponse<T> {
  results: number;
  metadata: { currentPage: number; numberOfPages: number; limit: number };
  data: T[];
}

async function getCatalogPage<T>(path: string): Promise<CatalogResponse<T>> {
  "use cache";

  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/${path}`,
  );
  if (!response.ok) {
    throw new Error(`Unable to load catalog (${response.status}).`);
  }
  return response.json();
}

async function getAllCatalogItems<T>(path: string): Promise<T[]> {
  "use cache";

  const separator = path.includes("?") ? "&" : "?";
  const firstPage = await getCatalogPage<T>(`${path}${separator}limit=50`);
  const remainingPages = await Promise.all(
    Array.from(
      { length: Math.max(0, firstPage.metadata.numberOfPages - 1) },
      (_, index) =>
        getCatalogPage<T>(`${path}${separator}limit=50&page=${index + 2}`),
    ),
  );
  return [...firstPage.data, ...remainingPages.flatMap((page) => page.data)];
}

export async function getCategory(
  categoryId: string,
): Promise<Category | undefined> {
  const categories = await getCategories();
  return categories.data.find(
    (category: Category) => category._id === categoryId,
  );
}

export async function getSubcategories(categoryId: string) {
  return getAllCatalogItems<Subcategory>(
    `categories/${encodeURIComponent(categoryId)}/subcategories`,
  );
}

export async function getBrands() {
  return getAllCatalogItems<Brand>("brands");
}

export async function getBrand(brandId: string) {
  const brands = await getBrands();
  return brands.find((brand) => brand._id === brandId);
}

export async function getCollectionProducts(filters: {
  category?: string;
  brand?: string;
  subcategory?: string;
  page?: number;
}) {
  const query = new URLSearchParams({
    limit: "12",
    page: String(filters.page ?? 1),
  });
  if (filters.category) query.set("category", filters.category);
  if (filters.brand) query.set("brand", filters.brand);
  if (filters.subcategory) query.set("subcategory", filters.subcategory);
  return getCatalogPage<Product>(`products?${query}`);
}

export async function getBrowseProducts(filters: {
  category?: string;
  brand?: string;
  subcategory?: string;
}) {
  const query = new URLSearchParams();
  if (filters.category) query.set("category", filters.category);
  if (filters.brand) query.set("brand", filters.brand);
  if (filters.subcategory) query.set("subcategory", filters.subcategory);
  return getAllCatalogItems<Product>(
    `products${query.size ? `?${query}` : ""}`,
  );
}
