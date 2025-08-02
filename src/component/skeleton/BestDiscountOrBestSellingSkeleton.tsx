import React, { useState, useEffect } from "react";

function BestDiscountOrBestSellingSkeleton() {
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    const updateItemCount = () => {
      const width = window.innerWidth;
      if (width >= 1280)
        setItemCount(4); // xl: 8 items
      else if (width >= 1024)
        setItemCount(3); // lg: 6 items
      else if (width >= 768)
        setItemCount(2); // sm: 6 items
      else setItemCount(1); // mobile: 2 items
    };

    updateItemCount();
    window.addEventListener("resize", updateItemCount);
    return () => window.removeEventListener("resize", updateItemCount);
  }, []);

  return (
    <div className="grid w-full grid-cols-2 place-items-center gap-10 rounded-md sm:grid-cols-2 md:grid-cols-4 md:gap-7 md:px-6 lg:grid-cols-6 xl:grid-cols-8">
      {Array.from({ length: itemCount }).map((_, index) => (
        <div
          key={index}
          className="col-span-2 w-full max-w-[230px] animate-pulse rounded-lg border p-2 md:col-span-2"
        >
          <div className="mb-4 h-52 rounded bg-gray-300"></div>
          <div className="mb-2 h-4 w-1/6 rounded bg-gray-300"></div>
          <div className="mb-2 h-4 w-3/4 rounded bg-gray-300"></div>
          <div className="h-5 w-1/3 rounded bg-gray-300"></div>
        </div>
      ))}
    </div>
  );
}

export default BestDiscountOrBestSellingSkeleton;
