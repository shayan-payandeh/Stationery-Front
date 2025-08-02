// "use client";
// import SignupForm from "@/component/SignupForm";
// import { routes } from "@/constant/routes";
// import Link from "next/link";
// import { ChangeEvent, useEffect, useState } from "react";
// import { useFormState } from "react-dom";
// import { useForm } from "react-hook-form";
// import toast from "react-hot-toast";
// import { createUser } from "../actions";

// const initialState = {
//   message: "",
//   errorMessage: "",
// };

// function Page() {
//   const {
//     register,
//     formState: { errors },
//     handleSubmit,
//   } = useForm();

//   const [state, formAction] = useFormState(createUser, initialState);
//   const { message, errorMessage } = state;

//   useEffect(() => {
//     if (message) {
//       toast.success(message);
//     } else if (errorMessage) {
//       toast.error(errorMessage);
//     }
//   }, [message, errorMessage]);

//   // const registerHandler = async () => {
//   //   // e.preventDefault();
//   //   if (password !== reapeatedPassword) toast.error("رمز عبور یکسان نیست !");
//   //   else
//   //     mutate({
//   //       email: email,
//   //       phoneNumber: phoneNumber,
//   //       fullName: name,
//   //       password: password,
//   //     });
//   // };

//   return (
//     <div id="form-wrapper" className="flex-center w-full py-16 md:py-10">
//       <div
//         id="login-form-wrapper"
//         className="grid w-[58%] min-w-[300px] max-w-[400px] gap-3 rounded-md bg-light-100 p-6 shadow-container"
//       >
//         <h2 className="text-center text-[1.1rem] font-semibold text-dark-500">
//           {"عضویت در سایت"}
//         </h2>
//         <form
//           action={handleSubmit(formAction as any)}
//           id="form"
//           className="grid gap-6"
//         >
//           <SignupForm register={register} errors={errors} btnTitle={"ثبت نام"}>
//             <span>
//               <span className="text-dark-500">قبلا عضو شده اید؟</span>
//               &nbsp;
//               <Link href={routes.login}>
//                 <span className="font-medium text-primary-400">
//                   ورود به سایت
//                 </span>
//               </Link>
//             </span>
//           </SignupForm>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Page;

"use client";
import { routes } from "@/constant/routes";
import { useGetProfile, useRegister } from "@/hook/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import FormAuth from "../../component/Form";
import { useRouter } from "next/navigation";

function Page() {
  const [hasToken, setHasToken] = useState(false);
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isRepeatPasswordVisible, setRepeatPasswordVisible] = useState(false);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reapeatedPassword, setRepeatedPassword] = useState("");
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutateAsync } = useRegister(queryClient);
  const { refetch } = useGetProfile(hasToken);

  const nameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const phoneNumberHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };
  const emailHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const passwordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const repeatPasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setRepeatedPassword(e.target.value);
  };

  const inputs = [
    {
      title: "name",
      persianTitle: "نام",
      type: "text",
      onChange: nameHandler,
      validation: {
        required: true,
        minLength: 3,
      },
    },
    {
      title: "phoneNumber",
      persianTitle: "شماره ",
      type: "text",
      onChange: phoneNumberHandler,
      validation: {
        required: true,
        minLength: 11,
        maxLength: 11,
      },
    },
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
        minLength: 6,
      },
    },
    {
      title: "repeatPassword",
      persianTitle: "تکرار رمز عبور ",
      type: "password",
      isPasswordVisible: isRepeatPasswordVisible,
      setPasswordVisible: setRepeatPasswordVisible,
      onChange: repeatPasswordHandler,
      validation: {
        required: true,
        // pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/,
        minLength: 6,
      },
    },
  ];

  const registerHandler = async () => {
    // e.preventDefault();
    if (password !== reapeatedPassword) toast.error("رمز عبور یکسان نیست !");
    else {
      try {
        await mutateAsync({
          email: email,
          phoneNumber: phoneNumber,
          fullName: name,
          password: password,
        });
        setHasToken(true);
        router.push("/profile");
        refetch();
      } catch (error) {}
    }
  };

  return (
    <div id="form-wrapper" className="flex-center w-full py-16 md:py-10">
      <FormAuth
        inputs={inputs}
        btnTitle={"ثبت نام"}
        header={"عضویت در سایت"}
        submitHandler={registerHandler}
      >
        <span>
          <span className="text-dark-500">قبلا عضو شده اید؟</span>
          &nbsp;
          <Link href={routes.login}>
            <span className="font-medium text-primary-400">ورود به سایت</span>
          </Link>
        </span>
      </FormAuth>
    </div>
  );
}

export default Page;
