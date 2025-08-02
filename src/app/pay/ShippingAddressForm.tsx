import React, { useState } from "react";
import { useForm } from "react-hook-form";

function ShippingAddressForm({ submitHandler }) {
  const [shippingAddress, setShippingAddress] = useState({
    phoneNumber: "",
    firstName: "",
    lastName: "",
    province: "",
    city: "",
    postalcode: "",
    address: "",
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    values: {
      phoneNumber: shippingAddress.phoneNumber,
      firstName: shippingAddress.firstName,
      lastName: shippingAddress.lastName,
      province: shippingAddress.province,
      city: shippingAddress.city,
      postalcode: shippingAddress.postalcode,
      address: shippingAddress.address,
    },
  });

  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-start text-[15px] lg:text-[18px]">آدرس ارسال</h3>
      <form
        onSubmit={handleSubmit(() => submitHandler(shippingAddress))}
        className="grid grid-cols-3 gap-5 text-[14px] lg:text-[16px]"
      >
        <div
          id="firstname-container"
          className="col-span-3 flex flex-col gap-1 lg:col-span-1"
        >
          <label
            htmlFor="firstName"
            className="text-start text-[14px] lg:text-[16px]"
          >
            نام :
          </label>
          <input
            id="firstName"
            type="text"
            className="rounded-sm border border-light-350 p-[6px] shadow-sm focus:outline-primary-500"
            value={shippingAddress.firstName}
            {...register("firstName", {
              required: true,
              minLength: 3,
              onChange: (e) => {
                setShippingAddress({
                  ...shippingAddress,
                  firstName: e.target.value,
                });
              },
            })}
            autoComplete="off"
          />
          <span className="text-[.7rem] text-red-700">
            {errors.firstName?.type === "required" && `نام را وارد کنید`}
            {errors.firstName &&
              errors.firstName?.type !== "required" &&
              `نام صحیح نیست`}
          </span>{" "}
        </div>
        <div
          id="lastName-container"
          className="col-span-3 flex flex-col gap-1 lg:col-span-1"
        >
          <label
            htmlFor="lastName"
            className="text-start text-[14px] lg:text-[16px]"
          >
            نام خانوادگی :
          </label>
          <input
            id="lastName"
            type="text"
            className="rounded-sm border border-light-350 p-[6px] shadow-sm focus:outline-primary-500"
            value={shippingAddress.lastName}
            {...register("lastName", {
              required: true,
              minLength: 3,
              onChange: (e) => {
                setShippingAddress({
                  ...shippingAddress,
                  lastName: e.target.value,
                });
              },
            })}
            autoComplete="off"
          />
          <span className="text-[.7rem] text-red-700">
            {errors.lastName?.type === "required" &&
              `نام خانوادگی را وارد کنید`}
            {errors.lastName &&
              errors.lastName?.type !== "required" &&
              `نام خانوادگی صحیح نیست`}
          </span>{" "}
        </div>
        <div
          id="phoneNumber-container"
          className="col-span-3 flex flex-col gap-1 lg:col-span-1"
        >
          <label
            htmlFor="phoneNumber"
            className="text-start text-[14px] lg:text-[16px]"
          >
            شماره تماس :
          </label>
          <input
            id="phoneNumber"
            type="text"
            className="rounded-sm border border-light-350 p-[6px] shadow-sm focus:outline-primary-500"
            value={shippingAddress.phoneNumber}
            {...register("phoneNumber", {
              required: true,
              minLength: 11,
              maxLength: 11,
              onChange: (e) => {
                setShippingAddress({
                  ...shippingAddress,
                  phoneNumber: e.target.value,
                });
              },
            })}
            autoComplete="off"
          />
          <span className="text-[.7rem] text-red-700">
            {errors.phoneNumber?.type === "required" &&
              `شماره تماس را وارد کنید`}
            {errors.phoneNumber &&
              errors.phoneNumber?.type !== "required" &&
              `شماره تماس صحیح نیست`}
          </span>{" "}
        </div>
        <div
          id="province-container"
          className="col-span-3 flex flex-col gap-1 lg:col-span-1"
        >
          <label
            htmlFor="province"
            className="text-start text-[14px] lg:text-[16px]"
          >
            استان :
          </label>
          <input
            id="province"
            type="text"
            className="rounded-sm border border-light-350 p-[6px] shadow-sm focus:outline-primary-500"
            value={shippingAddress.province}
            {...register("province", {
              required: true,
              minLength: 3,
              onChange: (e) => {
                setShippingAddress({
                  ...shippingAddress,
                  province: e.target.value,
                });
              },
            })}
            autoComplete="off"
          />
          <span className="text-[.7rem] text-red-700">
            {errors.province?.type === "required" && `استان را وارد کنید`}
            {errors.province &&
              errors.province?.type !== "required" &&
              `استان صحیح نیست`}
          </span>{" "}
        </div>
        <div
          id="city-container"
          className="col-span-3 flex flex-col gap-1 lg:col-span-1"
        >
          <label
            htmlFor="city"
            className="text-start text-[14px] lg:text-[16px]"
          >
            شهر :
          </label>
          <input
            id="city"
            type="text"
            className="rounded-sm border border-light-350 p-[6px] shadow-sm focus:outline-primary-500"
            value={shippingAddress.city}
            {...register("city", {
              required: true,
              onChange: (e) => {
                setShippingAddress({
                  ...shippingAddress,
                  city: e.target.value,
                });
              },
            })}
            autoComplete="off"
          />
          <span className="text-[.7rem] text-red-700">
            {errors.city?.type === "required" && `شهر را وارد کنید`}
            {errors.city && errors.city?.type !== "required" && `شهر صحیح نیست`}
          </span>{" "}
        </div>
        <div
          id="postalcode-container"
          className="col-span-3 flex flex-col gap-1 lg:col-span-1"
        >
          <label
            htmlFor="postalcode"
            className="text-start text-[14px] lg:text-[16px]"
          >
            کد پستی :
          </label>
          <input
            id="postalcode"
            type="text"
            className="rounded-sm border border-light-350 p-[6px] shadow-sm focus:outline-primary-500"
            value={shippingAddress.postalcode}
            {...register("postalcode", {
              required: true,
              onChange: (e) => {
                setShippingAddress({
                  ...shippingAddress,
                  postalcode: e.target.value,
                });
              },
            })}
            autoComplete="off"
          />
          <span className="text-[.7rem] text-red-700">
            {errors.postalcode?.type === "required" && `کد پستی را وارد کنید`}
            {errors.postalcode &&
              errors.postalcode?.type !== "required" &&
              `کد پستی صحیح نیست`}
          </span>{" "}
        </div>
        <div
          id="address-container"
          className="col-span-3 flex flex-col gap-1 lg:col-span-2"
        >
          <label
            htmlFor="address"
            className="text-start text-[14px] lg:text-[16px]"
          >
            آدرس :
          </label>
          <input
            id="address"
            type="text"
            className="rounded-sm border border-light-350 p-[6px] shadow-sm focus:outline-primary-500"
            value={shippingAddress.address}
            {...register("address", {
              required: true,
              minLength: 5,
              onChange: (e) => {
                setShippingAddress({
                  ...shippingAddress,
                  address: e.target.value,
                });
              },
            })}
            autoComplete="off"
          />
          <span className="text-[.7rem] text-red-700">
            {errors.address?.type === "required" && `آدرس را وارد کنید`}
            {errors.address &&
              errors.address?.type !== "required" &&
              `آدرس صحیح نیست`}
          </span>{" "}
        </div>
        <div
          id="submit-button-container"
          className="col-span-3 flex justify-start"
        >
          <button
            type="submit"
            className="transition-smooth w-full rounded-md bg-primary-500 px-10 py-3 text-light-100 hover:bg-primary-600 lg:w-auto"
          >
            <span>ثبت</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default ShippingAddressForm;
