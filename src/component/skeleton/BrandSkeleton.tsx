import React from "react";

export function BrandSkeleton() {
  return (
    <div className="grid w-full grid-cols-2 place-items-center gap-10 rounded-md p-8 sm:grid-cols-6 md:gap-7 md:px-6 lg:grid-cols-12 xl:grid-cols-10">
      {Array.from({ length: 10 }).map((_, index) => (
        <div
          key={index}
          className="col-span-2 w-full max-w-[280px] animate-pulse rounded-lg border p-4 sm:col-span-3 md:col-span-2 lg:col-span-3 xl:col-span-2"
        >
          <div className="m-auto mb-4 h-[117px] w-[117px] rounded-full bg-gray-300 p-2"></div>
          <div className="m-auto mb-2 h-4 w-1/2 rounded bg-gray-300"></div>
        </div>
      ))}
    </div>
  );
}

export default function BestBrandSectionSkeleton() {
  return (
    <div id="bestBrands-wrapper" className="flex flex-col gap-1 px-4 py-12">
      <h1 className="text-center text-title font-semibold text-dark-500">
        برندهای برتر
      </h1>
      <BrandSkeleton />;
    </div>
  );
}
