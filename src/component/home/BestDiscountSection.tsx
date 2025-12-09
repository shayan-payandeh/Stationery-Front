// components/home/BestDiscountSection.tsx
import { appRoutes } from "@/constant/routes";
import { IProductsGet } from "@/interface/products";
import Link from "next/link";
import { FaList } from "react-icons/fa6";
import ProductsSlider from "../ProductsSlider";

export default function BestDiscountSection({
  products,
}: {
  products: IProductsGet[];
}) {
  // گرفتن همه محصولات از سرور
  // فیلتر و مرتب‌سازی محصولات با تخفیف
  const discountedProducts = products
    .filter((p) => Number(p.discount) > 0)
    .sort((a, b) => b.discount - a.discount)
    .slice(0, 5);

  return (
    <section
      id="best-discount-section"
      className="flex min-h-96 w-full flex-col gap-12 py-14 md:px-10"
      style={{
        background:
          "radial-gradient(circle at 50.4% 50.5%, rgb(211, 62, 86) 0%, rgb(135, 2, 35) 90%)",
      }}
    >
      {/* هدر و لینک همه تخفیف‌ها */}
      <div className="flex flex-col gap-3 md:flex-row">
        <h2 className="w-full text-center text-title font-semibold text-light-100 md:w-[70%] md:text-start">
          تخفیف های روز
        </h2>
        <div className="flex w-full justify-center md:w-[30%] md:justify-end">
          <Link href={`${appRoutes.products.link}?discount=true`}>
            <div className="transition-smooth flex-center gap-2 rounded-md border border-light-100 px-3 py-3 text-light-100 hover:opacity-75">
              <FaList className="-scale-x-100 text-[16px] md:text-[20px]" />
              <span className="text-[12px] md:text-[13.2px]">همه تخفیف ها</span>
            </div>
          </Link>
        </div>
      </div>

      {/* اسلایدر محصولات */}
      <div id="product-card-wrapper" className="flex">
        {discountedProducts.length ? (
          <ProductsSlider productsToShow={discountedProducts} />
        ) : (
          <p className="text-light-100">محصولی با تخفیف پیدا نشد.</p>
        )}
      </div>
    </section>
  );
}
