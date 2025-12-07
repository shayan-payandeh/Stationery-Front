"use client";
import { useGetProfile, useLogout, useUserUpdate } from "@/hook/useAuth";
import { IUserUpdatePatchOne, IUserUpdatePatchTwo } from "@/interface/user";
import { useQueryClient } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

function ProfileInfoClient() {
  const router = useRouter();
  const token = getCookie("accessToken");
  const hasToken = token ? true : false;
  const userData = useGetProfile(hasToken);
  const { data, isLoading } = userData || {};
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatedNewPassword, setRepeatedNewPassword] = useState("");
  const [isPasswordRequired, setPasswordRequired] = useState(false);

  const queryClient = useQueryClient();
  const { mutateAsync } = useUserUpdate(queryClient);
  const { mutate } = useLogout(queryClient);

  useEffect(() => {
    if (data) {
      setFullName(data?.fullName);
      setPhoneNumber(data?.phoneNumber);
      setEmail(data?.email);
    }
  }, [data]);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    values: {
      email: email,
      phoneNumber: phoneNumber,
      fullName: fullName,
      currentPassword,
      newPassword,
      repeatedNewPassword,
    },
  });

  const updateHandler = async () => {
    let newUserData: IUserUpdatePatchOne | IUserUpdatePatchTwo;
    if (currentPassword && newPassword !== repeatedNewPassword) {
      toast.error("گذر واژه های جدید باید یکسان باشند.");
      return;
    } else if (currentPassword && newPassword && repeatedNewPassword) {
      newUserData = {
        fullName,
        phoneNumber,
        email,
        currentPassword,
        newPassword,
      };
      const result = await mutateAsync({
        id: data._id,
        data: newUserData,
      });
      if (result.status === 200 && result.statusText === "OK") {
        mutate();
        router.push("/");
      }
    } else if (!currentPassword && !newPassword && !repeatedNewPassword) {
      newUserData = { fullName, phoneNumber, email };
      mutateAsync({
        id: data._id,
        data: newUserData,
      });
    }
  };

  return (
    <div className="flex h-full flex-col gap-6 rounded-lg border border-light-200 px-5 py-6 shadow-container">
      <h2 className="text-[1.1rem] font-medium text-dark-700">
        ویرایش اطلاعات
      </h2>
      <form
        onSubmit={handleSubmit(updateHandler)}
        className="flex flex-col gap-8 text-[15px] text-dark-500"
      >
        <div className="grid grid-cols-6 gap-3">
          <div
            className={`col-span-6 flex flex-col gap-2 ${isLoading ? "blur-sm" : ""} sm:col-span-2`}
          >
            <label htmlFor="fullName">نام :</label>
            <input
              id="fullName"
              type="text"
              className="rounded-sm border border-light-350 p-[6px] shadow-sm focus:outline-primary-500"
              value={fullName}
              {...register("fullName", {
                required: true,
                minLength: 3,
                onChange: (e) => {
                  setFullName(e.target.value);
                },
              })}
              autoComplete="off"
            />
            <span className="text-[.7rem] text-red-700">
              {errors.fullName?.type === "required" && `نام را وارد کنید`}
              {errors.fullName &&
                errors.fullName?.type !== "required" &&
                `نام صحیح نیست`}
            </span>
          </div>
          <div
            className={`col-span-6 flex flex-col gap-2 ${isLoading ? "blur-sm" : ""} sm:col-span-2`}
          >
            <label htmlFor="phoneNumber">شماره :</label>
            <input
              id="phoneNumber"
              type="text"
              className="rounded-sm border border-light-350 p-[6px] shadow-sm focus:outline-primary-500"
              value={phoneNumber}
              {...register("phoneNumber", {
                required: true,
                minLength: 11,
                maxLength: 11,
                onChange: (e) => {
                  setPhoneNumber(e.target.value);
                },
              })}
              autoComplete="off"
            />
            <span className="text-[.7rem] text-red-700">
              {errors.phoneNumber?.type === "required" && `شماره را وارد کنید`}
              {errors.phoneNumber &&
                errors.phoneNumber?.type !== "required" &&
                `شماره صحیح نیست`}
            </span>
          </div>
          <div
            className={`${isLoading ? "blur-sm" : ""} col-span-6 flex flex-col gap-2 sm:col-span-2`}
          >
            <label htmlFor="email">ایمیل :</label>
            <input
              id="email"
              type="email"
              className="rounded-sm border border-light-350 p-[6px] shadow-sm focus:outline-primary-500"
              {...register("email", {
                required: true,
                pattern:
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              })}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              autoComplete="off"
            />
            <span className="text-[.7rem] text-red-700">
              {errors.email?.type === "required" && `ایمیل را وارد کنید`}
              {errors.email &&
                errors.email?.type !== "required" &&
                `ایمیل صحیح نیست`}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-[14px] font-semibold text-dark-700">
            تغییر گذر واژه
            <span className="font-medium">
              (در صورتی که قصد تغییر ندارید خالی بگذارید)
            </span>
          </h3>
          <div className="grid grid-cols-6 gap-3">
            <div className="col-span-6 flex flex-col gap-2 sm:col-span-2">
              <label htmlFor="currentPassword">گذر واژه فعلی :</label>
              <input
                id="currentPassword"
                type="password"
                className="rounded-sm border border-light-350 p-[6px] shadow-sm focus:outline-primary-500"
                autoComplete="off"
                {...register("currentPassword", {
                  required: false,
                  minLength: 6,
                  onChange: (e) => {
                    setCurrentPassword(e.target.value);
                    if (e.target.value) setPasswordRequired(true);
                  },
                })}
              />
              <span className="text-[.7rem] text-red-700">
                {errors.currentPassword &&
                  errors.currentPassword?.type !== "required" &&
                  `گذر واژه باید حداقل ۶ کاراکتر باشد`}
              </span>
            </div>
            <div className="col-span-6 flex flex-col gap-2 sm:col-span-2">
              <label htmlFor="newPassword">گذر واژه جدید :</label>
              <input
                id="newPassword"
                type="password"
                className="rounded-sm border border-light-350 p-[6px] shadow-sm focus:outline-primary-500"
                {...register("newPassword", {
                  required: isPasswordRequired,
                  minLength: 6,
                  onChange: (e) => {
                    setNewPassword(e.target.value);
                  },
                })}
              />
              <span className="text-[.7rem] text-red-700">
                {errors.newPassword?.type === "required" &&
                  `گذر واژه جدید را وارد کنید`}
                {errors.newPassword &&
                  errors.newPassword?.type !== "required" &&
                  `گذر واژه باید حداقل ۶ کاراکتر باشد`}
              </span>
            </div>
            <div className="col-span-6 flex flex-col gap-2 sm:col-span-2">
              <label htmlFor="repeatedNewPassword">تکرار گذر واژه جدید :</label>
              <input
                id="repeatedNewPassword"
                type="password"
                className="rounded-sm border border-light-350 p-[6px] shadow-sm focus:outline-primary-500"
                {...register("repeatedNewPassword", {
                  required: isPasswordRequired,
                  minLength: 6,
                  onChange: (e) => {
                    setRepeatedNewPassword(e.target.value);
                  },
                })}
              />
              <span className="text-[.7rem] text-red-700">
                {errors.repeatedNewPassword?.type === "required" &&
                  `گذر واژه جدید را مجددا وارد کنید`}
                {errors.repeatedNewPassword &&
                  errors.repeatedNewPassword?.type !== "required" &&
                  `گذر واژه باید حداقل ۶ کاراکتر باشد`}
              </span>
            </div>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="transition-smooth rounded-md bg-primary-500 px-5 py-2 text-light-100 hover:bg-primary-600"
          >
            <span>ثبت</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProfileInfoClient;