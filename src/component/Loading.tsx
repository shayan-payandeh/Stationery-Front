"use client";
import { ThreeDots } from "react-loader-spinner";

function Loading({ width = "75", heigh = "40" }) {
  return (
    <div className="flex h-screen items-center justify-center md:h-auto">
      <ThreeDots
        height={heigh}
        width={width}
        radius="9"
        color="#2c889a"
        ariaLabel="three-dots-loading"
        wrapperStyle={{
          display: "flex",
          justifyContent: "center",
        }}
        visible={true}
      />
    </div>
  );
}
export default Loading;
