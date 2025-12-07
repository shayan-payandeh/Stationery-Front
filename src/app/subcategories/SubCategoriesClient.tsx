"use client";
import SearchBox from "@/common/SearchBox";
import { toPersianNumbers } from "@/utils/toPersianNumbers";
import { ChangeEvent, useState } from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { useDebounce } from "use-debounce";
import SubCategoriesList from "./SubCategoriesList";

//Handles search filtering locally (no server requests)
export default function SubCategoriesClient({
  initialSubCategories,
  initialCategories,
}: {
  initialSubCategories: any[];
  initialCategories: any[];
}) {
  const [searchText, setSearchText] = useState("");
  const [debouncedSearch] = useDebounce(searchText, 300);

  const normalize = (text: string) => text.trim().toLowerCase();

  const filteredSubCategories = debouncedSearch
    ? initialSubCategories.filter((item) =>
        normalize(item.persianTitle).includes(normalize(debouncedSearch)),
      )
    : initialSubCategories;

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return (
    <>
      <div
        id="title-wrapper"
        className="flex w-full items-center gap-3 px-6 py-2 md:px-0"
      >
        <HiOutlineMenuAlt3 className="text-[20px] text-primary-500" />
        <h2 className="text-title font-semibold text-dark-500">
          زیر دسته ها :
          <span className="text-[.85rem] text-primary-500">
            {" "}
            ( {toPersianNumbers(filteredSubCategories.length)} مورد یافت شد)
          </span>
        </h2>
      </div>

      <div id="search-wrapper" className="px-6 py-[18px] md:px-0">
        <div className="mx-auto max-w-[665px]">
          <SearchBox
            inputValue={searchText}
            onSearch={onSearch}
            placeholderText={"جستجوی عنوان زیر دسته ..."}
          />
        </div>
      </div>

      <SubCategoriesList
        subCategories={filteredSubCategories}
        categories={initialCategories}
      />
    </>
  );
}
