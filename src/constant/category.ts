import penImage from "../../public/category/pen.png";
import pencilImage from "../../public/category/pencil.png";
import coloredPencilImage from "../../public/category/pencil-colored.png";
import eraserImage from "../../public/category/eraser.png";
import sharpenerImage from "../../public/category/sharpeener.png";
import nootbookeImage from "../../public/category/notebook.png";
import paperImage from "../../public/category/papers.png";
import pencilCaseImage from "../../public/category/pencil-case.png";
import rulerImage from "../../public/category/ruler.png";
import punchImage from "../../public/category/paper-punch.png";
import staplerImage from "../../public/category/stapler.png";
import binderImage from "../../public/category/binder.png";
import paperFileImage from "../../public/category/paper-file.png";
import bagImage from "../../public/category/bag.png";
import mechanicPencilImage from "../../public/category/mechanic-pencil.png";
import clipboardImage from "../../public/category/clipboard.png";
import { PiPencilLight } from "react-icons/pi";
import { SlNotebook } from "react-icons/sl";
import { TfiBag } from "react-icons/tfi";
import { FaStapler } from "react-icons/fa6";
import { brands } from "./brands";

export const categoriesIconSlug = [
  {
    id: 1,
    title: "writing-instrument",
    persianTitle: "نوشت افزار",
    slug: "نوشت-افزار",
    Icon: PiPencilLight,
    // subCategories: [],
  },
  {
    id: 2,
    title: "papers-notebooks",
    persianTitle: "دفتر و کاغذ",
    slug: "دفتر-و-کاغذ",
    Icon: SlNotebook,
    // subCategories: [],
  },
  {
    id: 3,
    title: "student-stuff",
    persianTitle: "لوازم دانش‌ آموزی",
    slug: "لوازم-دانش-آموزی",
    Icon: TfiBag,
    // subCategories: [],
  },
  {
    id: 4,
    title: "office-stuff",
    persianTitle: "لوازم اداری",
    slug: "لوازم-اداری",
    Icon: FaStapler,
    // subCategories: [],
  },
];

