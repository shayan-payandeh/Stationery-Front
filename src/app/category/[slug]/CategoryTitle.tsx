import { ICategoryGet } from "@/interface/category";
import { IconType } from "react-icons";

type CategoryTitleProps = {
  Icon: IconType;
  theCategory: ICategoryGet;
};

function CategoryTitle({ Icon, theCategory }: CategoryTitleProps) {
  return (
    <div className="flex gap-4">
      {Icon && <Icon className="text-[30px] text-primary-500" />}
      <span className="text-title font-semibold text-dark-500">
        {theCategory?.persianTitle}
      </span>
    </div>
  );
}

export default CategoryTitle;
