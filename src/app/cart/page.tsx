"use client";
import AppBreadCrumb from "@/component/AppBreadCrumb";
import Loading from "@/component/Loading";
import { appRoutes } from "@/constant/routes";
import { useCartStore } from "@/hook/useCartStore";
import { ICartType } from "@/interface/cartType";
import productService from "@/service/productService";
import { useQueries } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import CartDetail from "./CartDetail";
import EmptyCart from "./EmptyCart";
import OrderSummary from "./OrderSummary";

function CartPage() {
  const { cartItems, addItem, removeItem } = useCartStore((state) => state);
  const [cartItemsDetailed, setCartItemsDetailed] = useState<ICartType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { link, persianTitle } = appRoutes.cart;
  // const { state, dispatch } = useContext(AppCtxt);
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
    setIsLoading(currentIsLoading);
  }, [currentIsLoading]);
  useEffect(() => {
    if (currentIsSuccess && !currentIsLoading) {
      const cartProducts = res.map((item) => item.data.product);
      const editedCartProducts: ICartType[] = [];
      for (const element of cartProducts) {
        for (const item of cartItems as ICartType[]) {
          if (element._id === item._id) {
            const obj: ICartType = { ...element, quantity: item.quantity };
            editedCartProducts.push(obj);
          }
        }
      }
      setCartItemsDetailed(editedCartProducts);
    }
  }, [currentIsSuccess, currentIsLoading, cartItems]);

  const addToCartHandler = (id: string, number: number = 1) => {
    const item = cartItems.find((cartItem) => cartItem._id === id);
    const quantity = item!?.quantity + number;
    if (quantity === 0) {
      // dispatch({
      //   type: "CART_REMOVE_ITEM",
      //   payload: { ...(item as ICartItems), quantity },
      // });
      removeItem(item!?._id);
    } else {
      // dispatch({
      //   type: "CART_ADD_ITEM",
      //   payload: { ...(item as ICartItems), quantity },
      // });
      addItem({ ...item!, quantity });
    }
  };

  const removeCartItemHandler = (id: string) => {
    const theItem = cartItems.find((item) => item._id === id);
    removeItem(theItem!?._id);

    // dispatch({
    //   type: "CART_REMOVE_ITEM",
    //   payload: { ...(theItem as ICartItems), quantity: 0 },
    // });
    // setIsLoading(false);
  };

  const totalPrice = cartItemsDetailed
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
        {cartItems && cartItems.length > 0 && (
          <div
            id="main-section"
            className="grid min-h-screen grid-cols-4 bg-white shadow-container"
          >
            <div id="cart-detail" className="col-span-4 w-full xl:col-span-3">
              <CartDetail
                cartItems={cartItemsDetailed}
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
        {cartItems.length === 0 && <EmptyCart />}
      </div>
    </section>
  );
}

export default function Page() {
  return <CartPage />;
}
