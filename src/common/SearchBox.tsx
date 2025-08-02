import { ChangeEvent } from "react";
import { TbSearch } from "react-icons/tb";

type SearchBoxProps = {
  onSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholderText: string;
};

function SearchBox({ onSearch, placeholderText }: SearchBoxProps) {
  return (
    <>
      <div className="relative w-full text-center">
        <input
          id="searchBox"
          name="searchBox"
          type="text"
          onChange={onSearch}
          placeholder={placeholderText}
          className="peer w-full rounded-md bg-light-100 px-12 py-3 text-center text-[16px] shadow-container placeholder:text-center placeholder:text-light-500 focus:outline focus:outline-2 focus:outline-primary-500"
        />
        <TbSearch className="absolute right-0 top-0 mr-4 mt-3 text-[22px] font-black text-light-400 peer-focus:-scale-x-100 peer-focus:text-primary-500" />
      </div>
    </>
  );
}

export default SearchBox;
