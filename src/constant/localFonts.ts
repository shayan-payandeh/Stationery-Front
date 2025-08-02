import LocalFont from "next/font/local";

const vazirFont = LocalFont({
  src: [
    {
      path: "../../public/vazir/Vazirmatn-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/vazir/Vazirmatn-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/vazir/Vazirmatn-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/vazir/Vazirmatn-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/vazir/Vazirmatn-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-vazir",
  style: "normal",
  display: "block",
});

export const mikhakFont = LocalFont({
  src: [
    {
      path: "../../public/mikhak/Mikhak.woff",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-mikhak",
  style: "normal",
  display: "block",
});

export const morvaridFont = LocalFont({
  src: [
    {
      path: "../../public/morvarid/BMorvarid.woff",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-morvarid",
  style: "normal",
  display: "block",
});

export default vazirFont;
