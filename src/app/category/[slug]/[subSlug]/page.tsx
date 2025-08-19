import { appRoutes } from "@/constant/routes";
import subCategoryService from "@/service/subCategoryService";
import SubCategoryPage from "./SubCategoryPage";
import productService from "@/service/productService";

export async function generateStaticParams() {
  const res = await subCategoryService.getSubCategories();
  const subCategories = res.subCategories;

  return subCategories.map((cat: any) => ({ slug: cat.slug }));
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const res = await productService.getProductsBySlug(slug, {});
  const productsData = res.docs;

  const subRes = await subCategoryService.getSubCategories();
  const subCategoriesData = subRes.subCategories;

  return (
    <SubCategoryPage
      slug={slug}
      initialProducts={productsData}
      initialSubCategories={subCategoriesData}
      link={appRoutes.category.link}
      persianTitle={appRoutes.category.persianTitle}
    />
  );
}
