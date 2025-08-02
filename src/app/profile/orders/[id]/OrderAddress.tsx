import { toPersianNumbers } from "@/utils/toPersianNumbers";

function OrderAddress({ theOrder }) {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-[15px] lg:text-[18px]">آدرس صورتحساب</h2>
      <div
        id="address-container"
        className="flex flex-col gap-3 border border-gray-200 p-4 text-[14px] lg:text-[16px]"
      >
        <span>
          {theOrder?.orderInfo.shippingAddress.firstName}
          &nbsp;
          {theOrder?.orderInfo.shippingAddress.lastName}
        </span>
        <span>
          {theOrder?.orderInfo.shippingAddress.province}
          {" - "}
          {theOrder?.orderInfo.shippingAddress.city}
        </span>
        <span>
          {toPersianNumbers(theOrder?.orderInfo.shippingAddress.address)}
        </span>
        <span>
          {toPersianNumbers(theOrder?.orderInfo.shippingAddress.postalcode)}
        </span>
        <span>
          {toPersianNumbers(theOrder?.orderInfo.shippingAddress.phoneNumber)}
        </span>
      </div>
    </div>
  );
}

export default OrderAddress;
