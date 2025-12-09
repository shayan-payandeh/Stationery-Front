"use client";
import AppBreadCrumb from "@/component/AppBreadCrumb";
import Loading from "@/component/Loading";
import { appRoutes } from "@/constant/routes";
import { useCartStore } from "@/hook/useCartStore";
import { useAddOrder } from "@/hook/useOrders";
import { ICartType } from "@/interface/cartType";
import { IOrderPost } from "@/interface/order";
import { IShippingAddress } from "@/interface/shippingAddress";
import productService from "@/service/productService";
import { useQueries } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import OrderSummaryCheck from "./OrderSummaryCheck";
import ShippingAddressForm from "./ShippingAddressForm";

function PayPage() {
  const cartItems = useCartStore((state) => state.cartItems);
  const { persianTitle, link } = appRoutes.payment;
  const router = useRouter();
  const token = getCookie("accessToken");
  const [isLoading, setIsLoading] = useState(true);
  const { mutateAsync } = useAddOrder();
  const [cartItemsDetailed, setCartItemsDetailed] = useState<ICartType[]>([]);

  const res = useQueries({
    queries: cartItems!?.map((item) => ({
      queryKey: ["get-productByID", item._id],
      queryFn: () => productService.getProductById(item._id),
      retry: false,
      refetchOnWindowFocus: true,
    })),
  });
  const truthyArray = res.map((item) => item.isLoading);
  const currentIsLoading =
    truthyArray.length > 0 ? truthyArray.every((item) => item) : false;
  const successArray = res.map((item) => item.isSuccess);
  const currentIsSuccess = successArray.every((item) => item);

  useEffect(() => {
    if (!token) {
      router.push(`${link}?page=${appRoutes.payment.link}`);
    }
  }, [router, token, link]);

  useEffect(() => {
    setIsLoading(currentIsLoading);
  }, [currentIsLoading]);

  useEffect(() => {
    if (currentIsSuccess && !currentIsLoading) {
      const cartProducts = res.map((item) => item.data["product"]);
      const editedCartProducts: ICartType[] = [];
      for (const element of cartProducts) {
        for (const item of cartItems as ICartType[]) {
          if (element._id === item._id) {
            const obj: ICartType = {
              ...element,
              quantity: item.quantity,
            };
            editedCartProducts.push(obj);
          }
        }
      }
      setCartItemsDetailed(editedCartProducts);
    }
  }, [currentIsSuccess, currentIsLoading, cartItems]);

  const totalPrice = cartItemsDetailed
    .map((item) => item.quantity * item.price)
    .reduce((total, num) => total + num, 0);
  const discountOnTotal =
    totalPrice > 500000 ? (totalPrice > 1000000 ? 10 : 5) : 0;
  const totalPriceAfterDiscount = totalPrice * (1 - discountOnTotal / 100);
  const payablePriceWithoutDelievey =
    (totalPrice * (100 - discountOnTotal)) / 100;
  const delieveryCost = 70000;
  const payablePrice = payablePriceWithoutDelievey + delieveryCost;

  const submitHandler = async (theShippingAddress: IShippingAddress) => {
    try {
      const finalCartItems = cartItems?.map((item) => ({
        product: item._id,
        quantity: item.quantity,
      }));
      const theOrder: IOrderPost = {
        orderInfo: {
          orderItems: finalCartItems!,
          payInfo: {
            delieveryCost: delieveryCost,
            discount: discountOnTotal,
            paidPrice: payablePrice,
            totalPrice: totalPrice,
          },
          shippingAddress: {
            phoneNumber: theShippingAddress.phoneNumber,
            firstName: theShippingAddress.firstName,
            lastName: theShippingAddress.lastName,
            address: theShippingAddress.address,
            province: theShippingAddress.province,
            city: theShippingAddress.city,
            postalcode: theShippingAddress.postalcode,
          },
        },
      };
      await mutateAsync(theOrder);
    } catch (error) {
      toast.error("خطا در ثبت سفارش");
    }
  };

  if (isLoading) return <Loading />;
  return (
    <section id="cart-container" className="flex-center w-full">
      <div className="responsive__wrapper flex flex-col justify-center gap-5 text-center">
        <AppBreadCrumb destinations={[{ title: persianTitle, link: link }]} />
        <div
          id="delievery-checkout-container"
          className="flex min-h-screen flex-col gap-y-20 bg-white p-8 shadow-container"
        >
          <div id="order-check-container">
            <OrderSummaryCheck
              cartItems={cartItemsDetailed}
              delieveryCost={delieveryCost}
              discountOnTotal={(discountOnTotal * totalPrice) / 100}
              payablePrice={payablePrice}
              totalPriceAfterDiscount={totalPriceAfterDiscount}
            />
          </div>

          <div id="delievery-container">
            <ShippingAddressForm submitHandler={submitHandler} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Page() {
  return <PayPage />;
}
