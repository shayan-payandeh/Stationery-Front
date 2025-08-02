import { toPersianNumbers } from "@/utils/toPersianNumbers";

function ReplyTitle({ comment, replyListStatus, replyListShowHanlder }) {
  return (
    <div>
      {comment.reply.length > 0 && (
        <span>
          {replyListStatus.map(
            (item) =>
              item.commentId === comment._id &&
              item.isReplyListOpen === false && (
                <span
                  key={item.commentId}
                  className="cursor-pointer text-[13px] font-semibold"
                  onClick={() => replyListShowHanlder(comment._id)}
                >
                  نمایش {toPersianNumbers(comment.reply.length)} پاسخ
                </span>
              ),
          )}

          {replyListStatus.map(
            (item) =>
              item.commentId === comment._id &&
              item.isReplyListOpen === true && (
                <span
                  key={item.commentId}
                  className="cursor-pointer text-[13px] font-semibold"
                  onClick={() => replyListShowHanlder(comment._id)}
                >
                  پنهان کردن
                </span>
              ),
          )}
        </span>
      )}
    </div>
  );
}

export default ReplyTitle;
