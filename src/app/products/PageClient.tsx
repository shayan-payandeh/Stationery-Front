"use client";
import AppBreadCrumb from "@/component/AppBreadCrumb";
import Card from "@/component/Card";
import Paginate from "@/component/Paginate";
import { appRoutes } from "@/constant/routes";
import { useGetProducts } from "@/hook/useProducts";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import "rc-pagination/assets/index.css";
import NoProductsToShow from "../category/[slug]/NoProductsToShow";
import ProductSkeleton from "./ProductSkeleton";
import ErrorFallback from "@/component/ErrorFallback";

export default function PageClient({
  initialProducts,
}: {
  initialProducts: any;
}) {
  const { link, persianTitle } = appRoutes.products;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.toString();
  const {
    data = initialProducts,
    isFetching,
    isError,
    refetch,
  } = useGetProducts(query, {
    initialData: initialProducts,
  });
  const products = data?.products?.docs ?? [];
  const PageContent = ({ children }) => (
    <div className="flex-center relative w-full">
      <div className="responsive__wrapper flex flex-col gap-1">
        <AppBreadCrumb destinations={[{ title: persianTitle, link }]} />
        <div
          id="category-products-section-wrapper"
          className="col-span-10 flex flex-col gap-8 py-1 lg:col-span-9 lg:px-0 xl:col-span-8 xl:px-0"
        >
          {children}
        </div>
      </div>
    </div>
  );

  if (isError && !data)
    return (
      <ErrorFallback onRetry={refetch} message="خطا در بارگذاری محصولات" />
    );

  if (isFetching && products.length === 0)
    return (
      <PageContent>
        <div className="pt-6">
          <ProductSkeleton />
        </div>
      </PageContent>
    );

  return (
    <PageContent>
      <div id="category-wrapper" className="grid gap-2 pb-10 pt-6">
        <div
          id="category-products-section-wrapper"
          className="col-span-10 flex flex-col gap-8 py-1 lg:col-span-9 lg:px-0 xl:col-span-8 xl:px-0"
        >
          <div>
            <div
              id="products-list"
              className="grid w-full grid-cols-2 place-items-center gap-x-2 gap-y-4 bg-white py-6 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 xl:grid-cols-10"
            >
              {products.map((product) => (
                <div
                  key={product._id}
                  className="col-span-2 lg:col-span-3 xl:col-span-2"
                >
                  <Card product={product} />
                </div>
              ))}
            </div>
            {products.length === 0 && <NoProductsToShow />}
          </div>

          {data && (
            <div
              id="paginate-wrapper"
              className="flex justify-center bg-light-200"
            >
              <Paginate
                items={data.products}
                pathname={pathname}
                router={router}
                searchParams={searchParams}
              />
            </div>
          )}
        </div>
      </div>
    </PageContent>
  );
}
