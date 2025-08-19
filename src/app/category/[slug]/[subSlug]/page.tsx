import productService from "@/service/productService";
import subCategoryService from "@/service/subCategoryService";
import SubCategoryPage from "./SubCategoryPage";

export async function generateStaticParams() {
  const res = await subCategoryService.getSubCategories();
  const subCategories = res.subCategories;
  return subCategories.map((cat: any) => ({ slug: cat.slug }));
}

export default async function Page({
  params,
}: {
  params: { slug: string; subSlug: string };
}) {
  const { slug, subSlug } = params;
  const res = await productService.getProductsBySlug(slug, {});
  const productsData = res.docs;
  const subRes = await subCategoryService.getSubCategories();
  const subCategoriesData = subRes.subCategories;

  return (
    <SubCategoryPage
      slug={slug}
      subSlug={subSlug}
      initialProducts={productsData}
      initialSubCategories={subCategoriesData}
    />
  );
}
