"use client";
import { routes } from "@/constant/routes";
import { useGetProducts } from "@/hook/useProducts";
import { IProductsGet } from "@/interface/products";
import Link from "next/link";
import { IoMdArrowBack } from "react-icons/io";
import ProductsSlider from "../ProductsSlider";
import BestDiscountOrBestSellingSkeleton from "../skeleton/BestDiscountOrBestSellingSkeleton";

function BestSellingProducts() {
  const { data: productsData, isLoading: productsIsloading } =
    useGetProducts("page=all");
  const { products: productsInfo } = productsData || {};
  const { docs: products } = productsInfo || {};
  let productsToShow: IProductsGet[] = [];
  if (products) {
    productsToShow = products.sort((a, b) => a.count - b.count).slice(0, 5);
  }

  const ComponentStructure = ({ children }) => {
    return (
      <div
        id="best-discount-section"
        className="flex min-h-96 w-full flex-col gap-12 py-14 text-right md:px-10"
        style={{
          background:
            "radial-gradient(circle at 10% 20%, rgb(0, 142, 161) 0%, rgb(0, 60, 88) 90.1%)",
        }}
      >
        <div className="flex flex-col gap-3 md:flex-row">
          <h2 className="w-full text-center text-title font-semibold text-light-100 md:w-[70%] md:text-start">
            محصولات پرفروش
          </h2>
        </div>
        <div id="product-card-wrapper" className="flex-center w-full">
          {children}
        </div>
        <div id="more-products-wrapper" className="flex-center">
          <Link href={`${routes.products}?sort=bestseling`}>
            <div className="transition-smooth flex items-center gap-3 hover:scale-[1.05]">
              <span className="text-center italic text-light-100">
                محصولات بیشتر ...
              </span>
              <IoMdArrowBack className="text-[22px] text-light-100" />
            </div>
          </Link>
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

export default BestSellingProducts;