export const subCatgories = [
  {
    id: "1a",
    title: "pen",
    persianTitle: "خودکار",
    categoryId: 1,
    filterItem: [
      {
        title: "brand",
        persianTitle: "برند",
        values: brands.filter((brand) => brand.usecase.includes("خودکار")),
      },
      {
        title: "thickness",
        persianTitle: "ضخامت نوک",
        values: [
          { id: 1, title: "0.7 میلی متر" },
          { id: 2, title: "0.5 میلی متر" },
        ],
      },
    ],
    image: penImage.src,
    slug: "خودکار",
  },
  {
    id: "1b",
    title: "pencil",
    persianTitle: "مداد",
    categoryId: 1,
    filterItem: [
      {
        title: "brand",
        persianTitle: "برند",
        values: brands.filter((brand) => brand.usecase.includes("مداد")),
      },
      // {
      //   title: "thickness",
      //   persianTitle: "ضخامت نوک",
      //   values: [
      //     { id: 1, title: "" },
      //     { id: 2, title: "" },
      //   ],
      // },
    ],
    image: pencilImage.src,
    slug: "مداد",
  },
  {
    id: "1c",
    title: "colored-pencil",
    persianTitle: "مداد رنگی",
    categoryId: 1,
    filterItem: [
      {
        title: "brand",
        persianTitle: "برند",
        values: brands.filter((brand) => brand.usecase.includes("مداد رنگی")),
      },
      // {
      //   title: "thickness",
      //   persianTitle: "ضخامت نوک",
      //   values: [
      //     { id: 1, title: "" },
      //     { id: 2, title: "" },
      //   ],
      // },
      {
        title: "count",
        persianTitle: "تعداد",
        values: [
          { id: 1, title: "۱۲ تایی" },
          { id: 2, title: "۲۴ تایی" },
        ],
      },
    ],
    image: coloredPencilImage.src,
    slug: "مداد-رنگی",
  },

  {
    id: "1d",
    title: "mechanical-pencil",
    persianTitle: "مداد نوکی",
    categoryId: 1,
    filterItem: [
      {
        title: "brand",
        persianTitle: "برند",
        values: brands.filter((brand) => brand.usecase.includes("مداد نوکی")),
      },
      {
        title: "thickness",
        persianTitle: "ضخامت نوک",
        values: [
          { id: 1, title: ".۷ میلی متر" },
          { id: 2, title: ".۵ ملی متر" },
        ],
      },
    ],
    image: mechanicPencilImage.src,
    slug: "مداد-نوکی",
  },
  {
    id: "1e",
    title: "eraser",
    persianTitle: "پاک کن",
    categoryId: 1,
    filterItem: [
      {
        title: "brand",
        persianTitle: "برند",
        values: brands.filter((brand) => brand.usecase.includes("پاک کن")),
      },
    ],
    image: eraserImage.src,
    slug: "پاک-کن",
  },
  {
    id: "1f",
    title: "pencil-sharpener",
    persianTitle: "تراش",
    categoryId: 1,
    filterItem: [
      {
        title: "brand",
        persianTitle: "برند",
        values: brands.filter((brand) => brand.usecase.includes("تراش")),
      },
    ],
    image: sharpenerImage.src,
    slug: "تراش",
  },

  //دفترو کاغذ//
  {
    id: "2a",
    title: "notebook",
    persianTitle: "دفتر",
    categoryId: 2,
    filterItem: [
      {
        title: "brand",
        persianTitle: "برند",
        values: brands.filter((brand) => brand.usecase.includes("دفتر")),
      },
      {
        title: "type",
        persianTitle: "نوع دفتر",
        values: [
          { id: 1, title: "مشق" },
          { id: 2, title: "یادداشت" },
          { id: 3, title: "نقاشی" },
          { id: 4, title: "زبان" },
        ],
      },
      {
        title: "paperCount",
        persianTitle: "تعداد برگ",
        values: [
          { id: 1, title: "۸۰ " },
          { id: 2, title: "۱۰۰ " },
        ],
      },
      {
        title: "bindingType",
        persianTitle: "نوع صحافی",
        values: [
          { id: 1, title: "سیمی" },
          { id: 2, title: "چسبی" },
        ],
      },
    ],
    image: nootbookeImage.src,
    slug: "دفتر",
  },
  {
    id: "2b",
    title: "paper",
    persianTitle: "کاغذ",
    categoryId: 2,
    filterItem: [
      {
        title: "brand",
        persianTitle: "برند",
        values: brands.filter((brand) => brand.usecase.includes("کاغذ")),
      },
      {
        title: "paperCount",
        persianTitle: "تعداد برگ",
        values: [
          { id: 1, title: "۱۰۰" },
          { id: 2, title: "۲۰۰" },
        ],
      },
    ],
    image: paperImage.src,
    slug: "کاغذ",
  },

  //لوازم دانش آموزی//
  {
    id: "3a",
    title: "bag",
    persianTitle: "کیف و کوله",
    categoryId: 3,
    filterItem: [
      {
        title: "brand",
        persianTitle: "برند",
        values: brands.filter((brand) => brand.usecase.includes("کیف و کوله")),
      },
    ],
    image: bagImage.src,
    slug: "کیف-و-کوله",
  },
  {
    id: "3b",
    title: "pencase",
    persianTitle: "جامدادی",
    categoryId: 3,
    filterItem: [
      {
        title: "brand",
        persianTitle: "برند",
        values: brands.filter((brand) => brand.usecase.includes("جامدادی")),
      },
    ],
    image: pencilCaseImage.src,
    slug: "جامدادی",
  },
  {
    id: "3c",
    title: "ruler",
    persianTitle: "خط کش",
    categoryId: 3,
    filterItem: [
      {
        title: "brand",
        persianTitle: "برند",
        values: brands.filter((brand) => brand.usecase.includes("خط کش")),
      },
    ],
    image: rulerImage.src,
    slug: "خط-کش",
  },
  {
    id: "3d",
    title: "clipboard",
    persianTitle: "تخته شاسی",
    categoryId: 3,
    filterItem: [
      {
        title: "brand",
        persianTitle: "برند",
        values: brands.filter((brand) => brand.usecase.includes("تخته شاسی")),
      },
    ],
    image: clipboardImage.src,
    slug: "تخته-شاسی",
  },

  //لوازم اداری//
  {
    id: "4a",
    title: "stapler",
    persianTitle: "منگنه",
    categoryId: 4,
    filterItem: [
      {
        title: "brand",
        persianTitle: "برند",
        values: brands.filter((brand) => brand.usecase.includes("منگنه")),
      },
    ],
    image: staplerImage.src,
    slug: "منگنه",
  },
  {
    id: "4b",
    title: "paper-punch",
    persianTitle: "پانچ",
    categoryId: 4,
    filterItem: [
      {
        title: "brand",
        persianTitle: "برند",
        values: brands.filter((brand) => brand.usecase.includes("پانچ")),
      },
    ],
    image: punchImage.src,
    slug: "پانچ",
  },
  {
    id: "4c",
    title: "binder",
    persianTitle: "زونکن",
    categoryId: 4,
    filterItem: [
      {
        title: "brand",
        persianTitle: "برند",
        values: brands.filter((brand) => brand.usecase.includes("زونکن")),
      },
    ],
    image: binderImage.src,
    slug: "زونکن",
  },
  {
    id: "4d",
    title: "paper-file",
    persianTitle: "پوشه",
    categoryId: 4,
    filterItem: [
      {
        title: "brand",
        persianTitle: "برند",
        values: brands.filter((brand) => brand.usecase.includes("پوشه")),
      },
      {
        title: "size",
        persianTitle: "سایز",
        values: [
          { id: 1, title: "A4" },
          { id: 1, title: "A5" },
        ],
      },
    ],
    image: paperFileImage.src,
    slug: "پوشه",
  },
];
