import React from "react";

function BrandPageSkeleton() {
  return (
    <div className="grid w-full grid-cols-2 place-items-center gap-10 rounded-md bg-light-100 p-8 sm:grid-cols-6 md:gap-7 md:px-6 lg:grid-cols-12 xl:grid-cols-10">
      {Array.from({ length: 14 }).map((_, index) => (
        <div
          key={index}
          className="col-span-2 w-full max-w-[280px] animate-pulse rounded-lg border p-4 sm:col-span-3 md:col-span-2 lg:col-span-3 xl:col-span-2"
        >
          <div className="m-auto mb-4 h-[85px] w-[85px] rounded-full bg-gray-300 p-2"></div>
          <div className="m-auto mb-2 h-4 w-1/4 rounded bg-gray-300"></div>
          <div className="m-auto mb-2 h-4 w-1/2 rounded bg-gray-300"></div>
        </div>
      ))}
    </div>
  );
}

export default BrandPageSkeleton;
