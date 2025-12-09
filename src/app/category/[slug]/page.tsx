import AppBreadCrumb from "@/component/AppBreadCrumb";
import ErrorFallback from "@/component/ErrorFallback";
import { categoriesIconSlug } from "@/constant/category";
import { IApiResponse } from "@/interface/apiResponse";
import { ICategoryGet } from "@/interface/category";
import { IProduct } from "@/interface/products";
import { ISubCategoryGet } from "@/interface/subCategory";
import http from "@/service/http";
import { HiOutlineTag } from "react-icons/hi";
import CategoryTitle from "./CategoryTitle";
import NoProductsToShow from "./NoProductsToShow";
import ProductList from "./ProductList";
import SwiperSection from "./SwiperSection";

export async function generateStaticParams() {
  try {
    const res = await http.get("/category/list");
    // فقط داده JSON-safe برگردانده شود
    const categories = res.data?.data?.categories ?? [];
    return categories.map((category: any) => ({ slug: category.slug }));
  } catch (error) {
    return [];
  }
}

interface PageProps {
  params: { slug: string };
}

async function Page({ params }: PageProps) {
  const slug = decodeURI(params.slug);

  try {
    // دریافت دسته‌ها
    const { data: categoriesData } = await http
      .get<IApiResponse<ICategoryGet>>("/category/list")
      .then(({ data }) => data);

    const categories = categoriesData?.categories ?? [];
    const theCategory = categories.find((item) => item.slug === slug);

    if (!theCategory) {
      return <ErrorFallback message="دسته‌بندی پیدا نشد" fullScreen />;
    }

    const theCategoryId = theCategory._id;

    // دریافت زیر دسته‌ها
    const { data: subCategoriesData } = await http
      .get<IApiResponse<ISubCategoryGet>>("/subcategory/list")
      .then(({ data }) => data);

    const theSubCategories =
      subCategoriesData?.subCategories?.filter(
        (item) => item.category === theCategoryId,
      ) ?? [];

    // دریافت محصولات
    const { data: productsData } = await http
      .get<IProduct>(`/product/${slug}`)
      .then(({ data }) => data);

    const products = productsData?.products?.docs ?? [];

    // یافتن آیکون
    const Icon =
      categoriesIconSlug.find((item) => item.slug === slug)?.Icon ||
      HiOutlineTag;

    return (
      <div className="flex-center w-full">
        <div className="responsive__wrapper flex flex-col gap-1">
          <AppBreadCrumb
            destinations={[{ title: slug.replaceAll("-", " "), link: "" }]}
          />

          <div
            id="category-wrapper"
            className="grid grid-cols-10 gap-2 pb-10 pt-6"
          >
            <div
              id="category-products-section-wrapper"
              className="col-span-10 flex flex-col px-6 py-0 md:px-0"
            >
              <div
                id="filter-sort-mobile-wrapper"
                className="mb-2 flex gap-2 md:px-0 lg:hidden"
              ></div>

              <div className="flex flex-col justify-center gap-10">
                {theSubCategories.length > 0 && (
                  <SwiperSection
                    theSubCategory={theSubCategories}
                    categories={categories}
                  />
                )}

                <div id="products-wrapper" className="flex flex-col gap-4">
                  {theCategory && (
                    <CategoryTitle Icon={Icon} theCategory={theCategory} />
                  )}

                  {products.length > 0 ? (
                    <ProductList productList={products} />
                  ) : (
                    <NoProductsToShow />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return <ErrorFallback message="خطا در بارگذاری داده‌ها" fullScreen />;
  }
}

export default Page;
