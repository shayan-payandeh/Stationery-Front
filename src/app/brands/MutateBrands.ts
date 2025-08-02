"use server";

import brandService from "@/service/brandService";

export async function mutateBrands(userSearhText?: string) {
  const { brands } = await brandService.getBrands();
  //fetch data
  const filteredBrands = userSearhText
    ? brands.filter((brand) => brand.persianTitle.includes(userSearhText))
    : brands;
  console.log(filteredBrands);
  return filteredBrands;
  //filter data (brands) based on user search
  // return brands
}
