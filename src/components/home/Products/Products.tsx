import { getProducts } from "@/services/products.service";
import { ProductsResponse } from "@/types/response.type";
import ProductCard from "./ProductCard";
import SectionTitle from "@/components/shared/SectionTitle/SectionTitle";

export default async function Products() {
  const products: ProductsResponse = await getProducts();
  const popular = products.data.filter((product) => product.sold >= 1000);

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <SectionTitle title="Featured" subtitle="Products" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {products.data.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
