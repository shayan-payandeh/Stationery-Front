import ScrollProgress from "@/component/animate/ScrollProgress";
import BestBrandSection from "@/component/home/BestBrandSection";
import BestDiscountSection from "@/component/home/BestDiscountSection";
import BestSellingProducts from "@/component/home/BestSellingProducts";
import Features from "@/component/home/Features";
import MainPageCards from "@/component/home/MainPageCards";
import SlideShow from "@/component/home/SlideShow";
import Slogan from "@/component/home/Slogan";
import productService from "@/service/productService";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

export default async function Home() {
  const { data } = await productService.getServerProducts("page=all");
  const products = data ? data.products.docs : [];
  return (
    <>
      <ScrollProgress />
      <section className="flex flex-col pb-10">
        <div>
          <SlideShow />
          <MainPageCards />
          <Features />
          <Slogan />
          <BestDiscountSection products={products} />
          <BestBrandSection products={products} />
          <BestSellingProducts products={products} />
        </div>
      </section>
    </>
  );
}
