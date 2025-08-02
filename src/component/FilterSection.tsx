import AccordionFilter from "@/component/AccordionFilter";
import { ISubCategoryGet } from "@/interface/subCategory";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

function FilterSection({ subCategory }: { subCategory: ISubCategoryGet }) {
  const searchParams = useSearchParams();

  const initialFilterValues = subCategory?.filterItems.map((item) => ({
    ...item,
    values: new URLSearchParams(searchParams).get(item.title)?.split(",") || [],
  }));
  const [selectedFilters, setSelectedFilters] = useState(initialFilterValues);

  return (
    <AccordionFilter
      searchParams={searchParams}
      filterValues={subCategory?.filterItems}
      selectedFilters={selectedFilters}
      setSelectedFilters={setSelectedFilters}
    />
  );
}

export default FilterSection;
