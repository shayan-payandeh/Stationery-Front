function ProductsSliderSkeleton() {
  return (
    <div className="relative overflow-x-hidden px-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="flex justify-center"
          >
            <div className="w-full max-w-[250px] animate-pulse rounded-lg border border-[#f0f0f1] bg-white pb-1 shadow-sm lg:max-w-[260px]">
              <div className="mx-auto h-[210px] w-[230px] bg-gray-200 p-3">
                <div className="h-full w-full rounded bg-gray-300"></div>
              </div>
              <div className="w-full border border-light-300"></div>
              <div className="px-2 py-[5px]">
                <div className="h-3 w-16 rounded bg-gray-300"></div>
              </div>
              <div className="px-2">
                <div className="h-4 w-32 rounded bg-gray-300"></div>
              </div>
              <div className="px-2 py-1">
                <div className="h-4 w-20 rounded bg-gray-300"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="absolute right-2 top-1/2 z-10 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-gray-300 md:right-0"></div>
      <div className="absolute left-2 top-1/2 z-10 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-gray-300 md:left-0"></div>
    </div>
  );
}

export default ProductsSliderSkeleton;