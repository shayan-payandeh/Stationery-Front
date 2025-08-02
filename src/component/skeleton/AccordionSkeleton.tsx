export const AccordionSkeleton = ({ count = 1 }) => {
  return (
    <div className="space-y-2">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-xl border border-gray-200 bg-white px-5 py-5"
        >
          <div className="flex items-center justify-between">
            <div className="h-4 w-1/6 rounded bg-gray-300"></div>
            <div className="h-4 w-4 rounded bg-gray-300"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default function AccordionSkeletonSection() {
  return (
    <div
      id="filter-section-wrapper"
      className="hidden min-h-screen py-[1px] lg:col-span-3 lg:block xl:col-span-2"
    >
      <AccordionSkeleton />
    </div>
  );
}
