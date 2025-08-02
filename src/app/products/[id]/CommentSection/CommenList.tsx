import { useEffect, useState } from "react";
import { MdReply } from "react-icons/md";
import UserProfile from "../../../../../public/user-profile-icon.png";
import AddReply from "./AddReply";
import CommentLike from "./CommentLike";
import CommentReplyList from "./CommentReplyList";
import ReplyTitle from "./ReplyTitle";
import { dataDifference } from "@/utils/dateDifference";
import { toPersianNumbers } from "@/utils/toPersianNumbers";
import CommentOrReplyTextSection from "./CommentOrReplyTextSection";
import Loading from "@/component/Loading";

function CommenList({ allComments, setAllComments, refetch }) {
  const allCommentsCopy = [...allComments];
  const [eachCommentReply, setEachCommentReply] = useState<
    { commentId: string; isReplyOpen: boolean }[]
  >([]);
  const [replyListStatus, setReplyListStatus] = useState<
    { commentId: string; isReplyListOpen: boolean }[]
  >([]);

  useEffect(() => {
    if (allCommentsCopy.length > 0) {
      const result = allCommentsCopy?.map((comment) => ({
        commentId: comment._id,
        isReplyOpen: false,
      }));
      setEachCommentReply(result);
      const commentWithReply = allCommentsCopy
        .filter((item) => item.reply.length > 0)
        .map((item) => ({
          commentId: item._id,
          isReplyListOpen: false,
        }));
      setReplyListStatus(commentWithReply);
    }
  }, [allComments]);

  const replyDropdown = (commentId) => {
    const theRplyIndex = eachCommentReply.findIndex(
      (item) => item.commentId === commentId,
    );
    const eachCommentReplyCopy = [...eachCommentReply];
    eachCommentReplyCopy[theRplyIndex].isReplyOpen =
      !eachCommentReplyCopy[theRplyIndex].isReplyOpen;
    setEachCommentReply(eachCommentReplyCopy);
  };

  const replyListShowHanlder = (commentId) => {
    const theCommentIndex = replyListStatus.findIndex(
      (item) => item.commentId === commentId,
    );
    const replyListStatusCopy = [...replyListStatus];
    replyListStatusCopy[theCommentIndex].isReplyListOpen =
      !replyListStatus[theCommentIndex].isReplyListOpen;
    setReplyListStatus(replyListStatusCopy);
  };

  if (!allCommentsCopy) return <Loading />;
  return (
    <div>
      {allComments?.map((comment) => (
        <div
          key={comment._id}
          className="flex flex-col gap-y-1 border-b border-gray-200 pb-4"
        >
          <div id="profile-container" className="col-span-2 flex gap-x-2 pt-4">
            <div id="profile-photo-container">
              <div className="flex h-[35px] w-[35px] items-center rounded-full border border-slate-300">
                <img src={UserProfile.src} alt="profile" />
              </div>
            </div>
            <div id="username-container" className="flex items-center">
              <span className="text-[14px] font-semibold">
                {comment.user.fullName}
              </span>
            </div>
            <div id="date-container" className="flex items-center">
              <span className="text-[12px] text-gray-400">
                {toPersianNumbers(
                  dataDifference(comment.createdAt).numericValue,
                )}{" "}
                {dataDifference(comment.createdAt).message} {"پیش"}{" "}
              </span>
            </div>
          </div>
          <div className="px-4">
            <CommentOrReplyTextSection context={comment.context}>
              <div className="flex gap-x-6">
                <CommentLike
                  allCommentsCopy={allCommentsCopy}
                  comment={comment}
                  setAllComments={setAllComments}
                />
                {/* reply-icon */}
                <span>
                  <MdReply
                    onClick={() => replyDropdown(comment._id)}
                    size={22}
                    className="cursor-pointer text-gray-400"
                  />
                </span>
                {/* reply-section-title */}
                <ReplyTitle
                  comment={comment}
                  replyListStatus={replyListStatus}
                  replyListShowHanlder={replyListShowHanlder}
                />
              </div>

              {/* reply-section-addReply */}
              <AddReply
                comment={comment}
                eachCommentReply={eachCommentReply}
                replyDropdown={replyDropdown}
                refetch={refetch}
              />

              {/* reply-section-replyofAcomment */}
              <CommentReplyList
                allCommentsCopy={allCommentsCopy}
                comment={comment}
                replyListStatus={replyListStatus}
                setAllComments={setAllComments}
                refetch={refetch}
              />
            </CommentOrReplyTextSection>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CommenList;
