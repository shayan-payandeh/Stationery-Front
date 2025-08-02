import vazirFont, { mikhakFont, morvaridFont } from "@/constant/localFonts";
import { StoreProvider } from "@/context/Store";
import { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Providers from "./Providers";
import MainUI from "./MainUI";

export const metadata: Metadata = {
  title: "نوشت افزار شایان نگارش",
  description: "عرضه کننده نوشت افزارهای ایرانی و خارجی",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="rtl">
      <body
        className={` ${vazirFont.variable} ${morvaridFont.variable} ${mikhakFont.variable} bg-light-200 font-sans`}
      >
        <Providers>
          <StoreProvider>
            <Toaster />
            <MainUI>{children}</MainUI>
          </StoreProvider>
        </Providers>
      </body>
    </html>
  );
}
