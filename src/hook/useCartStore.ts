"use client";
import { create } from "zustand";
import Cookies from "js-cookie";

export interface ICartItems {
  quantity: number;
  _id: string;
  name: string;
  count: number;
}

export interface IShippingAddress {
  fullname: string;
  address: string;
  city: string;
  country: string;
  postalCode: number;
}

export interface ICartState {
  cartItems: ICartItems[];
  shippingAddress: IShippingAddress | {};
  addItem: (item: ICartItems) => void;
  removeItem: (id: string) => void;
  saveShippingAddress: (address: IShippingAddress) => void;
  clearCart: () => void;
}

const items = Cookies.get("cartItems");
const initialItems: ICartItems[] =
  items && typeof items === "string" ? JSON.parse(items) : [];
const address = Cookies.get("shippingAddress");
const initialAddress: IShippingAddress | {} =
  address && typeof address === "string" ? JSON.parse(address) : {};

export const useCartStore = create<ICartState>((set, get) => ({
  cartItems: initialItems,
  shippingAddress: initialAddress,
  addItem: (newItem) => {
    const { cartItems } = get();
    const existItem = cartItems.find((item) => item._id === newItem._id);

    let updatedItems;
    if (existItem) {
      updatedItems = cartItems.map((item) =>
        item._id === newItem._id ? newItem : item,
      );
    } else {
      updatedItems = [...cartItems, newItem];
    }

    Cookies.set("cartItems", JSON.stringify(updatedItems));
    set({ cartItems: updatedItems });
  },

  removeItem: (id) => {
    const { cartItems } = get();
    const updatedItems = cartItems.filter((item) => item._id !== id);
    Cookies.set("cartItems", JSON.stringify(updatedItems));
    set({ cartItems: updatedItems });
  },

  saveShippingAddress: (address) => {
    Cookies.set("shippingAddress", JSON.stringify(address));
    set({ shippingAddress: address });
  },

  clearCart: () => {
    Cookies.remove("cartItems");
    set({ cartItems: [] });
  },
}));
