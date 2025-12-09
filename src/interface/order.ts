import { IShippingAddress } from "./shippingAddress";

export interface IOrderPost {
  orderInfo: {
    orderItems: { product: string; quantity: number }[];
    shippingAddress: IShippingAddress;
    payInfo: {
      totalPrice: number;
      delieveryCost: number;
      discount: number;
      paidPrice: number;
    };
  };
}
