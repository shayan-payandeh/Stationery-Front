import { toPersianNumbers } from "@/utils/toPersianNumbers";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

function BrandTitle({ BrandsCount }: { BrandsCount: number }) {
  return (
    <>
      <HiOutlineMenuAlt3 className="text-[18px] text-primary-500" />
      <h2 className="text-title font-semibold text-dark-500">
        برندها :
        <span className={`text-listItem text-primary-500`}>
          <span> ( </span>
          {BrandsCount && <span>{toPersianNumbers(BrandsCount)}</span>}
          &nbsp;
          <span>برند یافت شد</span>
          <span> ) </span>
        </span>
      </h2>
    </>
  );
}

export default BrandTitle;
