import type { Metadata } from "next";
import { Tags } from "lucide-react";
import CollectionCard from "@/components/shared/CollectionCard/CollectionCard";
import PageHeader from "@/components/shared/PageHeader/PageHeader";
import { getBrands } from "@/services/catalog.service";

export const metadata: Metadata = { title: "Top Brands | FreshCart" };

export default async function BrandsPage() {
  const brands = await getBrands();

  return (
    <main className="flex-1 bg-gray-50/50">
      <PageHeader title="Top Brands" description="Shop from your favorite brands" breadcrumbs={[{ label: "Brands" }]} icon={<Tags aria-hidden="true" />} variant="purple" />
      <section aria-label="Shop by brand" className="container mx-auto min-h-[60vh] px-4 py-10">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 md:grid-cols-4 lg:grid-cols-6">
          {brands.map((brand) => <CollectionCard key={brand._id} name={brand.name} image={brand.image} href={`/brands/${brand._id}`} variant="brand" />)}
        </div>
        {brands.length === 0 && <p className="py-16 text-center text-gray-500">No brands are available yet. Check back soon.</p>}
      </section>
    </main>
  );
}
