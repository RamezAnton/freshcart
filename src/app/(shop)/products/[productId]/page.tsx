import { Suspense } from "react";
import Link from "next/link";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import ProductDetails from "@/components/home/Products/ProductDetails";
import ProductImageGallery from "@/components/home/Products/ProductImageGallery";
import { Product } from "@/interfaces/product.interface";
import { getSingleProduct } from "@/services/products.service";
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: Promise<{ productId: string }>;
}

async function ProductContent({
  params,
}: ProductPageProps) {
  const { productId } = await params;

  const response: { data: Product } = await getSingleProduct(productId);
  const product = response.data;

  if (!product) {
    notFound();
  }

  const images =
    product.images?.length > 0
      ? product.images
      : [product.imageCover];

  return (
    <section id="product-detail" className="py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-8 lg:flex-row">
          <div
            id="product-images"
            className="w-full lg:w-1/4"
          >
            <ProductImageGallery
              images={images}
              title={product.title}
            />
          </div>

          <div
            id="product-info"
            className="w-full lg:w-3/4"
          >
            <ProductDetails product={product} />
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductSkeleton() {
  return <div role="status" className="container mx-auto px-4 py-6"><div aria-hidden="true" className="flex flex-col gap-8 lg:flex-row"><div className="h-96 animate-pulse rounded-xl bg-gray-100 lg:w-1/4" /><div className="space-y-6 rounded-xl border border-gray-100 p-6 lg:w-3/4"><div className="h-10 w-2/3 animate-pulse rounded-lg bg-gray-100" /><div className="h-6 w-32 animate-pulse rounded-lg bg-gray-100" /><div className="h-24 animate-pulse rounded-lg bg-gray-100" /><div className="h-14 animate-pulse rounded-lg bg-gray-100" /></div></div><span className="sr-only">Loading product details…</span></div>;
}

export default function ProductPage({ params }: ProductPageProps) {
  return <main className="flex-1"><div className="container mx-auto px-4 pt-6"><Breadcrumb><BreadcrumbList><BreadcrumbItem><BreadcrumbLink render={<Link href="/" />}>Home</BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator>/</BreadcrumbSeparator><BreadcrumbItem><BreadcrumbLink render={<Link href="/products" />}>Products</BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator>/</BreadcrumbSeparator><BreadcrumbItem><BreadcrumbPage>Product Details</BreadcrumbPage></BreadcrumbItem></BreadcrumbList></Breadcrumb></div><Suspense fallback={<ProductSkeleton />}><ProductContent params={params} /></Suspense></main>;
}
