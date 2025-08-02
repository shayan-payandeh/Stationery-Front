import { IoIosArrowBack } from "react-icons/io";

function ViewButton() {
  return (
    <button className="text-light-100 flex items-center justify-center gap-[3px] rounded-full !bg-gray-600 px-[5px] py-[5px] text-[7.5px] sm:text-[9.5px] lg:text-[11px]">
      <h4 className="mr-1">مشاهده</h4>
      <IoIosArrowBack className="text-xs text-primary-500 md:text-[13px] lg:text-sm" />
    </button>
  );
}

export default ViewButton;
