import { useGetProfile } from "@/hook/useAuth";
import { useAddLikeToComment } from "@/hook/useComment";
import { toPersianNumbers } from "@/utils/toPersianNumbers";
import { getCookie } from "cookies-next";
import React from "react";
import toast from "react-hot-toast";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";

function CommentLike({ comment, allCommentsCopy, setAllComments }) {
  const token = getCookie("accessToken");
  const hasToken = token ? true : false;
  const userData = useGetProfile(hasToken);
  const { data: dataUser } = userData || {};
  const userId = dataUser?._id;
  const { mutateAsync: addLikeToCommentMutateAsync } = useAddLikeToComment();

  const likeHandler = async (commentId: string) => {
    if (userId) {
      const theComment = allCommentsCopy.find((item) => item._id === commentId);
      const theCommentIndex = allCommentsCopy.findIndex(
        (item) => item._id === commentId,
      );
      const commentLikeStatus = theComment?.likedBy.includes(userId);
      const data = { likeType: commentLikeStatus ? 0 : 1 };
      //change state
      const theCommentCopy = { ...theComment };
      const likedByArray = theCommentCopy.likedBy;
      const theIndex = likedByArray?.findIndex((item) => item === userId);
      commentLikeStatus
        ? likedByArray?.splice(theIndex as number, 1)
        : likedByArray?.push(userId);

      const CopyOfAllCommentsCopy = [...allCommentsCopy];
      CopyOfAllCommentsCopy[theCommentIndex].likedBy = likedByArray as string[];
      setAllComments(CopyOfAllCommentsCopy);

      //api call
      await addLikeToCommentMutateAsync({ commentId, data });
      // refetch();
    } else {
      toast.error("لطفا وارد حساب کاربری خود شوید .");
    }
  };

  return (
    <span className="flex gap-x-2">
      <span>
        {comment.likedBy.includes(userId) && (
          <IoMdHeart
            onClick={() => likeHandler(comment._id)}
            size={21}
            className={`cursor-pointer text-red-600`}
          />
        )}
        {!comment.likedBy.includes(userId) && (
          <IoMdHeartEmpty
            onClick={() => likeHandler(comment._id)}
            size={21}
            className={`cursor-pointer text-gray-400`}
          />
        )}
      </span>
      <span className="text-gray-400">
        {toPersianNumbers(comment.likedBy.length)}
      </span>
    </span>
  );
}

export default CommentLike;
