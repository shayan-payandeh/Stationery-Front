import CategoryNavbar from "./CategoryNavbar";
import DiscountButton from "./DiscountButton";

function Navbar() {
  return (
    <div className="hidden w-full justify-center bg-light-300 shadow-md md:flex">
      <div className="responsive__wrapper flex justify-between">
        <CategoryNavbar />
        <DiscountButton />
      </div>
    </div>
  );
}

export default Navbar;
