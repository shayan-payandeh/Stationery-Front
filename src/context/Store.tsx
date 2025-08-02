"use client";
import { ICartType } from "@/interface/cartType";
import { QueryType } from "@/type/query";
import Cookies from "js-cookie";
import { createContext, Reducer, useReducer } from "react";

export interface ICartItems {
  quantity: number;
  _id: string;
  name: string;
  // category: {
  //   _id: string;
  //   title: string;
  //   persianTitle: string;
  // };
  // subCategory: {
  //   _id: string;
  //   title: string;
  //   persianTitle: string;
  // };
  // brand: {
  //   _id: string;
  //   title: string;
  //   persianTitle: string;
  // };
  // images: { src: string }[];
  // discount: number;
  // price: number;
  // description: { title: string; persianTitle: string; value: string }[];
  count: number;
}

export interface IShippingAddress {
  fullname: string;
  address: string;
  city: string;
  country: string;
  postalCode: number;
}

export interface ICart {
  cartItems: ICartItems[];
  shippingAddress: IShippingAddress;
}

interface IState {
  cart: ICart;
}

interface IAction {
  type: string;
  payload: ICartItems | IShippingAddress | ICartType | QueryType;
}

interface IStateContext {
  state: Partial<IState>;
  dispatch: React.Dispatch<IAction>;
}

export const AppCtxt = createContext<IStateContext>({} as IStateContext);

const items = Cookies.get("cartItems");
const cartItems: ICartItems[] =
  items && typeof items === "string" ? JSON.parse(items) : [];

const address = Cookies.get("shippingAddress");
const shippingAddress: IShippingAddress =
  address && typeof address === "string" ? JSON.parse(address) : {};

const initialState: IState = {
  cart: {
    cartItems: cartItems,
    shippingAddress: shippingAddress,
  },
};

function reducer(state: IState, action: IAction): IState {
  switch (action.type) {
    case "CART_ADD_ITEM": {
      let newItem: ICartItems;
      let cartItems: ICartItems[] = [];
      if (action.payload) {
        newItem = action.payload as ICartItems;
        const existItem: ICartItems = state?.cart?.cartItems?.find(
          (item) => item._id === newItem._id,
        ) as ICartItems;
        if (existItem) {
          cartItems = state.cart.cartItems?.map((item) =>
            item._id === existItem._id ? newItem : item,
          );
        } else if (!existItem) {
          if (typeof state.cart.cartItems !== "undefined")
            cartItems = [...state.cart.cartItems, newItem];
        }
      }
      Cookies.set("cartItems", JSON.stringify(cartItems));
      return { cart: { ...state.cart, cartItems } };
    }

    case "CART_REMOVE_ITEM": {
      let cartItems: ICartItems[] = [];
      let removeItem: ICartItems;
      if (typeof action.payload === "object") {
        removeItem = action.payload as ICartItems;
        cartItems = state?.cart?.cartItems?.filter(
          (item) => item._id !== removeItem._id,
        );
      }
      Cookies.set("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }

    case "SAVE_SHIPPING_ADDRESS": {
      let thePayload: string;
      if (typeof action.payload === "object") {
        thePayload = JSON.stringify(action.payload);
        Cookies.set("shippingAddress", thePayload);
        return {
          ...state,
          cart: {
            ...state.cart,
            shippingAddress: action.payload as IShippingAddress,
          },
        };
      }
    }

    case "CART_CLEAR": {
      Cookies.remove("cartItems");
      return { ...state, cart: { ...state.cart, cartItems: [] } };
    }

    default:
      return state;
  }
}

export const StoreProvider = ({ children }: { children: any }) => {
  const [state, dispatch] = useReducer<Reducer<IState, IAction>>(
    reducer,
    initialState,
  );
  const value = { state, dispatch };
  return <AppCtxt.Provider value={value}>{children}</AppCtxt.Provider>;
};
