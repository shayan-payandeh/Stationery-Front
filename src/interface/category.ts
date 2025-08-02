// export interface ICategory {
//   id: number;
//   title: string;
//   persianTitle: string;
//   slug: string;
//   Icon: IconType;
// }

export interface ICategoryGet {
  _id: string;
  title: string;
  persianTitle: string;
  slug: string;
}
export interface ICategoryPost {
  title: string;
  persianTitle: string;
  slug: string;
}
