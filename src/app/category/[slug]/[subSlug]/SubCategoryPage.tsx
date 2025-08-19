"use client";
import AppBreadCrumb from "@/component/AppBreadCrumb";
import FilterSection from "@/component/FilterSection";
import ProductsSkeletonSection from "@/component/skeleton/ProductsSkeleton";
import { sortValues } from "@/constant/sortValues";
import productService from "@/service/productService";
import { toPersianNumbers } from "@/utils/toPersianNumbers";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { GrSort } from "react-icons/gr";
import { IoFilter } from "react-icons/io5";
import FilterSectionMobile from "../FilterSectionMobile";
import NoProductsToShow from "../NoProductsToShow";
import ProductList from "../ProductList";
import SortSection from "../SortSection";
import SortSectionMobile from "../SortSectionMobile";
import { appRoutes } from "@/constant/routes";

export default function SubCategoryPage({
  slug,
  subSlug,
  initialProducts,
  initialSubCategories,
}: {
  slug: string;
  subSlug: string;
  initialProducts: any;
  initialSubCategories: any;
}) {
  const [sortStatus, setSortStatus] = useState(false);
  const [filterStatus, setFilterStatus] = useState(false);
  const searchParams = useSearchParams();
  // const query = searchParams.toString();
  const queryString = useMemo(() => {
    return new URLSearchParams([...searchParams.entries()].sort()).toString();
  }, [searchParams]);

  // پیدا کردن ساب‌کتگوری جاری
  const theSubCategory = initialSubCategories?.find(
    (item: any) => item.slug === decodeURI(slug),
  );

  // React Query برای محصولات
  const { data: productsData, isFetching } = useQuery({
    queryKey: ["products", slug, queryString],
    queryFn: () => productService.getProductsBySlug(slug, queryString),
    refetchOnWindowFocus: false,
    initialData: initialProducts, // داده اولیه از SSG
    placeholderData: (prev) => prev,
    // staleTime: 1000 * 60 * 5,
  });
  const products = productsData?.docs ?? [];

  // شمارش فیلترها
  const excludedKeys = ["sort", "page"];
  const filterCount = Array.from(searchParams.entries()).filter(
    ([key]) => !excludedKeys.includes(key),
  ).length;

  // عنوان سورت فعلی
  const currentSortPersianTitle = searchParams.has("sort")
    ? sortValues.find((item) => item.title === searchParams.get("sort"))
        ?.persianTitle
    : "جدیدترین";

  // قفل کردن اسکرول هنگام باز بودن فیلتر یا سورت
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow =
      sortStatus || filterStatus ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [sortStatus, filterStatus]);

  return (
    <div className="flex-center w-full">
      {/* Overlay */}
      <div
        onClick={() => {
          setSortStatus(false);
          setFilterStatus(false);
        }}
        role="button"
        aria-hidden={!sortStatus && !filterStatus}
        className={`fixed right-0 top-0 z-[65341] h-[100vh] w-full ${sortStatus || filterStatus ? "opacity-40" : "pointer-events-none opacity-0"} bg-dark-500 transition-all duration-100`}
      ></div>

      {/* موبایل */}
      <SortSectionMobile
        setSortStatus={setSortStatus}
        sortStatus={sortStatus}
      />
      <FilterSectionMobile
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        filterValues={theSubCategory?.filterItems ?? []}
      />

      <div className="responsive__wrapper flex flex-col gap-1">
        <AppBreadCrumb
          destinations={[
            {
              title: decodeURI(subSlug).replaceAll("-", " "),
              link: `${appRoutes.category}/${subSlug}`,
            },
            { title: decodeURI(slug).replaceAll("-", " "), link: "" },
          ]}
        />

        <div
          id="category-wrapper"
          className="grid grid-cols-10 gap-2 pb-10 pt-6 lg:grid-cols-12 xl:grid-cols-10"
        >
          {/* فیلتر دسکتاپ */}
          <div className="hidden min-h-screen py-[1px] lg:col-span-3 lg:block xl:col-span-2">
            <FilterSection subCategory={theSubCategory ?? {}} />
          </div>

          {/* محصولات */}
          <div className="col-span-10 flex flex-col px-6 py-0 md:px-0 lg:col-span-9 xl:col-span-8">
            <SortSection />

            {/* دکمه‌های موبایل */}
            <div className="mb-2 flex gap-2 md:px-0 lg:hidden">
              <button
                onClick={() => setSortStatus(true)}
                className="flex-center gap-2 rounded-xl border border-light-350 bg-light-100 p-2 text-listItem text-dark-500"
              >
                <GrSort className="-scale-x-100 text-[14px]" />
                <span>{currentSortPersianTitle}</span>
              </button>

              <button
                onClick={() => setFilterStatus(true)}
                className={`flex-center relative gap-[5px] rounded-xl border border-light-350 bg-light-100 p-2 text-listItem text-dark-500 ${
                  filterCount > 0 ? "bg-red-100 text-warning-500" : ""
                }`}
              >
                {filterCount > 0 && (
                  <span className="absolute left-0 top-0 -mt-1 flex h-[14px] w-[14px] items-center justify-center rounded-badge bg-warning-500 p-[7px] text-center text-light-100">
                    {toPersianNumbers(filterCount)}
                  </span>
                )}
                <IoFilter className="text-[14px]" />
                <span>فیلترها</span>
              </button>
            </div>

            <div className="flex flex-col justify-center gap-10">
              {isFetching ? (
                <ProductsSkeletonSection />
              ) : products.length > 0 ? (
                <ProductList
                  productList={products}
                  theSubCategory={theSubCategory ?? {}}
                />
              ) : (
                <NoProductsToShow />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
