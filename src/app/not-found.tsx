import Link from "next/link";
import NotFoundIcon from "../../public/icons8-nothing-found-80.png";

function NotFound() {
  return (
    <section id="cart-container" className="flex-center w-full">
      <div className="responsive__wrapper flex flex-col justify-center gap-6 text-center">
        <h2 className="text-[32px]">خطای ۴۰۴</h2>
        <span className="flex justify-center">
          <img src={NotFoundIcon.src} alt="404" />
        </span>
        <p className="text-dark-500">صفحه مورد نظر شما یافت نشد!</p>
        <Link href="/">
          <span className="rounded-md bg-primary-500 p-3 text-sm text-light-100">
            بازگشت به صفحه اصلی{" "}
          </span>
        </Link>
      </div>
    </section>
  );
}

export default NotFound;
