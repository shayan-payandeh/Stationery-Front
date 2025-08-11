import AppBreadCrumb from "@/component/AppBreadCrumb";
import ProductsSlider from "@/component/ProductsSlider";
import { appRoutes } from "@/constant/routes";
import { IProduct, IProductsGet } from "@/interface/products";
import http from "@/service/http";
import { generateRandomArr } from "@/utils/randomGenerator";
import { Metadata } from "next";
import "react-image-gallery/styles/css/image-gallery.css";
import AddToCartCard from "./AddToCartCard";
import CommentSection from "./CommentSection/page";
import ImageGallery from "./ImageGallery";
import ProductInformation from "./ProductInformation";
import Loading from "@/component/Loading";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = (await params).id;
  const product = await http
    .get(`/product/product/${id}`)
    .then(({ data }) => data.data.product);

  return {
    title: product.name,
    description: product.description.persianTitle,
  };
}

export async function generateStaticParams() {
  const products = await http
    .get<IProduct>("/product/list")
    .then(({ data }) => data.data.products.docs);
  return products.map((product) => ({
    id: product._id,
  }));
}

async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await http
    .get(`/product/product/${id}`)
    .then(({ data }) => data.data.product);
  const { link, persianTitle } = appRoutes.products;
  // const { id } = useParams();
  // const { data, isLoading } = useGetProductById(id as string);
  // const { product } = data || {};
  const slug: string = product?.category.persianTitle.replaceAll(" ", "-");
  // const enabled = slug ? true : false;
  // const { data: theProducts } = useGetProductsBySlug(slug, {}, enabled);
  const theProducts = await http
    .get<IProduct>(`/product/${slug}`)
    .then(({ data }) => data.data.products);
  const relatedProducts = theProducts?.docs;
  const limitedRelatedProducts: IProductsGet[] = [];
  const images: { original: string; thumbnail: string }[] = [];
  if (product)
    for (const element of product?.images) {
      const image = { original: element?.src, thumbnail: element?.src };
      images.push(image);
    }

  let ArrayOfRandomNumber: number[] = [];
  if (relatedProducts && relatedProducts.length > 5)
    ArrayOfRandomNumber = generateRandomArr(5, relatedProducts!.length, 0);

  ArrayOfRandomNumber.forEach((random) => {
    if (relatedProducts![random]) {
      limitedRelatedProducts.push(relatedProducts![random]);
    }
  });

  if (!product) return <Loading />;
  return (
    <section id="product-detail-container" className="flex-center w-full">
      <div className="responsive__wrapper flex flex-col justify-center gap-5 text-center">
        <AppBreadCrumb destinations={[{ title: persianTitle, link: link }]} />
        <div className="px-6 md:px-0 lg:px-0 [&>*]:bg-white">
          <div
            id="main-section"
            className="grid min-h-96 grid-cols-7 gap-y-10 px-2 py-3"
          >
            {product && (
              <div
                className="col-span-7 lg:col-span-3 xl:col-span-2"
                id="photos-wrapper"
              >
                <ImageGallery images={images} />
              </div>
            )}
            <div
              className="col-span-7 lg:col-span-4 xl:col-span-3"
              id="info-wrapper"
            >
              <ProductInformation product={product} />
            </div>
            <div className="col-span-7 py-6 xl:col-span-2" id="shop-wrapper">
              <AddToCartCard product={product} />
            </div>
          </div>
          <div
            id="similar-products-wrapper"
            className="flex min-h-10 flex-col gap-6 px-2 py-6"
          >
            <div className="text-start font-semibold">
              <span>محصولات مرتبط</span>
            </div>

            <ProductsSlider productsToShow={limitedRelatedProducts} />
          </div>
          <div
            id="comment-wrapper"
            className="flex min-h-10 flex-col gap-y-6 px-2 py-4"
          >
            <CommentSection />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Page;
