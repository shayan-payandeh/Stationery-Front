"use client";
import Loading from "@/component/Loading";
import AppBreadCrumb from "@/component/AppBreadCrumb";
import { appRoutes } from "@/constant/routes";
import { AppCtxt } from "@/context/Store";
import { useAddOrder } from "@/hook/useOrders";
import { ICartType } from "@/interface/cartType";
import { IOrderPost } from "@/interface/order";
import productService from "@/service/productService";
import { useQueries } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import OrderSummaryCheck from "./OrderSummaryCheck";
import ShippingAddressForm from "./ShippingAddressForm";

function Page() {
  const { persianTitle, link } = appRoutes.payment;
  const router = useRouter();
  const token = getCookie("accessToken");
  const [isLoading, setIsLoading] = useState(true);
  const { mutateAsync } = useAddOrder();
  const [cartItems, setCartItems] = useState<ICartType[]>([]);
  const { state } = useContext(AppCtxt);
  const items = state.cart?.cartItems;
  const res = useQueries({
    queries: items!?.map((item) => ({
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
        for (const item of items as ICartType[]) {
          if (element._id === item._id) {
            const obj: ICartType = {
              ...element,
              quantity: item.quantity,
            };
            editedCartProducts.push(obj);
          }
        }
      }
      setCartItems(editedCartProducts);
    }
  }, [currentIsSuccess, currentIsLoading, items]);

  const totalPrice = cartItems
    .map((item) => item.quantity * item.price)
    .reduce((total, num) => total + num, 0);
  const discountOnTotal =
    totalPrice > 500000 ? (totalPrice > 1000000 ? 10 : 5) : 0;
  const totalPriceAfterDiscount = totalPrice * (1 - discountOnTotal / 100);
  const payablePriceWithoutDelievey =
    (totalPrice * (100 - discountOnTotal)) / 100;
  const delieveryCost = 70000;
  const payablePrice = payablePriceWithoutDelievey + delieveryCost;

  const submitHandler = async (theShippingAddress) => {
    try {
      const cartItems = items?.map((item) => ({
        product: item._id,
        quantity: item.quantity,
      }));
      const theOrder: IOrderPost = {
        orderInfo: {
          orderItems: cartItems!,
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
      const x = await mutateAsync(theOrder);
      console.log(x);
    } catch (error) {}
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
              cartItems={cartItems}
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

export default Page;
