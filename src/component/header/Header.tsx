import { Dispatch, SetStateAction } from "react";
import Menu from "./desktop/Menu/Menu";
import MiddleSection from "./desktop/MiddleSection/MiddleSection";
import Navbar from "./desktop/Navbar/Navbar";
import NavSecionMobile from "./mobile/NavSection/NavSectionMobile";
import MenuSectionMobile from "./mobile/menuSectionMobile/MenuSectionMobile";

type HeaderProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
};

function Header({ setOpen, isOpen }: HeaderProps) {
  return (
    <header>
      <Menu />
      <NavSecionMobile setOpen={setOpen} isOpen={isOpen} />
      <MiddleSection />
      <Navbar />
      <MenuSectionMobile />
    </header>
  );
}

export default Header;
