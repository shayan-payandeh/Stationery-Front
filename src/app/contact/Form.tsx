import { IoIosSend } from "react-icons/io";

function Form() {
  const mutualClass = `[&>*:not(:last-child)]:flex [&>*:not(:last-child)]:flex-col [&>*:not(:last-child)]:gap-4 [&>*:not(:last-child)]:text-[.8rem]`;
  const mutualClassTwo = `[&_label]:text-dark-500`;

  const inputs = [
    { name: "firstname-lastname", label: "نام و نام خانوادگی :", type: "text" },
    { name: "email", label: "ایمیل", type: "text" },
    { name: "message", label: "متن پیام :" },
  ];

  return (
    <>
      <form
        action=""
        className={`flex w-full flex-col gap-6 lg:text-[.9rem] ${mutualClass} ${mutualClassTwo}`}
      >
        {inputs.map((item) => (
          <>
            {item && item.type === "text" && (
              <div className="">
                <label htmlFor={item.name}>{item.label}</label>
                <input
                  type={item.type}
                  name={item.name}
                  id={item.name}
                  className="border border-light-350 p-[6px]"
                />
              </div>
            )}
            {!item.type && (
              <div>
                <label htmlFor={item.name}>{item.label}</label>
                <textarea
                  rows={7}
                  name={item.name}
                  id={item.name}
                  className="border border-light-350 p-[6px]"
                />
              </div>
            )}
          </>
        ))}

        <div id="send-message-wrapper" className="flex justify-end">
          <button className="transition-smooth flex-center gap-2 rounded-md bg-primary-500 px-4 py-[9px] text-[12px] text-light-100 hover:opacity-85 lg:text-[13px]">
            <span>
              <IoIosSend className="text-[16px] lg:text-[18px]" />
            </span>
            <span>ارسال پیام</span>
          </button>
        </div>
      </form>
    </>
  );
}

export default Form;
