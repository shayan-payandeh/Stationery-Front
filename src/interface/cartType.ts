export interface ICartType {
  _id: string;
  name: string;
  category: {
    _id: string;
    title: string;
    persianTitle: string;
  };
  subCategory: {
    _id: string;
    title: string;
    persianTitle: string;
  };
  brand: {
    _id: string;
    title: string;
    persianTitle: string;
  };
  images: { src: string }[];
  discount: number;
  price: number;
  description: { title: string; persianTitle: string; value: string }[];
  count: number;
  quantity: number;
}
