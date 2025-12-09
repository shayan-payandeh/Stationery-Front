"use client";

import { Dispatch, SetStateAction } from "react";
import Header from "./Header";


type HeaderWithStoreProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
};

function HeaderWithStore({ setOpen, isOpen }: HeaderWithStoreProps) {
  return <Header setOpen={setOpen} isOpen={isOpen} />;
}

export default HeaderWithStore;