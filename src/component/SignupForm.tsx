import { useState } from "react";
import { useFormStatus } from "react-dom";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";

// type AuthFormProps = {
//   inputs: {
//     title: string;
//     persianTitle: string;
//     type: string;
//     isPasswordVisible?: boolean;
//     setPasswordVisible?: Dispatch<SetStateAction<boolean>>;
//     onChange: ChangeEventHandler<HTMLInputElement>;
//     // passwordHandler?: ChangeEventHandler<HTMLInputElement>;
//     validation: QueryType;
//   }[];
//   btnTitle: string;
//   pending: boolean;
//   children: React.ReactNode;
// };

function SignupForm({ btnTitle, children, register, errors }) {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isRepeatPasswordVisible, setRepeatPasswordVisible] = useState(false);
  const { pending } = useFormStatus();

  const inputs = [
    {
      title: "name",
      persianTitle: "نام",
      type: "text",
      // onChange: nameHandler,
      validation: {
        required: true,
        minLength: 3,
      },
    },
    {
      title: "phoneNumber",
      persianTitle: "شماره ",
      type: "text",
      // onChange: phoneNumberHandler,
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
      // onChange: emailHandler,
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
      // onChange: passwordHandler,
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
      // onChange: repeatPasswordHandler,
      validation: {
        required: true,
        // pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/,
        minLength: 6,
      },
    },
  ];

  return (
    <>
      {inputs.map((input) => (
        <div key={input.title}>
          {input.type === "text" && (
            <div id="phone-input-label-wrapper" className="grid gap-2">
              <label
                htmlFor={input.title}
                className="text-[14px] font-medium text-dark-500"
              >
                {input.persianTitle} :
              </label>
              <input
                id={input.title}
                type={input.type}
                className="rounded-md border border-light-400 bg-light-200 py-[7px] text-center focus:outline focus:outline-primary-500"
                {...register(input.title, {
                  ...input.validation,
                  //   onChange: (e) => {
                  //     input.onChange(e);
                  //   },
                })}
                name={input.title}
              />

              <span className="text-[.7rem] text-red-700">
                {errors[input.title]?.type === "required" &&
                  `${input.persianTitle} را وارد کنید`}
                {errors[input.title] &&
                  errors[input.title]?.type !== "required" &&
                  `${input.persianTitle} صحیح نیست`}
              </span>
            </div>
          )}
          {input.type === "password" && (
            <div id="phone-input-label-wrapper" className="relative grid gap-2">
              <label
                htmlFor={input.title}
                className="text-[14px] font-medium text-dark-500"
              >
                {input.persianTitle} :
              </label>
              <input
                type={!input.isPasswordVisible ? "password" : "text"}
                className="rounded-md border border-light-400 bg-light-200 py-[7px] text-center focus:outline focus:outline-primary-500"
                {...register(input.title, {
                  ...input.validation,
                })}
                name={input.title}
              />

              {!input.isPasswordVisible && (
                <span
                  className="absolute right-0 top-0 mr-2 mt-10 cursor-pointer"
                  onClick={() =>
                    input.setPasswordVisible!(!input.isPasswordVisible)
                  }
                >
                  <IoIosEye />
                </span>
              )}
              {input.isPasswordVisible && (
                <span
                  className="absolute right-0 top-0 mr-2 mt-10 cursor-pointer"
                  onClick={() =>
                    input.setPasswordVisible!(!input.isPasswordVisible)
                  }
                >
                  <IoIosEyeOff />
                </span>
              )}
              <span className="text-[.7rem] text-red-700">
                {errors[input.title]?.type === "required" &&
                  `${input.persianTitle} را وارد کنید`}
                {errors[input.title] &&
                  errors[input.title]?.type !== "required" &&
                  `${input.persianTitle} صحیح نیست`}
              </span>
            </div>
          )}
        </div>
      ))}

      <div id="loging-button-wrapper" className="flex-center py-8">
        <button
          type="submit"
          className={`rounded-md ${pending ? "bg-primary-400" : "bg-primary-500"} px-28 py-[10px] text-center text-light-100 sm:px-32`}
          disabled={pending}
        >
          {btnTitle}
        </button>
      </div>
      {children}
    </>
  );
}

export default SignupForm;
