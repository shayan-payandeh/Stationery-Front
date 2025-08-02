// import { QueryType } from "@/type/query";
// import { ChangeEventHandler, Dispatch, FormEvent, SetStateAction } from "react";
// import { useForm } from "react-hook-form";
// import { IoIosEye, IoIosEyeOff } from "react-icons/io";

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
//   header: string;
//   submitHandler?: (e: FormEvent<HTMLFormElement>) => void;
//   pending: boolean;
//   children: React.ReactNode;
// };

// const FormAuth = ({
//   inputs,
//   header,
//   btnTitle,
//   children,
//   submitHandler,
//   pending,
// }: AuthFormProps) => {
//   const {
//     register,
//     formState: { errors },
//     handleSubmit,
//   } = useForm();

//   return (
//     <div
//       id="login-form-wrapper"
//       className="grid w-[58%] min-w-[300px] max-w-[400px] gap-3 rounded-md bg-light-100 p-6 shadow-container"
//     >
//       <h2 className="text-center text-[1.1rem] font-semibold text-dark-500">
//         {header}
//       </h2>
//       <form
//         action={handleSubmit(submitHandler as any)}
//         id="form"
//         className="grid gap-6"
//         // onSubmit={handleSubmit(submitHandler as any)}
//       >
//         {inputs.map((input) => (
//           <div key={input.title}>
//             {input.type === "text" && (
//               <div id="phone-input-label-wrapper" className="grid gap-2">
//                 <label
//                   htmlFor={input.title}
//                   className="text-[14px] font-medium text-dark-500"
//                 >
//                   {input.persianTitle} :
//                 </label>
//                 <input
//                   id={input.title}
//                   type={input.type}
//                   className="rounded-md border border-light-400 bg-light-200 py-[7px] text-center focus:outline focus:outline-primary-500"
//                   {...register(input.title, {
//                     ...input.validation,
//                     onChange: (e) => {
//                       input.onChange(e);
//                     },
//                   })}
//                   name={input.title}
//                 />

//                 <span className="text-[.7rem] text-red-700">
//                   {errors[input.title]?.type === "required" &&
//                     `${input.persianTitle} را وارد کنید`}
//                   {errors[input.title] &&
//                     errors[input.title]?.type !== "required" &&
//                     `${input.persianTitle} صحیح نیست`}
//                 </span>
//               </div>
//             )}
//             {input.type === "password" && (
//               <div
//                 id="phone-input-label-wrapper"
//                 className="relative grid gap-2"
//               >
//                 <label
//                   htmlFor={input.title}
//                   className="text-[14px] font-medium text-dark-500"
//                 >
//                   {input.persianTitle} :
//                 </label>
//                 <input
//                   type={!input.isPasswordVisible ? "password" : "text"}
//                   className="rounded-md border border-light-400 bg-light-200 py-[7px] text-center focus:outline focus:outline-primary-500"
//                   {...register(input.title, {
//                     ...input.validation,
//                     onChange: (e) => {
//                       input.onChange(e);
//                     },
//                   })}
//                   name={input.title}
//                 />

//                 {!input.isPasswordVisible && (
//                   <span
//                     className="absolute right-0 top-0 mr-2 mt-10 cursor-pointer"
//                     onClick={() =>
//                       input.setPasswordVisible!(!input.isPasswordVisible)
//                     }
//                   >
//                     <IoIosEye />
//                   </span>
//                 )}
//                 {input.isPasswordVisible && (
//                   <span
//                     className="absolute right-0 top-0 mr-2 mt-10 cursor-pointer"
//                     onClick={() =>
//                       input.setPasswordVisible!(!input.isPasswordVisible)
//                     }
//                   >
//                     <IoIosEyeOff />
//                   </span>
//                 )}
//                 <span className="text-[.7rem] text-red-700">
//                   {errors[input.title]?.type === "required" &&
//                     `${input.persianTitle} را وارد کنید`}
//                   {errors[input.title] &&
//                     errors[input.title]?.type !== "required" &&
//                     `${input.persianTitle} صحیح نیست`}
//                 </span>
//               </div>
//             )}
//           </div>
//         ))}

//         <div id="loging-button-wrapper" className="flex-center py-8">
//           <button
//             type="submit"
//             className="rounded-md bg-primary-500 px-28 py-[10px] text-center text-light-100 sm:px-32"
//             disabled={pending}
//           >
//             {btnTitle}
//           </button>
//         </div>
//         {children}
//       </form>
//     </div>
//   );
// };

// export default FormAuth;

import { QueryType } from "@/type/query";
import { ChangeEventHandler, Dispatch, FormEvent, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";

type AuthFormProps = {
  inputs: {
    title: string;
    persianTitle: string;
    type: string;
    isPasswordVisible?: boolean;
    setPasswordVisible?: Dispatch<SetStateAction<boolean>>;
    onChange: ChangeEventHandler<HTMLInputElement>;
    // passwordHandler?: ChangeEventHandler<HTMLInputElement>;
    validation: QueryType;
  }[];
  btnTitle: string;
  header: string;
  submitHandler?: (e: FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
};

const FormAuth = ({
  inputs,
  header,
  btnTitle,
  children,
  submitHandler,
}: AuthFormProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  return (
    <div
      id="login-form-wrapper"
      className="grid w-[58%] min-w-[300px] max-w-[400px] gap-3 rounded-md bg-light-100 p-6 shadow-container"
    >
      <h2 className="text-center text-[1.1rem] font-semibold text-dark-500">
        {header}
      </h2>
      <form
        id="form"
        className="grid gap-6"
        onSubmit={handleSubmit(submitHandler as any)}
      >
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
                    onChange: (e) => {
                      input.onChange(e);
                    },
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
              <div
                id="phone-input-label-wrapper"
                className="relative grid gap-2"
              >
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
                    onChange: (e) => {
                      input.onChange(e);
                    },
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
            className="rounded-md bg-primary-500 px-28 py-[10px] text-center text-light-100 sm:px-32"
          >
            {btnTitle}
          </button>
        </div>
        {children}
      </form>
    </div>
  );
};

export default FormAuth;
