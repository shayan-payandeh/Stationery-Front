export const dataDifference = (date) => {
  const currentDate = new Date().getTime();
  const theDate = new Date(date).getTime();
  let finalPersianText: string = "";
  let finalMessage:
    | "ثانیه"
    | "دقیقه"
    | "ساعت"
    | "روز"
    | "هفته"
    | "ماه"
    | "سال" = "ثانیه";

  const diff = currentDate - theDate;

  const base = 1000 * 60 * 60 * 24;
  const days = Math.floor(diff / base);

  const hours = Math.floor((currentDate - theDate) / 3600000);
  const minutes = Math.floor((currentDate - theDate) / 60000);
  const resNumber = hours > 0 ? hours : minutes > 0 ? minutes : 0;
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 31);
  const years = Math.floor(months / 12);

  const resultNumber =
    days === 0
      ? hours > 0
        ? hours
        : minutes > 0
          ? minutes
          : 0
      : days < 8
        ? days
        : days < 31
          ? weeks
          : days < 356
            ? months
            : years;

  finalMessage =
    days === 0
      ? hours > 0
        ? "ساعت"
        : minutes > 0
          ? "دقیقه"
          : "ثانیه"
      : days < 8
        ? "روز"
        : days < 31
          ? "هفته"
          : days < 356
            ? "ماه"
            : "سال";

  const numericValue = days > 0 ? resultNumber : resNumber;
  finalPersianText = numbers.find((item) => item.numericValue === numericValue)
    ?.persianTextValue as string;

  const finalResult: {
    numericValue: number | string;
    message: string;
    persianText: string;
  } = {
    numericValue: numericValue === 0 ? "چند" : numericValue,
    message: finalMessage,
    persianText: finalPersianText as string,
  };
  return finalResult;
};

const numbers = [
  { numericValue: 0, persianTextValue: "چند" },
  { numericValue: 1, persianTextValue: "یک" },
  { numericValue: 2, persianTextValue: "دو" },
  { numericValue: 3, persianTextValue: "سه" },
  { numericValue: 4, persianTextValue: "چهار" },
  { numericValue: 5, persianTextValue: "پنج" },
  { numericValue: 6, persianTextValue: "شش" },
  { numericValue: 7, persianTextValue: "هفت" },
  { numericValue: 8, persianTextValue: "هشت" },
  { numericValue: 9, persianTextValue: "نه" },
  { numericValue: 10, persianTextValue: "ده" },
  { numericValue: 11, persianTextValue: "یازده" },
  { numericValue: 12, persianTextValue: "دوازده" },
  { numericValue: 13, persianTextValue: "سیزده" },
  { numericValue: 14, persianTextValue: "چهارده" },
  { numericValue: 15, persianTextValue: "پانزده" },
  { numericValue: 16, persianTextValue: "شانزده" },
  { numericValue: 17, persianTextValue: "هفده" },
  { numericValue: 18, persianTextValue: "هجده" },
  { numericValue: 19, persianTextValue: "نوزده" },
  { numericValue: 20, persianTextValue: "بیست" },
  { numericValue: 21, persianTextValue: "بیست و یک" },
  { numericValue: 22, persianTextValue: "بیست و دو" },
  { numericValue: 23, persianTextValue: "بیست و سه" },
  { numericValue: 24, persianTextValue: "بیست و چهار" },
  { numericValue: 25, persianTextValue: "بیست و پنج" },
  { numericValue: 26, persianTextValue: "بیست و شش" },
  { numericValue: 27, persianTextValue: "بیست و هفت" },
  { numericValue: 28, persianTextValue: "بیست و هشت" },
  { numericValue: 29, persianTextValue: "بیست و نه" },
  { numericValue: 30, persianTextValue: "سی" },
  { numericValue: 31, persianTextValue: "سی و یک" },
  { numericValue: 32, persianTextValue: "سی و دو" },
  { numericValue: 33, persianTextValue: "سی و سه" },
  { numericValue: 34, persianTextValue: "سی و چهار" },
  { numericValue: 35, persianTextValue: "سی و پنج" },
  { numericValue: 36, persianTextValue: "سی و شش" },
  { numericValue: 37, persianTextValue: "سی و هفت" },
  { numericValue: 38, persianTextValue: "سی و هشت" },
  { numericValue: 39, persianTextValue: "سی و نه" },
  { numericValue: 40, persianTextValue: "چهل" },
  { numericValue: 41, persianTextValue: "چهل و یک" },
  { numericValue: 42, persianTextValue: "چهل و دو" },
  { numericValue: 43, persianTextValue: "چهل و سه" },
  { numericValue: 44, persianTextValue: "چهل و چهار" },
  { numericValue: 45, persianTextValue: "چهل و پنج" },
  { numericValue: 46, persianTextValue: "چهل و شش" },
  { numericValue: 47, persianTextValue: "چهل و هفت" },
  { numericValue: 48, persianTextValue: "چهل و هشت" },
  { numericValue: 49, persianTextValue: "چهل و نه" },
  { numericValue: 50, persianTextValue: "پنجاه" },
  { numericValue: 51, persianTextValue: "پنجاه و یک" },
  { numericValue: 52, persianTextValue: "پنجاه و دو" },
  { numericValue: 53, persianTextValue: "پنجاه و سه" },
  { numericValue: 54, persianTextValue: "پنجاه و چهار" },
  { numericValue: 55, persianTextValue: "پنجاه و پنج" },
  { numericValue: 56, persianTextValue: "پنجاه و شش" },
  { numericValue: 57, persianTextValue: "پنجاه و هفت" },
  { numericValue: 58, persianTextValue: "پنجاه و هشت" },
  { numericValue: 59, persianTextValue: "پنجاه و نه" },
];
