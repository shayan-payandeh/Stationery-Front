export interface IOrderPost {
  orderInfo: {
    orderItems: { product: string; quantity: number }[];
    shippingAddress: {
      firstName: string;
      lastName: string;
      phoneNumber: string;
      province: string;
      city: string;
      postalcode: string;
      address: string;
    };
    payInfo: {
      totalPrice: number;
      delieveryCost: number;
      discount: number;
      paidPrice: number;
    };
  };
}
