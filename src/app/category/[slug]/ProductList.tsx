import Card from "@/component/Card";
import { IProductsGet } from "@/interface/products";
import { ISubCategoryGet } from "@/interface/subCategory";

type ProductListProps = {
  productList: IProductsGet[];
  theSubCategory?: ISubCategoryGet;
};

function ProductList({ productList, theSubCategory }: ProductListProps) {
  return (
    <div
      id="products-list"
      className={`grid w-full grid-cols-2 place-items-center gap-x-2 gap-y-4 bg-white py-6 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 xl:grid-cols-10 ${theSubCategory ? "xl:max-w-[1150px] xl:grid-cols-12" : ""}`}
    >
      {productList.map((product) => (
        <div
          key={product._id}
          className={`col-span-2 lg:col-span-3 xl:col-span-2 ${theSubCategory ? "xl:col-span-3" : ""}`}
        >
          <Card product={product} />
        </div>
      ))}
    </div>
  );
}

export default ProductList;
