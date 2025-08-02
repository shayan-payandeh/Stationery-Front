"use client";
import Loading from "@/component/Loading";
import { useGetProfile } from "@/hook/useAuth";
import {
  useGetCommentByProduct,
  useGetMyCommentByProduct,
} from "@/hook/useComment";
import { ICommentGet } from "@/interface/comment";
import { toPersianNumbers } from "@/utils/toPersianNumbers";
import { getCookie } from "cookies-next";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa6";
import { GrSort } from "react-icons/gr";
import { LiaComment } from "react-icons/lia";
import { MdOutlineCommentsDisabled } from "react-icons/md";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import AddComment from "./AddComment";
import CommenList from "./CommenList";
import CommentFilterSectionMobile from "./CommentFilterSectionMobile";
import CommentSort from "./CommentSort";
import CommentSortSectionMobile from "./CommentSortSectionMobile";

const tabTitle = [
  { index: 0, title: "همه", name: "all" },
  { index: 1, title: "دیدگاه های من", name: "mine" },
];

function CommentSection() {
  const token = getCookie("accessToken");
  const hasToken = token ? true : false;
  const userData = useGetProfile(hasToken);
  const { data: dataUser } = userData || {};
  const userId = dataUser?._id;
  const { id } = useParams();
  const [accepetRegulate, setAccepetRegulate] = useState(true);
  const [tabIndex, setTabIndex] = useState(0);
  const [allComments, setAllComments] = useState<ICommentGet[]>([]);
  const [commentOrder, setCommentOrder] = useState<{
    title: string;
    persianTitle: string;
  }>({ title: "latest", persianTitle: "جدیدترین" });
  const [query, setQuery] = useState("sort=latest");
  const { data, isLoading, refetch } = useGetCommentByProduct(
    id as string,
    query,
  );
  const { comments } = data || {};
  const { data: myData, refetch: myRefetch } = useGetMyCommentByProduct(
    id as string,
    query,
  );
  const [commentSortStatus, setCommentSortStatus] = useState(false);
  const [commentFilterStatus, setCommentFilterStatus] = useState(false);

  useEffect(() => {
    if (comments) {
      setAllComments(comments);
    }
  }, [data, comments]);

  const commentSortHandler = (commentOrderType: {
    title: string;
    persianTitle: string;
  }) => {
    setCommentOrder(commentOrderType);
    setQuery(`sort=${commentOrderType.title}`);
    refetch();
  };

  const tabChange = (index) => {
    setTabIndex(index);
    const theTab = tabTitle.find((item) => item.index === index);
    const comments =
      theTab?.name === "mine" ? myData?.comments : data?.comments;
    setAllComments(comments);
  };

  if (isLoading) return <Loading />;
  return (
    <section className="flex flex-col gap-y-6 md:gap-y-10">
      <div
        onClick={() => {
          setCommentFilterStatus(false);
          setCommentSortStatus(false);
        }}
        className={`fixed right-0 top-0 z-[65341] h-[100vh] items-center justify-center bg-dark-500 ${commentSortStatus || commentFilterStatus ? "fixed mt-0 opacity-40" : "mt-[1000px] opacity-0"} w-full transition-all duration-100`}
      ></div>
      <CommentSortSectionMobile
        commentSortStatus={commentSortStatus}
        setCommentSortStatus={setCommentSortStatus}
        commentSortHandler={commentSortHandler}
      />
      {
        <CommentFilterSectionMobile
          commentFilterStatus={commentFilterStatus}
          setCommentFilerStatus={setCommentFilterStatus}
          commentFilterHandler={tabChange}
        />
      }
      <div className="text-start font-semibold">
        <span>دیدگاه های کابران</span>
      </div>
      <div className="flex flex-col gap-4 xl:px-44">
        <div className="flex flex-col gap-y-3 text-[14px] text-gray-600 md:flex-row">
          <div className="flex w-full items-center justify-start gap-x-[6px] text-start md:w-1/2">
            <span className="flex items-center justify-center">
              <LiaComment size={21} />
            </span>
            <span className="text-[11px] sm:text-[12px] lg:text-[15px]">
              <span>{toPersianNumbers(data.comments.length)}</span>
              <span> دیدگاه ثبت شده است </span>
            </span>
          </div>
          <div className="flex w-full items-center justify-start gap-x-[6px] md:w-1/2 md:justify-end">
            <div className="flex items-center">
              <input
                type="checkbox"
                name=""
                id=""
                className="accent-primary-500"
                defaultChecked={accepetRegulate}
                onClick={() => setAccepetRegulate(!accepetRegulate)}
              />
            </div>
            <span>
              <span className="cursor-pointer text-[11px] text-primary-600 sm:text-[12px] lg:text-[15px]">
                قوانین و مقررات
              </span>{" "}
              <span className="text-[11px] sm:text-[12px] lg:text-[15px]">
                را پذیرفتم
              </span>
            </span>
          </div>
        </div>
        <AddComment refetch={refetch} />
      </div>

      {data?.comments?.length > 0 && (
        <div id="tab-container" className="hidden lg:block xl:px-44">
          <Tabs
            defaultIndex={0}
            onSelect={(index) => tabChange(index)}
            selectedTabClassName={"!border-b-[3px] !border-primary-500"}
          >
            <TabList className={"grid grid-cols-3 border-b border-gray-200"}>
              <div
                id="comment-sort-container"
                className="col-span-1 flex select-none items-center justify-start gap-2 px-1"
              >
                <CommentSort
                  commentOrder={commentOrder}
                  commentSortHandler={commentSortHandler}
                />
              </div>
              <div className="col-span-1 flex justify-center">
                {tabTitle.map((item) => (
                  <Tab
                    key={item.index}
                    className={
                      "relative inline-block cursor-pointer px-[20px] py-[6px] focus:outline-none"
                    }
                  >
                    <span
                      className={`${tabIndex === item.index ? "text-primary-500" : "text-slate-400"} text-[15px]`}
                    >
                      {item.title}
                    </span>
                  </Tab>
                ))}
              </div>
            </TabList>
            <TabPanel className={"py-3"}>
              <CommenList
                allComments={allComments}
                setAllComments={setAllComments}
                refetch={refetch}
              />
            </TabPanel>
            {userId && (
              <TabPanel>
                {allComments?.length > 0 && (
                  <CommenList
                    allComments={allComments}
                    setAllComments={setAllComments}
                    refetch={myRefetch}
                  />
                )}
                {userId && allComments?.length < 1 && (
                  <span>هنوز دیدگاهی ثبت نکرده اید</span>
                )}
              </TabPanel>
            )}
          </Tabs>
        </div>
      )}
      <div className="flex flex-col lg:hidden">
        <div
          id="sort-filter-container"
          className="flex justify-between gap-x-1"
        >
          {allComments?.length > 0 && (
            <div
              onClick={() => setCommentSortStatus(true)}
              className="flex-center w-full gap-2 rounded-xl border border-light-350 bg-light-100 p-2 text-listItem text-dark-500"
            >
              <span>
                <GrSort className="-scale-x-100 text-[14px]" />
              </span>
              <span>{"مرتب سازی"}</span>
            </div>
          )}

          {userId && comments?.length > 0 && (
            <div
              onClick={() => setCommentFilterStatus(true)}
              className="flex-center w-full gap-2 rounded-xl border border-light-350 bg-light-100 p-2 text-listItem text-dark-500"
            >
              <span>
                <FaFilter className="-scale-x-100 text-[14px]" />
              </span>
              <span>{"فیلترها"}</span>
            </div>
          )}
        </div>
        <CommenList
          allComments={allComments}
          setAllComments={setAllComments}
          refetch={refetch}
        />
      </div>
      {data?.comments?.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-y-3 px-4">
          <MdOutlineCommentsDisabled size={70} className="text-primary-500" />
          <span className="text-[14px]">هنوز دیدگاهی ثبت نشده است !</span>
        </div>
      )}
    </section>
  );
}

export default CommentSection;
