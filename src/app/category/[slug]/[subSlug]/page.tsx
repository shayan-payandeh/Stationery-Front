import productService from "@/service/productService";
import subCategoryService from "@/service/subCategoryService";
import SubCategoryPage from "./SubCategoryPage";
import ErrorFallback from "@/component/ErrorFallback";
import categoryService from "@/service/categoryService";

export async function generateStaticParams() {
  try {
    const { subCategories } = await subCategoryService.getSubCategories();
    const { categories } = await categoryService.getCategories();
    const newSubCategories: any = [];
    for (const category of categories) {
      for (const subCategory of subCategories) {
        if (category._id === subCategory.category) {
          newSubCategories.push({
            slug: subCategory.slug,
            subSlug: category.slug,
          });
        }
      }
    }
    return newSubCategories;
  } catch (error) {
    return [];
  }
}

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string; subSlug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { slug, subSlug } = params;
  // try {
  //   const res = await productService.getProductsBySlug(slug, {});
  //   const productsData = res.docs;
  //   const subRes = await subCategoryService.getSubCategories();
  //   const subCategoriesData = subRes.subCategories;

  //   return (
  //     <SubCategoryPage
  //       slug={slug}
  //       subSlug={subSlug}
  //       initialProducts={productsData}
  //       initialSubCategories={subCategoriesData}
  //     />
  //   );
  // } catch (error) {
  //   return <ErrorFallback message="خطا در بارگذاری داده‌ها" fullScreen />;
  // }
  const [productsDataResult, subCategoriesDataResult] = await Promise.all([
    productService.getServerProductsBySlug(slug, {}),
    subCategoryService.getServerSubCategories(),
  ]);
  if (!subCategoriesDataResult.error && !productsDataResult.error) {
    return (
      <SubCategoryPage
        slug={slug}
        subSlug={subSlug}
        initialProducts={productsDataResult.data.docs}
        initialSubCategories={subCategoriesDataResult.data}
        searchParams={searchParams}
      />
    );
  }
  return <ErrorFallback message="خطا در بارگذاری داده‌ها" fullScreen />;
}
