import { Accordion, AccordionItem as Item } from "@szhsin/react-accordion";
import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
} from "next/navigation";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { IoIosArrowDown } from "react-icons/io";

type AccordionItemProps = {
  header: string;
  itemLength?: number;
  children: any;
};

const AccordionItem = ({ header, itemLength, ...rest }: AccordionItemProps) => (
  <Item
    {...rest}
    header={({ state: { isEnter } }) => (
      <div className="flex w-full items-center justify-between py-4 text-listItem font-medium text-dark-700">
        {/* <span>{header}</span> */}
        <div className="flex items-center gap-3">
          <span>{header}</span>
          {itemLength! > 0 && (
            <span className="h-1 w-1 rounded-[100px] bg-primary-500 lg:hidden"></span>
          )}
        </div>
        <IoIosArrowDown
          className={`transition-transform duration-200 ease-out ${
            isEnter && "rotate-180"
          }`}
        />
      </div>
    )}
    className="p-[1px] text-center"
    contentProps={{
      className:
        "duration-200 ease-out  py-0 px-2 mx-auto  bg-white text-start",
    }}
    panelProps={{ className: "p-0 " }}
    buttonProps={{
      // className: ({ isEnter }) => `py-0  px-0 w-full mx-auto bg-white `,
      className: () => `py-0  px-0 w-full mx-auto bg-white `,
    }}
  />
);

type AccordionFilterProps = {
  searchParams: ReadonlyURLSearchParams;
  filterValues: { title: string; persianTitle: string; values: any[] }[];
  selectedFilters: { title: string; persianTitle: string; values: any[] }[];
  setSelectedFilters: Dispatch<
    SetStateAction<{ title: string; persianTitle: string; values: any[] }[]>
  >;
};

function AccordionFilter({
  searchParams,
  filterValues,
  selectedFilters,
  setSelectedFilters,
}: AccordionFilterProps) {
  //   const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const queryHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const newUrlSearchParams = new URLSearchParams(
      Array.from(searchParams.entries()),
    );

    if (e.target.checked) {
      const filterItemIndex = selectedFilters.findIndex(
        (item) => item.title === e.target.name,
      );
      const copySelected = selectedFilters.slice();
      copySelected[filterItemIndex] = {
        ...copySelected[filterItemIndex],
        values: [...copySelected[filterItemIndex].values, e.target.value],
      };
      setSelectedFilters([...copySelected]);
      selectedFilters[filterItemIndex].values.length > 0
        ? newUrlSearchParams.set(
            `${e.target.name}`,
            [
              ...selectedFilters[filterItemIndex].values,
              e.target.value,
            ].toString(),
          )
        : newUrlSearchParams.set(`${e.target.name}`, `${e.target.value}`);
    } else {
      const filterItemIndex = selectedFilters.findIndex(
        (item) => item.title === e.target.name,
      );
      const copySelected = selectedFilters.slice();
      copySelected[filterItemIndex] = {
        ...copySelected[filterItemIndex],
        values: copySelected[filterItemIndex].values.filter(
          (item) => item !== e.target.value,
        ),
      };
      setSelectedFilters([...copySelected]);
      if (selectedFilters[filterItemIndex].values.length > 1) {
        newUrlSearchParams.delete(`${e.target.name}`);
        newUrlSearchParams.set(
          `${e.target.name}`,
          copySelected[filterItemIndex].values.join(),
        );
      } else newUrlSearchParams.delete(`${e.target.name}`);
    }
    // if (isNaN(parseInt(e.target.value)) && newUrlSearchParams.get("page")) {
    //   newUrlSearchParams.delete("page");
    // }
    router.push(`${pathname}?${newUrlSearchParams.toString()}`);
  };

  return (
    <>
      <Accordion
        transition
        transitionTimeout={250}
        allowMultiple
        className="rounded-xl border border-gray-200 bg-white px-5 py-1 [&>*:not(:last-child)]:border-b [&>*:not(:last-child)]:border-gray-300"
      >
        {filterValues?.map((item, index) => (
          <AccordionItem
            header={item.persianTitle}
            key={item.title}
            itemLength={selectedFilters[index].values.length}
          >
            <div className="flex flex-col gap-6 py-3">
              {item.values.map((elm) => (
                <div
                  key={elm.title}
                  className="flex items-center text-[11.5px]"
                >
                  <input
                    id={elm.title}
                    type="checkbox"
                    value={elm.title}
                    onChange={queryHandler}
                    name={item.title}
                    checked={selectedFilters[index].values.includes(elm.title)}
                  />
                  <label className="mr-1" htmlFor={item.title}>
                    {elm.persianTitle || elm.title}
                  </label>
                </div>
              ))}
            </div>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
}

export default AccordionFilter;
