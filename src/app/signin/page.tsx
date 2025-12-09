"use client";
import { appRoutes } from "@/constant/routes";
import { useGetProfile, useLogin } from "@/hook/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useState } from "react";
import FormAuth from "../../component/Form";

function Page() {
  const [hasToken, setHasToken] = useState(false);
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("page");
  const queryClient = useQueryClient();
  const { mutateAsync } = useLogin(queryClient);
  const { refetch } = useGetProfile(hasToken);
  const emailHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const passwordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const inputs = [
    {
      title: "email",
      persianTitle: "ایمیل",
      type: "text",
      onChange: emailHandler,
      validation: {
        required: true,
        pattern:
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      },
    },
    {
      title: "password",
      persianTitle: "رمز عبور",
      type: "password",
      isPasswordVisible: isPasswordVisible,
      setPasswordVisible: setPasswordVisible,
      onChange: passwordHandler,
      validation: {
        required: true,
        // pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/,
        // minLength: 60,
      },
    },
  ];

  const loginHandler = async () => {
    try {
      const userData = await mutateAsync({
        email: email,
        password: password,
      });
      if (userData.status === 200) {
        query ? router.push(query) : router.push("/");
        setHasToken(true);
        refetch();
      }
    } catch (error) {}
  };

  return (
    <div id="form-wrapper" className="flex-center w-full py-16 md:py-10">
      <FormAuth
        inputs={inputs}
        btnTitle={"ورود"}
        header={"ورود به سایت"}
        submitHandler={loginHandler}
      >
        {/* <Link href={`${routes.forgotPassword}`}>
          <span className="font-medium text-primary-400">فراموشی رمز عبور</span>
        </Link> */}
        <span className="text-sm">
          <span className="text-dark-500">هنوز ثبت نام نکرده اید ؟</span>
          &nbsp;
          <Link href={appRoutes.register.link}>
            <span className="font-medium text-primary-400">
              عضویت در شایان نگارش
            </span>
          </Link>
        </span>
      </FormAuth>
    </div>
  );
}

export default Page;
