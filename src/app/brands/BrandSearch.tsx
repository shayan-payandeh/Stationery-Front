import SearchBox from "@/common/SearchBox";
import { ChangeEvent } from "react";

function BrandSearch({ searchTextHandler, inputValue }) {
  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    searchTextHandler(e.target.value);
  };
  return (
    <SearchBox
      onSearch={onSearch}
      placeholderText={"جستجوی عنوان برند ..."}
      inputValue={inputValue}
    />
  );
}

export default BrandSearch;
