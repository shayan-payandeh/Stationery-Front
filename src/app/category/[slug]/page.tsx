import AppBreadCrumb from "@/component/AppBreadCrumb";
import { categoriesIconSlug } from "@/constant/category";
import { IApiResponse } from "@/interface/apiResponse";
import { ICategoryGet } from "@/interface/category";
import { IProduct } from "@/interface/products";
import { ISubCategoryGet } from "@/interface/subCategory";
import http from "@/service/http";
import CategoryTitle from "./CategoryTitle";
import NoProductsToShow from "./NoProductsToShow";
import ProductList from "./ProductList";
import SwiperSection from "./SwiperSection";

export async function generateStaticParams() {
  const categories = await http
    .get("/category/list")
    .then(({ data }) => data.data.categories);
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

async function Page({ params }) {
  const slug = decodeURI(params.slug);

  const { categories } = await http
    .get<IApiResponse<ICategoryGet>>("/category/list")
    .then(({ data }) => data.data);
  const theCategory = categories.find((item) => item.slug === slug);
  const theCategoryId = theCategory?._id;

  const { subCategories } = await http
    .get<IApiResponse<ISubCategoryGet>>(`/subcategory/list`)
    .then(({ data }) => data.data);
  const theSubCategories = subCategories?.filter(
    (item) => item.category === theCategoryId,
  );

  const { docs: products } = await http
    .get<IProduct>(`/product/${slug}`)
    .then(({ data }) => data.data.products);

  const Icon = categoriesIconSlug.find(
    (item) => item.slug === decodeURI(slug),
  )?.Icon;

  // const defaultSlugs = [
  //   "لوازم-دانش-آموزی",
  //   "لوازم-اداری",
  //   "دفتر-و-کاغذ",
  //   "نوشت-افزار",
  // ];
  // if (defaultSlugs.includes(decodeURI(slug)) && (isLoading || productIsloading))
  //   return (
  //     <MainCategoryPageSkeleton
  //       link={link}
  //       persianTitle={persianTitle}
  //       slug={slug}
  //     />
  //   );
  return (
    <>
      <div className="flex-center w-full">
        <div className="responsive__wrapper flex flex-col gap-1">
          <AppBreadCrumb
            destinations={[
              { title: decodeURI(slug).replaceAll("-", " "), link: "" },
            ]}
          />
          <div
            id="category-wrapper"
            className={`grid grid-cols-10 gap-2 pb-10 pt-6`}
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
                <SwiperSection
                  theSubCategory={theSubCategories}
                  categories={categories!}
                />

                <div id="products-wrapper" className={`flex flex-col gap-4`}>
                  <CategoryTitle Icon={Icon!} theCategory={theCategory!} />

                  {products!?.length > 0 && (
                    <ProductList productList={products!} />
                  )}

                  {products!?.length === 0 && <NoProductsToShow />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
