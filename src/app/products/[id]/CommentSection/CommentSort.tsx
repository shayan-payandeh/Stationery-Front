import { useEffect, useRef, useState } from "react";
import { MdSort } from "react-icons/md";

export default function CommentSort({ commentOrder, commentSortHandler }) {
  const commentOrderType = [
    { title: "latest", persianTitle: "جدیدترین" },
    { title: "earliest", persianTitle: "قدیمی ترین" },
    { title: "controversial", persianTitle: "پربحث ترین ها" },
    { title: "popular", persianTitle: "محبوب ترین" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleCloseDropdown = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleCloseDropdown);
    return () => document.removeEventListener("mousedown", handleCloseDropdown);
  }, []);

  const handleSelect = (commentOrder) => {
    commentSortHandler(commentOrder);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative flex">
      <MdSort className="text-gray-500" />
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="inline-flex w-48 rounded-md px-3 text-xs text-gray-500 focus:outline-none"
      >
        {commentOrder.persianTitle}
      </button>

      <div
        className={`absolute z-10 mt-8 w-48 origin-top transform rounded-md border border-gray-200 bg-white shadow-lg transition-all duration-200 ${isOpen ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none -translate-y-2 scale-95 opacity-0"}`}
      >
        {commentOrderType.map((item) => (
          <button
            key={item.title}
            onClick={() => handleSelect(item)}
            className="w-full px-1 py-3 text-[12px] text-gray-700 hover:bg-gray-100"
          >
            {item.persianTitle}
          </button>
        ))}
      </div>
    </div>
  );
}
