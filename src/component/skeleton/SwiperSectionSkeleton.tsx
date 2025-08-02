function SwiperSectionSkeleton() {
  return (
    <div className="bg-light-100 px-6 py-5 shadow-container">
      <h2 className="text-listItem font-semibold text-dark-500">
        زیر دسته ها :
      </h2>
      <div className="mt-5 grid w-full grid-cols-2 place-items-center gap-4 py-1 sm:grid-cols-6 xl:grid-cols-12">
        {Array.from({ length: 1 }).map((_, index) => (
          <div
            key={index}
            className="col-span-2 w-full max-w-[150px] animate-pulse rounded-lg border px-4 py-3"
          >
            <div className="mb-2 h-[85px] rounded bg-gray-300"></div>
            <div className="mx-auto w-2/6 rounded bg-gray-300 p-1"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default SwiperSectionSkeleton;
