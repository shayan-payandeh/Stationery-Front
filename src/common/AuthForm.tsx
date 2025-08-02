import { Dispatch, ReactNode, SetStateAction } from "react";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";

type AuthFormProps = {
  inputs: {
    title: string;
    persianTitle: string;
    type: string;
    isPasswordVisible?: boolean;
    setPasswordVisible?: Dispatch<SetStateAction<boolean>>;
  }[];
  buttonTitle: string;
  header: string;
  children: ReactNode;
};

function AuthForm({ inputs, buttonTitle, header, children }: AuthFormProps) {
  return (
    <>
      <div
        id="login-form-wrapper"
        className="grid w-[58%] min-w-[300px] max-w-[400px] gap-3 rounded-md bg-light-100 p-6 shadow-container"
      >
        <h2 className="text-center text-[1.1rem] font-semibold text-dark-500">
          {header}
        </h2>
        <form id="form" className="grid gap-6">
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
                    name={input.title}
                    className="rounded-md border border-light-400 bg-light-200 py-[7px] text-center focus:outline focus:outline-primary-500"
                  />
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
                    name={input.title}
                    className="rounded-md border border-light-400 bg-light-200 py-[7px] text-center focus:outline focus:outline-primary-500"
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
                </div>
              )}
            </div>
          ))}

          <div id="loging-button-wrapper" className="flex-center py-8">
            <button className="rounded-md bg-primary-500 px-28 py-[10px] text-center text-light-100 sm:px-32">
              {buttonTitle}
            </button>
          </div>
        </form>
        <div className="grid text-[13px]">{children}</div>
      </div>
    </>
  );
}

export default AuthForm;
