import { routes } from "@/constant/routes";
import { IBrandsGet } from "@/interface/brands";
import Link from "next/link";

function BrandCard({ brand }: { brand: IBrandsGet }) {
  return (
    <div
      key={brand._id}
      id="brand-card"
      className="col-span-2 grid w-full place-items-center justify-items-center gap-y-2 rounded-md bg-light-300 p-4 sm:col-span-3 md:col-span-2 lg:col-span-3 xl:col-span-2"
    >
      <Link href={`${routes.products}?brand=${brand.title}`}>
        <div
          id="image-wrapper"
          className="transition-smooth flex-center h-[85px] w-[85px] rounded-full bg-light-100 p-2 shadow-md hover:scale-105"
        >
          <img
            alt={brand.title}
            src={brand.logo}
            className="rounded-full border-2 border-primary-500 p-1"
          />
        </div>
      </Link>
      <Link href={`${routes.products}?brand=${brand.title}`}>
        <div
          id="title-wrapper"
          className="text-listItem font-semibold text-dark-500"
        >
          {brand.persianTitle}
        </div>
      </Link>
      <div id="usecase-wrapper flex">
        <span className="text-[11.5px]"> {brand.usecase.join(" ، ")}</span>
      </div>
    </div>
  );
}

export default BrandCard;
