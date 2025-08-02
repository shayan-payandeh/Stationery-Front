import AccordionFilter from "@/component/AccordionFilter";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { MdOutlineClose } from "react-icons/md";

type FilterSectionMobileProps = {
  filterStatus: boolean;
  setFilterStatus: Dispatch<SetStateAction<boolean>>;
  filterValues: { title: string; persianTitle: string; values: any[] }[];
};

function FilterSectionMobile({
  filterStatus,
  setFilterStatus,
  filterValues,
}: FilterSectionMobileProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const initialFilterValues = filterValues.map((item) => ({
    ...item,
    values: new URLSearchParams(searchParams).get(item.title)?.split(",") || [],
  }));
  const [selectedFilters, setSelectedFilters] = useState(initialFilterValues);

  return (
    <div
      className={`fixed right-0 top-0 z-[65342] h-[100vh] ${filterStatus ? "fixed mt-0 opacity-100" : "mt-[1000px] opacity-0"} w-full transition-all duration-[1500ms]`}
    >
      <div
        onClick={() => setFilterStatus(false)}
        className={`h-[35%] w-full`}
      ></div>
      <div
        className={`bottom-0 right-0 w-full rounded-t-2xl bg-light-100 ${filterStatus ? "translate-y-0" : "translate-y-[100%]"} flex h-[65%] flex-col p-6 transition duration-300 ease-in-out`}
      >
        <div className="flex justify-between">
          <span className="text-[12px] font-semibold text-dark-700">
            فیلترها
          </span>
          <span onClick={() => setFilterStatus(false)}>
            <MdOutlineClose className="text-[20px] text-dark-700" />
          </span>
        </div>
        <div className="mt-3 flex h-full w-full flex-col text-[11.5px] text-dark-500 [&>:not(:last-child)]:border-b [&>:not(:last-child)]:border-light-300">
          <AccordionFilter
            searchParams={searchParams}
            filterValues={filterValues}
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
          />
        </div>
        <div className="flex-center gap-3">
          <button className="rounded-md bg-primary-500 px-7 py-[10px] text-[11px] text-light-100">
            مشاهده محصول
          </button>
          <button
            onClick={() => {
              setSelectedFilters(
                filterValues.map((item) => ({
                  ...item,
                  values: [],
                })),
              );
              router.push(`${pathname}`);
            }}
            className="rounded-md border border-primary-600 bg-light-100 px-7 py-[10px] text-[11px] text-primary-500"
          >
            حذف فیلتر(ها)
          </button>
        </div>
      </div>
    </div>
  );
}

export default FilterSectionMobile;
