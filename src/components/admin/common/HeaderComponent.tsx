import { Menu } from "lucide-react";
import ThemeSwitcherComponent from "./ThemeSwitcherComponent";
import useUiHelper from "@/hooks/useUiHelper";

const HeaderComponent = () => {
  const { toggleSidenav } = useUiHelper();
  return (
    <div className="relative flex flex-0 items-center w-full min-h-16 max-h-16 px-4 md:px-6 z-49 shadow dark:shadow-none dark:border-b bg-card dark:bg-transparent border-accent">
      <button className="cursor-pointer" onClick={toggleSidenav}>
        <Menu />
      </button>
      <div className="flex items-center pl-2 ml-auto space-x-0.5 sm:space-x-2">
        <ThemeSwitcherComponent />
      </div>
    </div>
  );
};

export default HeaderComponent;
