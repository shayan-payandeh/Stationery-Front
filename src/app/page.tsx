import ScrollPrgress from "@/component/animate/ScrollPrgress";
import BestBrandSection from "@/component/home/BestBrandSection";
import BestDiscountSection from "@/component/home/BestDiscountSection";
import BestSellingProducts from "@/component/home/BestSellingProducts";
import Feaures from "@/component/home/Feaures";
import MainPageCards from "@/component/home/MainPageCards";
import SlideShow from "@/component/home/SlideShow";
import Slogan from "@/component/home/Slogan";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
export default function Home() {
  return (
    <>
      <ScrollPrgress />
      <section className="flex flex-col pb-10">
        <div>
          <SlideShow />
          <MainPageCards />
          <Feaures />
          <Slogan />
          <BestDiscountSection />
          <BestBrandSection />
          <BestSellingProducts />
        </div>
      </section>
    </>
  );
}
