"use client";
import { useState } from "react";
import Header from "./Header";

function HeaderWrapper() {
  const [open, setOpen] = useState(false);

  return (
    <div className={`${open ? "overflow-y-hidden" : ""}`}>
      <Header setOpen={setOpen} isOpen={open} />
    </div>
  );
}

export default HeaderWrapper;