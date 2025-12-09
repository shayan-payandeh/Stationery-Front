import { queryHandler } from "@/utils/queryHandler";
import { toPersianNumbers } from "@/utils/toPersianNumbers";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

type Props = {
  items: any;
  searchParams: URLSearchParams;
  router: AppRouterInstance;
  pathname: string;
};

function Paginate({ items, searchParams, router, pathname }: Props) {
  const currentPage = items?.page;
  const totalpages = items?.totalPages;
  const smallArray = Array.from({ length: totalpages }, (_, i) => i + 1);

  const x1: number[] =
    currentPage !== 1
      ? currentPage !== totalpages
        ? [1, totalpages, currentPage - 1, currentPage, currentPage + 1]
        : [1, totalpages, totalpages - 1, totalpages - 2]
      : [1, 2, 3, totalpages];

  const uniqueX1 = [...new Set(x1)].sort((a, b) => a - b);

  if (uniqueX1[1] - uniqueX1[0] > 1) {
    uniqueX1.splice(1, 0, 0);
  }
  if (uniqueX1[uniqueX1.length - 1] - uniqueX1[uniqueX1.length - 2] > 1) {
    uniqueX1.splice(uniqueX1.length - 1, 0, 0);
  }

  const arrayToDisplay = totalpages <= 5 ? smallArray : uniqueX1;

  const pageChanger = (e: number) => {
    const x = { target: { name: "page", value: e.toString() } };
    queryHandler(x, searchParams, router, pathname);
  };
  return (
    <div className="flex flex-row-reverse gap-[8px]">
      <button
        onClick={() => pageChanger(currentPage - 1)}
        disabled={currentPage === 1 ? true : false}
        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-light-350 p-2 transition-all duration-200 ease-in hover:bg-light-500 disabled:bg-light-350 disabled:text-light-400"
      >
        <IoIosArrowBack className="text-sm" />
      </button>
      {arrayToDisplay.map((item, index) => (
        <div key={item * 2 + index}>
          {item !== 0 && (
            <span
              onClick={() => pageChanger(item)}
              className={`${currentPage === item ? "border bg-primary-600 text-light-200" : "bg-light-350"} ${currentPage !== item ? "hover:bg-light-500" : ""} flex h-8 w-8 cursor-pointer items-center justify-center rounded-full p-2 transition-all duration-200 ease-in`}
            >
              {toPersianNumbers(item)}
            </span>
          )}
          {item === 0 && <span>...</span>}
        </div>
      ))}
      <button
        onClick={() => pageChanger(currentPage + 1)}
        disabled={currentPage === totalpages ? true : false}
        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-light-350 p-2 transition-all duration-200 ease-in hover:bg-light-500 disabled:bg-light-350 disabled:text-light-400"
      >
        <IoIosArrowForward className="text-sm" />
      </button>
    </div>
  );
}

export default Paginate;
