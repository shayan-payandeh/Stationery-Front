"use client";
import Footer from "@/component/footer/Footer";
import Header from "@/component/header/Header";
import { useState } from "react";

function MainUI({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`${open ? "overflow-y-hidden" : ""}`}>
      <Header setOpen={setOpen} isOpen={open} />
      <div className="min-h-[500px] pt-8 md:py-7">{children}</div>
      <Footer />
    </div>
  );
}

export default MainUI;
