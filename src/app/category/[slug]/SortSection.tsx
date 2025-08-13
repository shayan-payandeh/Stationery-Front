"use client";
import { sortValues } from "@/constant/sortValues";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { RiSortDesc } from "react-icons/ri";

function SortSection() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [currentSortValue, setCurrentSortValue] = useState(
    searchParams.get("sort") || "newest",
  );

  const sortHandler = (value: string) => {
    setCurrentSortValue(value);
    const newUrlParams = new URLSearchParams(searchParams);
    if (newUrlParams.get("sort")) newUrlParams.delete("sort");
    newUrlParams.set("sort", value);
    router.push(`${pathname}?${newUrlParams.toString()}`);
  };
  return (
    <div
      id="sort-section-wrapper"
      className="mx-auto hidden w-full lg:block xl:max-w-[1150px]"
    >
      <div className="mx-auto flex gap-[2px] rounded-t-lg bg-light-350 px-0 py-3 sm:gap-[30px] sm:px-4">
        <span className="flex items-center gap-1 p-2 text-listItem font-medium text-dark-700">
          <RiSortDesc className="text-[12px] sm:text-[17px]" />
          مرتب سازی :
        </span>
        <ul className="flex items-center gap-[1px] text-listItem text-dark-500 sm:gap-[15px]">
          {sortValues.map((sortValue) => (
            <li
              key={sortValue.id}
              onClick={() => sortHandler(sortValue.title)}
              className={`cursor-pointer rounded-md p-1 ${sortValue.title === currentSortValue ? "font-semibold text-dark-700 shadow-sm sm:bg-light-200 sm:p-2" : ""}`}
            >
              {sortValue.persianTitle}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SortSection;
