"use client";
import { routes } from "@/constant/routes";
import { useGetProducts } from "@/hook/useProducts";
import { IProductsGet } from "@/interface/products";
import Link from "next/link";
import { FaList } from "react-icons/fa6";
import BestDiscountOrBestSellingSkeleton from "../skeleton/BestDiscountOrBestSellingSkeleton";
import ProductsSlider from "../ProductsSlider";

function BestDiscountSection() {
  const { data: productsData, isLoading: productsIsloading } =
    useGetProducts("page=all");
  const { products: productsInfo } = productsData || {};
  const { docs: products } = productsInfo || {};
  let productsToShow: IProductsGet[] = [];
  if (products) {
    productsToShow = products
      .filter((product) => product.discount > 0)
      .sort((a, b) => b.discount - a.discount)
      .slice(0, 5);
  }

  const ComponentStructure = ({ children }) => {
    return (
      <div
        id="best-discount-section"
        className="flex min-h-96 w-full flex-col gap-12 py-14 md:px-10"
        style={{
          background:
            "radial-gradient(circle at 50.4% 50.5%, rgb(211, 62, 86) 0%, rgb(135, 2, 35) 90%)",
        }}
      >
        <div className="flex flex-col gap-3 md:flex-row">
          <h2 className="w-full text-center text-title font-semibold text-light-100 md:w-[70%] md:text-start">
            تخفیف های روز
          </h2>
          <div className="flex w-full justify-center md:w-[30%] md:justify-end">
            <Link href={`${routes.products}?discount=true`}>
              <div className="transition-smooth flex-center gap-2 rounded-md border border-light-100 px-3 py-3 text-light-100 hover:opacity-75">
                <FaList className="-scale-x-100 text-[16px] md:text-[20px]" />
                <span className="text-[12px] md:text-[13.2px]">
                  همه تخفیف ها
                </span>
              </div>
            </Link>
          </div>
        </div>
        <div id="product-card-wrapper" className="flex">
          {children}
        </div>
      </div>
    );
  };

  if (productsIsloading)
    return (
      <ComponentStructure>
        <BestDiscountOrBestSellingSkeleton />
      </ComponentStructure>
    );
  return (
    <ComponentStructure>
      <ProductsSlider productsToShow={productsToShow} />
    </ComponentStructure>
  );
}

export default BestDiscountSection;
