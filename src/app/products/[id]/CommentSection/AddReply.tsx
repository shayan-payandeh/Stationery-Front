import { useAddReplyToComment } from "@/hook/useComment";
import { ChangeEvent, useState } from "react";

function AddReply({ eachCommentReply, comment, replyDropdown, refetch }) {
  const [replyContext, setReplyContext] = useState("");
  const { mutateAsync: addReplyToCommentMutateAsync } = useAddReplyToComment();

  const replyOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReplyContext(e.target.value);
  };

  const replyHandler = async (commentId: string) => {
    const reply = {
      context: replyContext,
    };
    await addReplyToCommentMutateAsync({ commentId, reply });
    refetch();
  };
  return (
    <div>
      {eachCommentReply.map(
        (item) =>
          item.commentId === comment._id &&
          item.isReplyOpen === true && (
            <div className="flex flex-col gap-4" key={item.commentId}>
              <textarea
                name=""
                id=""
                onChange={(e) => replyOnChange(e)}
                className="border border-gray-400 p-4 text-[15px]"
                placeholder="پاسخ خود را به این دیدگاه اینجا وارد کنید (حداکثر ۱۰۰ کاراکتر)"
              ></textarea>
              <div className="flex gap-3">
                <button
                  onClick={() => replyHandler(comment._id)}
                  className="w-[6rem] rounded-md bg-primary-500 p-[6px] text-[13.5px] text-light-100"
                >
                  ارسال پاسخ
                </button>
                <button
                  onClick={() => replyDropdown(comment._id)}
                  className="w-[6rem] rounded-md border border-primary-500 p-[6px] text-[13.5px] text-primary-500"
                >
                  بستن
                </button>
              </div>
            </div>
          ),
      )}
    </div>
  );
}

export default AddReply;
