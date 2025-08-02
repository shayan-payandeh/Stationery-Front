function MainCategoryProductsSection() {
  return (
    <div className="grid w-full grid-cols-2 gap-4 bg-white p-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 xl:grid-cols-10">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="col-span-2 w-full max-w-[280px] animate-pulse rounded-lg border p-4 lg:col-span-3 xl:col-span-2"
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
export default MainCategoryProductsSection;
