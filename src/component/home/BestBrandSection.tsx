"use client";
import { useGetBrands } from "@/hook/useBrands";
import { useGetProducts } from "@/hook/useProducts";
import { toPersianNumbers } from "@/utils/toPersianNumbers";
import Link from "next/link";
import { RiMenu5Fill } from "react-icons/ri";
import ScrollBlur from "../animate/ScrollBlur";
import BestBrandSectionSkeleton from "../skeleton/BrandSkeleton";
import BrandSlider from "../BrandSlider";
import { appRoutes } from "@/constant/routes";

function BestBrandSection() {
  const { data, isLoading } = useGetBrands();
  const { brands } = data || {};
  const { data: productsData, isLoading: productsIsloading } =
    useGetProducts("page=all");
  const { products: productsInfo } = productsData || {};
  const { docs: products } = productsInfo || {};

  if (brands && products) {
    for (const brand of brands!) {
      let i = 0;
      for (const product of products!) {
        if (product.brand._id === brand._id) {
          i++;
        }
      }
      brand.productsCount = i;
    }
  }
  const sortedBrandsByCounts = brands!?.sort(
    (a, b) => b.productsCount - a.productsCount,
  );
  const bestBrands = sortedBrandsByCounts?.slice(0, 10);
  if (isLoading && productsIsloading) return <BestBrandSectionSkeleton />;
  return (
    <div id="bestBrands-wrapper" className="flex flex-col gap-1 px-4 py-12">
      <h1 className="text-center text-title font-semibold text-dark-500">
        برندهای برتر
      </h1>
      <div
        id="brands-wrapper"
        className="hidden w-full grid-cols-2 gap-10 rounded-md px-8 py-8 sm:grid-cols-6 md:gap-7 md:px-6 lg:grid lg:grid-cols-12 xl:grid-cols-10"
      >
        {bestBrands?.map((brand) => (
          <ScrollBlur
            htmlTag="div"
            key={brand._id}
            id="brand-card"
            className="col-span-2 grid w-full place-items-center justify-items-center gap-y-2 rounded-md bg-light-100 p-4 sm:col-span-3 md:col-span-2 lg:col-span-3 xl:col-span-2"
          >
            <Link href={`${appRoutes.products.link}?brand=${brand.title}`}>
              <div
                id="image-wrapper"
                className="transition-smooth flex-center h-[117px] w-[117px] rounded-full bg-light-100 p-2 shadow-container hover:scale-105"
              >
                <img
                  alt={brand.title}
                  src={brand.logo}
                  className="rounded-full border-2 border-primary-500 p-1 shadow-container"
                />
              </div>
            </Link>
            <Link href={`${appRoutes.products.link}?brand=${brand.title}`}>
              <div
                id="title-wrapper"
                className="text-[15px] font-semibold text-dark-500"
              >
                {brand.persianTitle}{" "}
                <span className="text-[.75rem] text-primary-500">
                  ({toPersianNumbers(brand.productsCount)} محصول)
                </span>
              </div>
            </Link>
          </ScrollBlur>
        ))}
      </div>
      <div
        id="brands-wrapper"
        className="w-full gap-10 rounded-md px-8 py-8 md:gap-7 md:px-6"
      >
        <BrandSlider BrandsToShow={bestBrands} />
      </div>
      <div id="more-brands-wrapper" className="flex-center w-full">
        <Link href={appRoutes.brands.link}>
          <div className="duration-300s flex items-center gap-[6px] rounded-sm border border-primary-500 px-3 py-2 text-[.9rem] font-medium text-primary-500 transition-all ease-in hover:bg-primary-500 hover:text-light-100">
            <RiMenu5Fill className="text-[20px]" />
            <span>مشاهده همه برندها</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default BestBrandSection;
