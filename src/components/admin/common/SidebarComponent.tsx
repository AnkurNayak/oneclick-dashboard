"use client";
import { useAdminManager } from "@/context/AdminProvider";
import useUiHelper from "@/hooks/useUiHelper";
import useWindowWidth from "@/hooks/useWindowWidth";
import { logOut } from "@/lib/api.service";
import { motion, AnimatePresence } from "framer-motion";
import { CircleGauge, CircleUserRound, House, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect, RedirectType, usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

const navMenuItems = [
  {
    href: "/admin/dashboard",
    icon: <House height={24} width={24} className="mr-4" />,
    title: "Home",
  },
  {
    href: "/admin/cars",
    icon: <CircleGauge height={24} width={24} className="mr-4" />,
    title: "Cars",
  },
];

const SidebarComponent = () => {
  const { ui } = useAdminManager();
  const { handleSidenav } = useUiHelper();
  const windowWidth = useWindowWidth();

  useEffect(() => {
    if (windowWidth) {
      windowWidth >= 960 ? handleSidenav(true) : handleSidenav(false);
    }
  }, [windowWidth]);

  return (
    <AnimatePresence>
      {ui.isSidenavOpen && (
        <motion.div
          initial={{ marginLeft: -280 }}
          animate={{ marginLeft: 0 }}
          exit={{ marginLeft: -280 }}
          className="bg-gray-900 dark:bg-sidebar-accent left-0 bottom-0 top-0"
          style={{
            zIndex: 200,
            minWidth: "280px",
            maxWidth: "280px",
            position:
              windowWidth && windowWidth >= 960 ? "relative" : "absolute",
          }}
        >
          <div className="flex flex-col w-full">
            <div className="flex items-center w-full p-4 pl-6">
              <div className="w-48">
                <Image
                  src="https://www.oneclickdrive.com/application/views/images/main-logo-mob.svg?v=4"
                  loading="eager"
                  alt="logo"
                  height={20}
                  width={34}
                  className="w-auto"
                />
              </div>
              <UserProfileMenu />
            </div>
            <div className="flex flex-col items-center w-full p-4">
              <div className="relative w-24 h-24">
                <Image
                  src="https://images.unsplash.com/photo-1628519592419-bf288f08cef5?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  loading="eager"
                  alt="logo"
                  height={240}
                  width={240}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="flex flex-col items-center justify-center w-full mt-6">
                <div className="w-full whitespace-nowrap text-white overflow-ellipsis overflow-hidden text-center leading-normal font-medium">
                  Admin Name
                </div>
                <div className="w-full mt-0.5 whitespace-nowrap overflow-ellipsis overflow-hidden text-center text-md leading-normal font-medium text-white/60">
                  admin@oneclickmail.com
                </div>
              </div>
            </div>

            {/* Menu section */}
            <div className="mt-6 flex flex-col w-full">
              <div className="mx-3">
                <div className="relative flex items-center justify-start py-2.5 px-4 leading-5 rounded-md">
                  <span className="text-xs font-semibold tracking-tighter uppercase text-indigo-500">
                    Dashboard
                  </span>
                </div>
              </div>
              <div className="space-y-1 flex flex-col flex-auto">
                {navMenuItems.map(({ href, title, icon }, index) => (
                  <NavItems
                    key={index}
                    href={href}
                    menuTitle={title}
                    icon={icon}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// User profile menu : signout
const UserProfileMenu = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    const response = await logOut();
    console.log("logout response", response);
    if (response.success) redirect("/admin/login", RedirectType.push);
    if (response) setIsLoading(false);
  };

  return (
    <div className="relative ml-auto">
      <button
        className="cursor-pointer"
        onClick={() => setIsMenuVisible(!isMenuVisible)}
      >
        <CircleUserRound height={24} width={24} />
      </button>
      <AnimatePresence>
        {isMenuVisible && (
          <motion.div
            initial={{ scale: 0, opacity: 0, transformOrigin: "top right" }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              type: "tween",
            }}
            className="absolute bg-card w-48 rounded-md flex flex-col py-2 right-0 z-10"
          >
            <div className="px-4 flex flex-col border-b border-accent pb-2">
              <span>admin name</span>
              <span className="mt-1.5">admin@oneclickmail.com</span>
            </div>
            <button
              className="px-4 cursor-pointer py-1 flex items-center hover:bg-primary hover:text-white duration-300 transition-all"
              onClick={handleLogout}
              disabled={isLoading}
            >
              <LogOut className="mr-4" height={24} width={24} />
              <span>{isLoading ? "Signing out..." : "Sign out"}</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

type NavProps = {
  href: string;
  icon: ReactNode;
  menuTitle: string;
};

const NavItems = ({ href, icon, menuTitle }: NavProps) => {
  const pathname = usePathname();

  // console.log(pathname);
  return (
    <div className="mx-3">
      <Link
        href={href}
        className={`flex items-center justify-start py-2.5 px-4 rounded-md hover:bg-primary text-white ${
          pathname === href && "bg-white/10"
        }`}
      >
        {icon}
        <span className="font-medium text-sm">{menuTitle}</span>
      </Link>
    </div>
  );
};

export default SidebarComponent;
