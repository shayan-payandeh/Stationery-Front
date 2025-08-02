import { appRoutes } from "@/constant/routes";
import { IProductsGet } from "@/interface/products";
import { toPersianNumbers } from "@/utils/toPersianNumbers";
import Link from "next/link";

function ProductInformation({ product }: { product: IProductsGet }) {
  return (
    <section className="flex flex-col gap-3 text-start">
      <div id="product-name-wrapper">
        <span className="text-lg font-[500]">{product?.name}</span>
      </div>
      <div className="w-[95%] border border-light-350"></div>
      <div className="flex">
        <span className="text-sm">دسته بندی :</span>
        &nbsp;
        <Link
          href={`${appRoutes.category.link}/${product.subCategory.persianTitle}`}
        >
          <span className="text-sm text-primary-500">
            {product.subCategory.persianTitle}
          </span>
        </Link>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-gray-500">ویژگی های محصول </span>
        {product?.description.map((item) => (
          <div key={item.title} className="flex">
            <span className="text-[13px]">
              {item.persianTitle} {":"}
            </span>
            <span className="text-[13px]">
              &nbsp;
              {Number.isNaN(Number(item.value))
                ? item.value
                : toPersianNumbers(parseInt(item.value))}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProductInformation;
