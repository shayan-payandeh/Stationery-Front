import { useState } from "react";

const commentOrderType = [
  { title: "latest", persianTitle: "جدیدترین" },
  { title: "earliest", persianTitle: "قدیمی ترین" },
  { title: "controversial", persianTitle: "پربحث ترین ها" },
  { title: "popular", persianTitle: "محبوب ترین" },
];

function CommentSortSectionMobile({
  setCommentSortStatus,
  commentSortStatus,
  commentSortHandler,
}) {
  const [sortValue, setSortValue] = useState({
    title: "latest",
    persianTitle: "جدیدترین",
  });

  return (
    <div
      className={`fixed right-0 top-0 z-[65342] h-[100vh] py-2 ${commentSortStatus ? "fixed mt-0 opacity-100" : "mt-[1000px] opacity-0"} w-full transition-all duration-[1500ms]`}
    >
      <div
        onClick={() => setCommentSortStatus(false)}
        className={`h-[50%] w-full`}
      ></div>
      <div
        className={`bottom-0 right-0 z-[66661] w-full rounded-t-2xl bg-light-100 ${commentSortStatus ? "translate-y-0" : "translate-y-[100%]"} relative flex h-[65%] flex-col p-6 transition duration-300 ease-in-out`}
      >
        <div className="flex justify-between border-r-[3px] border-primary-500 px-2">
          <span className="text-[14px] font-semibold text-dark-700">
            ترتیب نمایش دیدگاه ها
          </span>
        </div>
        <div className="flex flex-col items-start gap-y-3 p-3 text-start">
          {commentOrderType.map((item) => (
            <div key={item.title} className="flex gap-x-1">
              <input
                className="flex justify-start accent-primary-500"
                type="radio"
                name="option"
                id={item.title}
                value={item.title}
                onClick={() => setSortValue(item)}
              />
              <label htmlFor={item.title} className="text-[13px]">
                {item.persianTitle}
              </label>
            </div>
          ))}
        </div>
        <div className="mb-3 mt-14 flex w-full gap-x-1">
          <button
            onClick={() => {
              commentSortHandler(sortValue);
              setCommentSortStatus(false);
            }}
            className="w-1/2 rounded-md bg-primary-500 px-3 py-2 text-[13px] text-light-100"
          >
            اعمال ترتیب جدید
          </button>
          <button
            onClick={() => setCommentSortStatus(false)}
            className="w-1/2 rounded-md border border-primary-500 px-3 py-2 text-[13px] text-primary-500"
          >
            بستن
          </button>
        </div>
      </div>
    </div>
  );
}

export default CommentSortSectionMobile;
