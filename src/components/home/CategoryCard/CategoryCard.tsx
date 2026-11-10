import Image from "next/image";

interface CategoryCardProps {
  image: string;
  name: string;
}

export default function CategoryCard({ image, name }: CategoryCardProps) {
  return (
    <div className="group flex h-36 w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <div className="relative size-20 shrink-0 overflow-hidden rounded-full bg-gray-100">
        <Image
          src={image}
          alt={name}
          fill
          sizes="80px"
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      <h3 className="text-center text-sm font-medium text-slate-900 sm:text-base">
        {name}
      </h3>
    </div>
  );
}
