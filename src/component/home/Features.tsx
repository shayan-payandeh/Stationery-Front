import Delivery from "@/common/svg/Delivery";
import Order from "@/common/svg/Order";
import Price from "@/common/svg/Price";
import Support from "@/common/svg/Support";
import ScrollBlur from "../animate/ScrollBlur";

function Features() {
  const mutualClass = `
    [&>*]:flex-center [&>*]:w-[25%] [&>*]:flex-col [&>*]:gap-[7px] [&>*]:py-0
    [&_.icon-wrapper]:flex [&_.icon-wrapper]:h-[25px] [&_.icon-wrapper]:w-[30px] [&_.icon-wrapper]:justify-center [&_.icon-wrapper]:md:h-[40px] [&_.icon-wrapper]:md:w-[47px] [&_.icon-wrapper]:lg:h-[50px] [&_.icon-wrapper]:lg:w-[60px]
    [&_.title-wrapper]:text-center [&_.title-wrapper]:text-listItem [&_.title-wrapper]:font-medium [&_.title-wrapper]:text-primary-500
  `;

  const mutualClassTwo = `
    [&>*:not(:last-child)]:border-l [&>*:not(:last-child)]:border-primary-500 [&>*:not(:last-child)]:border-opacity-[.2]
  `;

  const features = [
    { id: 10, icon: <Delivery />, title: "ارسال سراسری" },
    { id: 11, icon: <Order />, title: "سفارش آسان" },
    { id: 12, icon: <Price />, title: "قیمت مناسب" },
    { id: 13, icon: <Support />, title: "پشتیبانی" },
  ];

  return (
    <ScrollBlur>
      <section
        id="features-wrapper"
        className="flex justify-center px-[1px] pb-14 pt-2"
      >
        <div
          className={`${mutualClass} ${mutualClassTwo} flex w-full max-w-[500px] justify-center gap-[0px] sm:max-w-[550px] lg:max-w-[800px]`}
        >
          {features.map((feature) => (
            <div key={feature.id}>
              <span className="icon-wrapper">{feature.icon}</span>
              <span className="title-wrapper">{feature.title}</span>
            </div>
          ))}
        </div>
      </section>
    </ScrollBlur>
  );
}

export default Features;
