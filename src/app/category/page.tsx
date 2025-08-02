"use client";
import AppBreadCrumb from "@/component/AppBreadCrumb";
import Loading from "@/component/Loading";
import SearchBox from "@/common/SearchBox";
import { appRoutes } from "@/constant/routes";
import { useGetSubCategories } from "@/hook/useSubCategories";
import { toPersianNumbers } from "@/utils/toPersianNumbers";
import { ChangeEvent, useState } from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import SubCategoriesList from "./SubCategoriesList";

function Page() {
  const [searchText, setSearchText] = useState("");
  const { data, isLoading } = useGetSubCategories();
  const { subCategories } = data || {};
  const filteredSubCategories = searchText
    ? subCategories!.filter((item) => item.persianTitle.includes(searchText))
    : subCategories;

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  const { link, persianTitle } = appRoutes.category;

  if (isLoading) return <Loading />;
  return (
    <div id="categoryPpage-wrapper" className="flex-center w-full">
      <div className="responsive__wrapper flex flex-col justify-center gap-5 text-center">
        <AppBreadCrumb destinations={[{ title: persianTitle, link: link }]} />

        <div
          id="title-wrapper"
          className="flex w-full items-center gap-3 px-6 py-2 md:px-0"
        >
          <HiOutlineMenuAlt3 className="text-[20px] text-primary-500" />
          <h2 className="text-title font-semibold text-dark-500">
            زیر دسته ها :
            <span className="text-[.85rem] text-primary-500">
              {" "}
              ( {toPersianNumbers(subCategories!.length)} مورد یافت شد)
            </span>
          </h2>
        </div>
        <div id="search-wrapper" className="px-6 py-[18px] md:px-0">
          {/* <div className="mx-auto max-w-[665px]">
            <div className="relative w-full text-center">
              <input
                id="searchBox"
                name="searchBox"
                type="text"
                onChange={onSearch}
                placeholder={"جستجوی عنوان زیر دسته ..."}
                className="peer flex w-full rounded-md bg-light-100 px-12 py-3 text-center text-[15px] shadow-container placeholder:text-center placeholder:text-light-500 focus:outline focus:outline-2 focus:outline-primary-500"
              />
              <TbSearch className="absolute right-0 top-0 mr-4 mt-3 text-[22px] font-black text-light-400 peer-focus:-scale-x-100 peer-focus:text-primary-500" />
            </div>
          </div> */}
          <div className="mx-auto max-w-[665px]">
            <SearchBox
              onSearch={onSearch}
              placeholderText={"جستجوی عنوان زیر دسته ..."}
            />
          </div>
        </div>
        <SubCategoriesList subCategories={filteredSubCategories} />
      </div>
    </div>
  );
}

export default Page;
