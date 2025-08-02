import { useGetProfile } from "@/hook/useAuth";
import { toPersianNumbers } from "@/utils/toPersianNumbers";
import { getCookie } from "cookies-next";
import React from "react";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import UserProfile from "../../../../../public/user-profile-icon.png";
import { useAddLikeToReply } from "@/hook/useComment";
import CommentOrReplyTextSection from "./CommentOrReplyTextSection";

function CommentReplyList({
  replyListStatus,
  allCommentsCopy,
  comment,
  setAllComments,
  refetch,
}) {
  const token = getCookie("accessToken");
  const hasToken = token ? true : false;
  const userData = useGetProfile(hasToken);
  const { data: dataUser } = userData || {};
  const userId = dataUser?._id;
  const { mutateAsync: addLikeToReplyMutateAsync } = useAddLikeToReply();

  const replyLikeHandler = async (replyId: string, commentId: string) => {
    const theComment = allCommentsCopy.find((item) => item._id === commentId);
    const theCommentIndex = allCommentsCopy.findIndex(
      (item) => item._id === commentId,
    );
    const theReply = theComment?.reply.find((item) => item._id === replyId);
    const replyLikeStatus = theReply?.likedBy.includes(userId);
    const data = { commentId: commentId, likeType: replyLikeStatus ? 0 : 1 };

    //change state
    const theCommentCopy = { ...theComment };
    const theReplyIndex = theComment?.reply.findIndex(
      (item) => item._id === replyId,
    );

    const replyLikedByArray =
      theCommentCopy.reply[theReplyIndex as number].likedBy;
    replyLikeStatus
      ? replyLikedByArray?.splice(theReplyIndex as number, 1)
      : replyLikedByArray?.push(userId);

    const CopyOfAllCommentsCopy = [...allCommentsCopy];
    CopyOfAllCommentsCopy[theCommentIndex].reply[
      theReplyIndex as number
    ].likedBy = replyLikedByArray as string[];
    setAllComments(CopyOfAllCommentsCopy);

    ///
    await addLikeToReplyMutateAsync({ replyId, data: data });
    refetch();
  };

  return (
    <div>
      {replyListStatus?.map(
        (item) =>
          item.commentId === comment._id &&
          item.isReplyListOpen && (
            <div key={item.commentId}>
              {comment.reply && (
                <div>
                  {comment.reply.map((reply) => (
                    <div key={reply._id}>
                      <div
                        id="profile-container"
                        className="col-span-2 flex gap-x-2 pt-4"
                      >
                        <div id="profile-photo-container">
                          <div className="flex h-[35px] w-[35px] items-center rounded-full border border-slate-300">
                            <img src={UserProfile.src} alt="profile" />
                          </div>
                        </div>
                        <div
                          id="username-container"
                          className="flex items-center"
                        >
                          <span className="text-[14px] font-semibold">
                            {reply.user.fullName}
                          </span>
                        </div>
                        <div id="date-container" className="flex items-center">
                          <span className="text-[12px] text-gray-400">
                            یک روز پیش
                          </span>
                        </div>
                      </div>
                      <div className="px-4">
                        <CommentOrReplyTextSection context={reply.context}>
                          <div className="flex gap-x-6">
                            <span className="flex gap-x-2">
                              <span>
                                {reply.likedBy.includes(userId) && (
                                  <IoMdHeart
                                    onClick={() =>
                                      replyLikeHandler(reply._id, comment._id)
                                    }
                                    size={21}
                                    className={`cursor-pointer text-red-600`}
                                  />
                                )}
                                {!reply.likedBy.includes(userId) && (
                                  <IoMdHeartEmpty
                                    onClick={() =>
                                      replyLikeHandler(reply._id, comment._id)
                                    }
                                    size={21}
                                    className={`cursor-pointer text-gray-400`}
                                  />
                                )}
                              </span>
                              <span className="text-gray-400">
                                {toPersianNumbers(reply.likedBy.length)}
                              </span>
                            </span>
                          </div>
                        </CommentOrReplyTextSection>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ),
      )}
    </div>
  );
}

export default CommentReplyList;
