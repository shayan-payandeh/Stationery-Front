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
  keywords: [
    "نوشت افزار",
    "شایان نگارش",
    "دفتر",
    "خودکار",
    "مداد",
    "لوازم التحریر",
    "لوازم التحریر شایان نگارش",
    "لوازم التحریر قیمت مناسب",
  ],

  openGraph: {
    title: "نوشت افزار شایان نگارش",
    description: "عرضه کننده نوشت افزارهای ایرانی و خارجی",
    url: "https://shayan-negaresh.shop",
  },

  alternates: {
    canonical: "https://shayan-negaresh.shop", // جلوگیری از محتوای تکراری
  },

  robots: {
    index: true,
    follow: true,
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "Store",
  name: "نوشت افزار شایان نگارش",
  url: "https://shayan-negaresh.shop",
  logo: "https://shayan-negaresh.shop/logo.png",
  sameAs: [
    "https://www.instagram.com/yourpage",
    "https://www.linkedin.com/in/shayan-payandeh-763794250",
  ],
  description: "عرضه کننده نوشت افزارهای ایرانی و خارجی",
  address: {
    "@type": "سورو قدیم سبلان ۲",
    streetAddress: "بلوار پاسداران سورو قدیم ",
    addressLocality: "بندرعباس",
    addressCountry: "ایران",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="rtl">
      <head>
        <script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
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
