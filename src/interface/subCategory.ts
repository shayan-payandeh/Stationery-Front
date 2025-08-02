// export interface ISubCategory {
//   id: string;
//   title: string;
//   persianTitle: string;
//   categoryId: number;
//   filterItem: { title: string; persianTitle: string; values: any[] }[];
//   image: string;
//   slug: string;
// }
export interface ISubCategoryGet {
  _id: string;
  title: string;
  persianTitle: string;
  category: string;
  filterItems: { title: string; persianTitle: string; values: [] }[];
  image: string;
  slug: string;
}
export interface ISubCategoryPost {
  title: string;
  persianTitle: string;
  category: string;
  filterItems: { title: string; persianTitle: string; values: [] }[];
  image: string;
  slug: string;
}
