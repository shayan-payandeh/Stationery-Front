import AppBreadCrumb from "@/component/AppBreadCrumb";
import ErrorFallback from "@/component/ErrorFallback";
import { appRoutes } from "@/constant/routes";
import { IProduct, IProductsGet } from "@/interface/products";
import http from "@/service/http";
import productService from "@/service/productService";
import { generateRandomArr } from "@/utils/randomGenerator";
import { Metadata } from "next";
import "react-image-gallery/styles/css/image-gallery.css";
import AddToCartCard from "./AddToCartCard";
import CommentSection from "./CommentSection/page";
import ImageGallery from "./ImageGallery";
import ProductInformation from "./ProductInformation";
import dynamic from "next/dynamic";
import ProductsSliderSkeleton from "@/component/ProductsSliderSkeleton";

const ProductsSlider = dynamic(() => import("@/component/ProductsSlider"), {
  ssr: false,
  loading: () => <ProductsSliderSkeleton />,
});

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { id } = params;
    const product = await http
      .get(`/product/product/${id}`)
      .then(({ data }) => data.data.product);
    if (!product) return { title: "محصول یافت نشد" };

    return {
      title: product.name,
      description: product.description.persianTitle,
      alternates: {
        canonical: `https://shayan-negaresh.shop/products/${id}`,
      },
    };
  } catch {
    return { title: "خطا در بارگذاری محصول" };
  }
}

export async function generateStaticParams() {
  try {
    const result = await productService.getProducts({});
    const { docs: products } = result.products ?? { docs: [] };
    return products.map((product) => ({
      id: product._id,
    }));
  } catch (error) {
    return [];
  }
}

async function Page({ params }: Props) {
  const { id } = params;

  const { link, persianTitle } = appRoutes.products;
  const product = await productService.getServerProductById(id);
  if (!product) {
    return <ErrorFallback message="خطا در بارگذاری محصول" />;
  }
  const slug: string = product?.category.persianTitle.replaceAll(" ", "-");

  const theProducts = await http
    .get<IProduct>(`/product/${slug}`)
    .then(({ data }) => data.data.products)
    .catch(() => null);

  const relatedProducts = theProducts?.docs || [];
  const limitedRelatedProducts: IProductsGet[] = [];

  if (relatedProducts.length > 5) {
    const randoms = generateRandomArr(5, relatedProducts.length, 0);
    randoms.forEach(
      (i) =>
        relatedProducts[i] && limitedRelatedProducts.push(relatedProducts[i]),
    );
  }

  const images = product.images.map((el) => ({
    original: el.src,
    thumbnail: el.src,
  }));

  // ✅ JSON-LD Schema

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description.persianTitle,
    image: product.images.map((img) => img.src),
    sku: product._id,
    brand: {
      "@type": "Brand",
      name: product.brand || "نوشت افزار شایان نگارش",
    },
    offers: {
      "@type": "Offer",
      url: `https://shayan-negaresh.shop/products/${id}`,
      priceCurrency: "IRR",
      price: product.price,
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
    },
    aggregateRating: product.rating
      ? {
          "@type": "AggregateRating",
          ratingValue: product.rating,
          reviewCount: product.reviewCount || 0,
        }
      : undefined,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "محصولات",
        item: "https://shayan-negaresh.shop/products",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: product.name,
        item: `https://shayan-negaresh.shop/products/${id}`,
      },
    ],
  };

  return (
    <>
      <section id="product-detail-container" className="flex-center w-full">
        <div className="responsive__wrapper flex flex-col justify-center gap-5 text-center">
          <AppBreadCrumb
            destinations={[
              { title: persianTitle, link: link },
              { title: product.name, link: `${link}/${product._id}` },
            ]}
          />
          <div className="px-6 md:px-0 lg:px-0 [&>*]:bg-white">
            <div className="grid min-h-96 grid-cols-7 gap-y-10 px-2 py-3">
              <div className="col-span-7 lg:col-span-3 xl:col-span-2">
                <ImageGallery images={images} />
              </div>
              <div className="col-span-7 lg:col-span-4 xl:col-span-3">
                <ProductInformation product={product} />
              </div>
              <div className="col-span-7 py-6 xl:col-span-2">
                <AddToCartCard product={product} />
              </div>
            </div>

            {limitedRelatedProducts.length > 0 && (
              <div className="flex flex-col gap-6 px-2 py-6">
                <div className="text-start font-semibold">محصولات مرتبط</div>
                <ProductsSlider productsToShow={limitedRelatedProducts} />
              </div>
            )}

            <div className="flex flex-col gap-y-6 px-2 py-4">
              <CommentSection />
            </div>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}

export default Page;
