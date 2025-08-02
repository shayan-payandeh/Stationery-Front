"use client";
import AppBreadCrumb from "@/component/AppBreadCrumb";
import CategoryPageSkeleton from "@/component/skeleton/CategoryPageSkeleton";
import { categoriesIconSlug } from "@/constant/category";
import { appRoutes } from "@/constant/routes";
import { sortValues } from "@/constant/sortValues";
import { useGetCategories } from "@/hook/useCategories";
import { useGetProductsBySlug } from "@/hook/useProducts";
import { useGetSubCategories } from "@/hook/useSubCategories";
import { ISubCategoryGet } from "@/interface/subCategory";
import { toPersianNumbers } from "@/utils/toPersianNumbers";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { GrSort } from "react-icons/gr";
import { IoFilter } from "react-icons/io5";
import FilterSection from "../../../component/FilterSection";
import CategoryTitle from "./CategoryTitle";
import FilterSectionMobile from "./FilterSectionMobile";
import NoProductsToShow from "./NoProductsToShow";
import ProductList from "./ProductList";
import SortSection from "./SortSection";
import SortSectionMobile from "./SortSectionMobile";
import SwiperSection from "./SwiperSection";
import MainCategoryPageSkeleton from "./MainCategoryPageSkeleton";

function Page() {
  const { data: subCategoriesData, isLoading } = useGetSubCategories();
  const { subCategories } = subCategoriesData || {};

  const searchParams = useSearchParams();
  const x = new URLSearchParams(Array.from(searchParams.entries())).size;
  const filterCount = searchParams.has("sort") ? x - 1 : x;
  const currentSortPersianTitle = searchParams.has("sort")
    ? sortValues.find((item) => item.title === searchParams.get("sort"))
        ?.persianTitle
    : "جدیدترین";

  const { data: categoriesData } = useGetCategories();
  const { categories } = categoriesData || {};
  const [sortStatus, setSortStatus] = useState(false);
  const [filterStatus, setFilterStatus] = useState(false);
  const { slug } = useParams<{ slug: string }>();
  const query = searchParams.toString();
  const { data: productsData, isLoading: productIsloading } =
    useGetProductsBySlug(decodeURI(slug), query);
  const { docs } = productsData || {};
  const theCategory = categories?.find(
    (category) => category.slug === decodeURI(slug),
  );
  const categoryType = theCategory ? "category" : "subCategory";
  const theSubCategories = theCategory
    ? subCategories?.filter(
        (subCategory) => subCategory.category === theCategory._id,
      )
    : [];

  let theSubCategory!: ISubCategoryGet;
  if (categoryType !== "category") {
    const x = subCategories?.find((item) => item.slug === decodeURI(slug));
    theSubCategory = x!;
  }

  let Icon;
  if (categoryType === "category")
    Icon = categoriesIconSlug.find(
      (item) => item.slug === decodeURI(slug),
    )?.Icon;

  // categoryType === "category"
  //   ? products.filter((product) => product.categoryId === theCategory?._id)
  //   : products.filter(
  //       (product) => product.subCategoryId === theSubCategory._id,
  //     );

  useEffect(() => {
    document.body.style.overflow =
      sortStatus || filterStatus ? "hidden" : "auto";
  }, [sortStatus, filterStatus]);

  const { link, persianTitle } = appRoutes.category;
  const defaultSlugs = [
    "لوازم-دانش-آموزی",
    "لوازم-اداری",
    "دفتر-و-کاغذ",
    "نوشت-افزار",
  ];
  if (defaultSlugs.includes(decodeURI(slug)) && (isLoading || productIsloading))
    return (
      <MainCategoryPageSkeleton
        link={link}
        persianTitle={persianTitle}
        slug={slug}
      />
    );
  if (
    !defaultSlugs.includes(decodeURI(slug)) &&
    (isLoading || productIsloading)
  )
    return (
      <CategoryPageSkeleton
        link={link}
        persianTitle={persianTitle}
        slug={slug}
      />
    );
  return (
    <>
      <div className="flex-center w-full">
        {theSubCategory && (
          <div
            onClick={() => setSortStatus(false)}
            className={`fixed right-0 top-0 z-[65341] h-[100vh] items-center justify-center bg-dark-500 ${sortStatus || filterStatus ? "fixed mt-0 opacity-40" : "mt-[1000px] opacity-0"} w-full transition-all duration-100`}
          ></div>
        )}

        {theSubCategory && (
          <SortSectionMobile
            setSortStatus={setSortStatus}
            sortStatus={sortStatus}
          />
        )}
        {theSubCategory && (
          <FilterSectionMobile
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            filterValues={theSubCategory?.filterItems}
          />
        )}

        <div className="responsive__wrapper flex flex-col gap-1">
          <AppBreadCrumb
            destinations={[
              { title: persianTitle, link: link },
              { title: decodeURI(slug).replaceAll("-", " "), link: "" },
            ]}
          />
          <div
            id="category-wrapper"
            className={`grid gap-2 pb-10 pt-6 ${theSubCategory ? "grid-cols-10 lg:grid-cols-12 xl:grid-cols-10" : "grid-cols-10"}`}
          >
            {!theCategory && (
              <div
                id="filter-section-wrapper"
                className="hidden min-h-screen py-[1px] lg:col-span-3 lg:block xl:col-span-2"
              >
                <FilterSection subCategory={theSubCategory} />
              </div>
            )}

            <div
              id="category-products-section-wrapper"
              className={`${theCategory ? "col-span-10" : "col-span-10 lg:col-span-9 xl:col-span-8"} flex flex-col px-6 py-0 md:px-0`}
            >
              {theSubCategory && <SortSection />}

              <div
                id="filter-sort-mobile-wrapper"
                className="mb-2 flex gap-2 md:px-0 lg:hidden"
              >
                {theSubCategory && (
                  <div
                    onClick={() => setSortStatus(true)}
                    className="flex-center gap-2 rounded-xl border border-light-350 bg-light-100 p-2 text-listItem text-dark-500"
                  >
                    <span>
                      <GrSort className="-scale-x-100 text-[14px]" />
                    </span>
                    <span>{currentSortPersianTitle}</span>
                  </div>
                )}
                {theSubCategory && (
                  <div
                    onClick={() => setFilterStatus(true)}
                    className={`flex-center relative gap-[5px] rounded-xl border border-light-350 bg-light-100 p-2 text-listItem text-dark-500 ${filterCount > 0 ? "bg-red-100 text-warning-500" : ""}`}
                  >
                    {filterCount > 0 && (
                      <span className="absolute left-0 top-0 -mt-1 flex h-[14px] w-[14px] items-center justify-center rounded-badge bg-warning-500 p-[7px] text-center text-light-100">
                        {toPersianNumbers(filterCount)}
                      </span>
                    )}

                    <span>
                      <IoFilter className="text-[14px]" />
                    </span>
                    <span>فیلترها</span>
                  </div>
                )}
              </div>

              <div className="flex flex-col justify-center gap-10">
                {theCategory && (
                  <SwiperSection theSubCategory={theSubCategories} />
                )}
                <div
                  id="products-wrapper"
                  className={`flex flex-col gap-4 ${theSubCategory ? "items-center" : ""}`}
                >
                  {categoryType === "category" && (
                    <CategoryTitle Icon={Icon!} theCategory={theCategory!} />
                  )}

                  {docs!?.length > 0 && (
                    <ProductList
                      productList={docs!}
                      theSubCategory={theSubCategory}
                    />
                  )}

                  {docs!?.length === 0 && <NoProductsToShow />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
