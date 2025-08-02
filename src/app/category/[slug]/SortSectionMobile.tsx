import { sortValues } from "@/constant/sortValues";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { MdOutlineClose } from "react-icons/md";

type SortSectionMobileProps = {
  sortStatus: boolean;
  setSortStatus: Dispatch<SetStateAction<boolean>>;
};

function SortSectionMobile({
  sortStatus,
  setSortStatus,
}: SortSectionMobileProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [sortValue, setSortValue] = useState(
    searchParams.get("sort") || "newest",
  );
  const sortHandler = (value: string) => {
    setSortValue(value);
    const newUrlParams = new URLSearchParams(searchParams);
    if (newUrlParams.get("sort")) newUrlParams.delete("sort");
    newUrlParams.set("sort", value);
    router.push(`${pathname}?${newUrlParams.toString()}`);
  };
  return (
    <div
      className={`fixed right-0 top-0 z-[65342] h-[100vh] ${sortStatus ? "fixed mt-0 opacity-100" : "mt-[1000px] opacity-0"} w-full transition-all duration-[1500ms]`}
    >
      <div
        onClick={() => setSortStatus(false)}
        className={`h-[35%] w-full`}
      ></div>
      <div
        className={`bottom-0 right-0 z-[66661] w-full rounded-t-2xl bg-light-100 ${sortStatus ? "translate-y-0" : "translate-y-[100%]"} flex h-[65%] flex-col p-6 transition duration-300 ease-in-out`}
      >
        <div className="flex justify-between">
          <span className="text-[12px] font-medium text-dark-700">
            مرتب سازی براساس
          </span>
          <span onClick={() => setSortStatus(false)}>
            <MdOutlineClose className="text-[20px] text-dark-700" />
          </span>
        </div>
        <ul className="mt-3 flex h-full w-full flex-col text-[11.5px] text-dark-500 [&>:not(:last-child)]:border-b [&>:not(:last-child)]:border-light-300">
          {sortValues.map((item) => (
            <li
              key={item.id}
              className={`${sortValue === item.title ? "flex justify-between font-semibold text-primary-500" : ""} py-5`}
              onClick={() => {
                sortHandler(item.title);
              }}
            >
              <span>{item.persianTitle}</span>
              {item.title === sortValue && (
                <span>
                  <FaCheck className="text-[16px] text-primary-500" />
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SortSectionMobile;
