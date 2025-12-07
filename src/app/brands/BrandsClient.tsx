"use client";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import BrandSearch from "./BrandSearch";
import BrandTitle from "./BrandTitle";
import BrandsList from "./BrandsList";

// Client Component - handles interactivity

// The trim() method is a built-in string function used to remove whitespace characters from both the beginning and the end of a string.
// This method returns a new string with the leading and trailing whitespace removed, without modifying the original string.
export default function BrandsClient({
  initialBrands,
}: {
  initialBrands: any[];
}) {
  const [searchText, setSearchText] = useState("");
  const [debouncedSearch] = useDebounce(searchText, 300);

  const normalize = (text: string) => text.trim().toLowerCase();

  const filteredBrands = debouncedSearch
    ? initialBrands.filter((brand) =>
        normalize(brand.persianTitle).includes(normalize(debouncedSearch)),
      )
    : initialBrands;
  return (
    <>
      <div
        id="title-wrapper"
        className="flex w-full items-center gap-3 px-6 py-2 md:px-0"
      >
        <BrandTitle BrandsCount={filteredBrands.length} />
      </div>

      <div id="searching-wrapper" className="px-6 py-[15px] md:px-0">
        <div className="mx-auto max-w-[665px]">
          <BrandSearch
            searchTextHandler={setSearchText}
            inputValue={searchText}
          />
        </div>
      </div>

      <BrandsList brands={filteredBrands} />
    </>
  );
}
