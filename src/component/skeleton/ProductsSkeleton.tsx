import React from "react";

export function ProductsSkeleton() {
  return (
    <div className="grid w-full max-w-[1150px] grid-cols-2 place-items-center gap-6 bg-white p-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-6 xl:grid-cols-8">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="col-span-2 w-full max-w-[280px] animate-pulse rounded-lg border p-4 md:col-span-2"
        >
          <div className="mb-4 h-48 rounded bg-gray-300"></div>
          <div className="mb-2 h-4 w-1/6 rounded bg-gray-300"></div>
          <div className="mb-2 h-4 w-3/4 rounded bg-gray-300"></div>
          <div className="h-6 w-1/3 rounded bg-gray-300"></div>
        </div>
      ))}
    </div>
  );
}

export default function ProductsSkeletonSection() {
  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <ProductsSkeleton />
    </div>
  );
}
