"use client";
import Loading from "@/component/Loading";
import AppBreadCrumb from "@/component/AppBreadCrumb";
import { appRoutes } from "@/constant/routes";
import { AppCtxt, ICartItems } from "@/context/Store";
import { ICartType } from "@/interface/cartType";
import productService from "@/service/productService";
import { useQueries } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import CartDetail from "./CartDetail";
import EmptyCart from "./EmptyCart";
import OrderSummary from "./OrderSummary";

function Page() {
  const [cartItems, setCartItems] = useState<ICartType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { link, persianTitle } = appRoutes.cart;
  const { state, dispatch } = useContext(AppCtxt);
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
    setIsLoading(currentIsLoading);
  }, [currentIsLoading]);

  useEffect(() => {
    if (currentIsSuccess && !currentIsLoading) {
      const cartProducts = res.map((item) => item.data.product);
      const editedCartProducts: ICartType[] = [];
      for (const element of cartProducts) {
        for (const item of items as ICartType[]) {
          if (element._id === item._id) {
            const obj: ICartType = { ...element, quantity: item.quantity };
            editedCartProducts.push(obj);
          }
        }
      }
      setCartItems(editedCartProducts);
    }
  }, [currentIsSuccess, currentIsLoading, state.cart?.cartItems, items]);

  const addToCartHandler = (id: string, number: number = 1) => {
    const item = state.cart?.cartItems.find((cartItem) => cartItem._id === id);
    const quantity = item!?.quantity + number;
    if (quantity === 0) {
      dispatch({
        type: "CART_REMOVE_ITEM",
        payload: { ...(item as ICartItems), quantity },
      });
    } else {
      dispatch({
        type: "CART_ADD_ITEM",
        payload: { ...(item as ICartItems), quantity },
      });
    }
  };

  const removeCartItemHandler = (id: string) => {
    const theItem = state.cart?.cartItems.find((item) => item._id === id);
    dispatch({
      type: "CART_REMOVE_ITEM",
      payload: { ...(theItem as ICartItems), quantity: 0 },
    });
    // setIsLoading(false);
  };

  const totalPrice = cartItems
    .map((item) => item.quantity * item.price)
    .reduce((total, num) => total + num, 0);
  const discountOnTotal =
    totalPrice > 500000 ? (totalPrice > 1000000 ? 10 : 5) : 0;
  const payablePrice = (totalPrice * (100 - discountOnTotal)) / 100;

  if (isLoading) return <Loading />;
  return (
    <section id="cart-container" className="flex-center w-full">
      <div className="responsive__wrapper flex flex-col justify-center gap-5 text-center">
        <AppBreadCrumb destinations={[{ title: persianTitle, link: link }]} />
        {state.cart && state.cart?.cartItems.length > 0 && (
          <div
            id="main-section"
            className="grid min-h-screen grid-cols-4 bg-white shadow-container"
          >
            <div id="cart-detail" className="col-span-4 w-full xl:col-span-3">
              <CartDetail
                cartItems={cartItems}
                addToCartHandler={addToCartHandler}
                removeCartItemHandler={removeCartItemHandler}
              />
            </div>
            <div
              id="order-summary"
              className="col-span-4 p-8 py-8 xl:col-span-1 xl:pl-8 xl:pr-4"
            >
              <OrderSummary
                discountOnTotal={discountOnTotal}
                payablePrice={payablePrice}
                totalPrice={totalPrice}
              />
            </div>
          </div>
        )}
        {state.cart?.cartItems.length === 0 && <EmptyCart />}
      </div>
    </section>
  );
}

export default Page;
