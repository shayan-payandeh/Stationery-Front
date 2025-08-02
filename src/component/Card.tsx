import { routes } from "@/constant/routes";
import { IProductsGet } from "@/interface/products";
import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from "@/utils/toPersianNumbers";
import Link from "next/link";

type Props = {
  product: IProductsGet;
};

function Card({ product }: Props) {
  return (
    <div className="relative w-full max-w-[280px] gap-2 rounded-lg border border-[#f0f0f1] bg-white pb-1 !text-right shadow-sm transition-all duration-300 ease-in hover:scale-[1.01]">
      <Link href={`${routes.products}/${product._id}`}>
        {product.discount > 0 && (
          <span className="absolute left-0 top-0">
            <svg
              id="visual"
              viewBox="0 0 900 600"
              width="345"
              height="245"
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
            >
              <g transform="translate(-11.627756269372412 4.557372955876133)">
                <path
                  d="M104.3 -38.1C113.5 -5.6 84.3 35.1 48.5 59.4C12.6 83.7 -29.8 91.6 -55.3 73.7C-80.9 55.7 -89.4 12 -77.4 -24.5C-65.3 -60.9 -32.7 -89.9 7.4 -92.4C47.6 -94.8 95.1 -70.6 104.3 -38.1"
                  fill="#b91c1c"
                ></path>
              </g>
            </svg>
          </span>
        )}
        {product.discount > 0 && (
          <span className="absolute left-0 top-0 ml-1 mt-2 text-[12px] text-light-100">
            %{toPersianNumbers(product.discount)}
          </span>
        )}

        <div className="mx-auto h-[210px] w-[230px] p-3">
          <img
            alt="img"
            src={product.images[0].src}
            className="h-full w-full"
          />
        </div>
        <div className="w-full border border-light-300"></div>
        <div className="px-2 py-[5px] text-xs text-light-500">
          {product.brand.persianTitle}
        </div>
        <div className="px-2 text-[15px] text-dark-700">{product.name}</div>
        <div dir="rtl" className="gap-1 px-2 text-sm">
          <span
            className={` ${product.discount > 0 ? "relative font-normal text-light-500 before:absolute before:left-0 before:right-0 before:top-[50%] before:rotate-[-10deg] before:content-normal before:border-t before:border-gray-500" : "font-semibold text-red-700"} `}
          >
            {toPersianNumbersWithComma(product.price)}
          </span>
          &nbsp;
          {product.discount > 0 && (
            <span className="font-semibold text-red-700">
              {" "}
              {toPersianNumbersWithComma(
                product.price - (product.price * product.discount) / 100,
              )}
            </span>
          )}
          &nbsp;
          <span className="text-[11px] text-red-700">تومان</span>
        </div>
        {/* <div className="px-3 py-[10px]">
          <button
            onClick={addToCartHandler}
            className="w-full rounded-lg border border-primary-500 py-2 text-[12px] font-semibold text-primary-500 transition-all duration-500 ease-in-out hover:border-none hover:bg-primary-500 hover:text-light-100"
          >
            افزودن به سبد خرید
          </button>
        </div> */}
      </Link>
    </div>
  );
}

export default Card;
