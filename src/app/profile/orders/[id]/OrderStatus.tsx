import { toPersianNumbers } from "@/utils/toPersianNumbers";

function OrderStatus({ theOrder }) {
  const persianStatus =
    theOrder?.status === "processing" ? "درحال انجام" : "تکمیل شده";

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-[15px] lg:text-[18px]">وضعیت سفارش</h2>
      <span className="text-[14px] lg:text-[16px]">
        سفارش{" "}
        <span className="font-semibold">
          {toPersianNumbers(65435)}
          <span>#</span>
        </span>{" "}
        در تاریخ{" "}
        <span className="font-semibold">
          {new Date(theOrder.createdAt).toLocaleDateString("fa-IR", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </span>{" "}
        ثبت شده است و در حال حاضر در وضعیت{" "}
        <span
          className={`${theOrder.status === "processing" ? "bg-red-100" : "bg-green-100"} p-1`}
        >
          {`${persianStatus}`}
        </span>{" "}
        می‌باشد.
      </span>
    </div>
  );
}

export default OrderStatus;
