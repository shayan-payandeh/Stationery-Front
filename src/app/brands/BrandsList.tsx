import { IBrandsGet } from "@/interface/brands";
import BrandCard from "./BrandCard";

function BrandsList({ brands }: { brands: IBrandsGet[] }) {
  return (
    <div
      id="brands-wrapper"
      className="grid w-full grid-cols-2 gap-10 rounded-md bg-light-100 px-8 py-8 sm:grid-cols-6 md:gap-7 md:px-6 lg:grid-cols-12 xl:grid-cols-10"
    >
      {brands?.map((brand) => <BrandCard key={brand._id} brand={brand} />)}
    </div>
  );
}

export default BrandsList;
