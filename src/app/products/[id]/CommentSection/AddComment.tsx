import { useAddComment } from "@/hook/useComment";
import { ICommentPost } from "@/interface/comment";
import { useParams } from "next/navigation";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";

function AddComment({ refetch }) {
  const { id } = useParams();
  const [commentText, setCommentText] = useState("");
  const { mutateAsync: addCommentMutateAsync } = useAddComment();

  const commentHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(e.target.value);
  };

  const submitHandler = async () => {
    try {
      const comment: ICommentPost = {
        context: commentText,
        productId: id as string,
      };
      await addCommentMutateAsync(comment);
      refetch();
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message);
    }
  };
  return (
    <div className="flex flex-col gap-4">
      <textarea
        name=""
        id=""
        onChange={(e) => commentHandler(e)}
        className="border border-gray-400 p-4 text-[12px] md:text-[14px] lg:text-[15px]"
        placeholder="نظر خود را اینجا وارد کنید (حداکثر ۱۰۰ کاراکتر)"
      ></textarea>
      <button
        onClick={submitHandler}
        className="w-[6rem] rounded-md bg-primary-500 p-2 text-[12px] text-light-100 md:text-[13.5px] lg:text-[14px]"
      >
        ثبت دیدگاه
      </button>
    </div>
  );
}

export default AddComment;
