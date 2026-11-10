import { Suspense } from "react";
import { Tags } from "lucide-react";
import { notFound } from "next/navigation";
import PageHeader from "@/components/shared/PageHeader/PageHeader";
import CollectionProducts, { CollectionProductsSkeleton } from "@/components/shared/CollectionProducts/CollectionProducts";
import { getBrand, getBrands } from "@/services/catalog.service";

type BrandPageProps = {
  params: Promise<{ brandId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateStaticParams() {
  const brands = await getBrands();
  return brands.map((brand) => ({ brandId: brand._id }));
}

export async function generateMetadata({ params }: Pick<BrandPageProps, "params">) {
  const { brandId } = await params;
  const brand = await getBrand(brandId);
  return { title: `${brand?.name ?? "Brand not found"} | FreshCart` };
}

export default function BrandDetails(props: BrandPageProps) {
  return (
    <main className="flex-1 bg-gray-50/50">
      <Suspense fallback={<PageHeader title="Shop by Brand" description="Shop from your favorite brands" breadcrumbs={[{ label: "Brands", href: "/brands" }, { label: "Brand" }]} icon={<Tags aria-hidden="true" />} variant="purple" />}>
        <BrandHeader params={props.params} />
      </Suspense>
      <Suspense fallback={<CollectionProductsSkeleton />}>
        <BrandContent {...props} />
      </Suspense>
    </main>
  );
}

async function BrandHeader({ params }: Pick<BrandPageProps, "params">) {
  const { brandId } = await params;
  const brand = await getBrand(brandId);
  if (!brand) notFound();

  return <PageHeader title={brand.name} description={`Shop the latest products from ${brand.name}`} breadcrumbs={[{ label: "Brands", href: "/brands" }, { label: brand.name }]} image={{ src: brand.image, alt: brand.name }} variant="purple" />;
}

async function BrandContent({ params, searchParams }: BrandPageProps) {
  const { brandId } = await params;
  const brand = await getBrand(brandId);
  if (!brand) notFound();

  return <CollectionProducts brandId={brandId} name={brand.name} basePath={`/brands/${brandId}`} searchParams={searchParams} />;
}
