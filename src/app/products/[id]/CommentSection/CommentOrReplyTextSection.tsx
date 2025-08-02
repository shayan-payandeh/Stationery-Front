import React from "react";

function CommentOrReplyTextSection({ context, children }) {
  return (
    <div
      id="text-container"
      className="col-span-10 m-auto flex w-full flex-col gap-2 border-r border-gray-200 px-8 py-2 text-start text-[14px] text-dark-700"
    >
      <div>{context}</div>
      {children}
    </div>
  );
}

export default CommentOrReplyTextSection;
