"use client";
import AppBreadCrumb from "@/component/AppBreadCrumb";
import { appRoutes } from "@/constant/routes";
import { useGetBrands } from "@/hook/useBrands";
import { useState } from "react";
import BrandPageSkeleton from "../../component/skeleton/BrandPageSkeleton";
import BrandSearch from "./BrandSearch";
import BrandTitle from "./BrandTitle";
import BrandsList from "./BrandsList";

function Page() {
  const [searchText, setSearchText] = useState("");
  const { data, isLoading } = useGetBrands();
  const { brands } = data || {};
  const filteredBrands = searchText
    ? brands.filter((brand) => brand.persianTitle.includes(searchText))
    : brands;
  const { link, persianTitle } = appRoutes.brands;

  const PageContent = ({ children }) => {
    return (
      <div id="brand-page-wrapper" className="flex-center w-full">
        <div className="responsive__wrapper flex flex-col justify-center gap-4">
          <AppBreadCrumb destinations={[{ link: link, title: persianTitle }]} />
          <div
            id="title-wrapper"
            className="flex w-full items-center gap-3 px-6 py-2 md:px-0"
          >
            <BrandTitle BrandsCount={filteredBrands?.length} />
          </div>
          <div id="searching-wrapper" className="px-6 py-[15px] md:px-0">
            <div className="mx-auto max-w-[665px]">
              <BrandSearch searchTextHandler={setSearchText} />
            </div>
          </div>
          {children}
        </div>
      </div>
    );
  };

  if (isLoading)
    return (
      <PageContent>
        <BrandPageSkeleton />
      </PageContent>
    );
  return (
    <PageContent>
      <BrandsList brands={filteredBrands} />
    </PageContent>
  );
}

export default Page;
