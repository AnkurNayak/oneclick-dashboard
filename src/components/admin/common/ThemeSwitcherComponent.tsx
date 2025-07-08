"use client";
import { useAdminManager } from "@/context/AdminProvider";
import useUiHelper from "@/hooks/useUiHelper";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

const themeBtnClass =
  "text-xs cursor-pointer font-medium flex items-center gap-2 px-3 md:pl-3 md:pr-3.5 py-3 md:py-1.5 transition-colors relative z-10";

const ThemeSwitcherComponent = () => {
  const { handleTheme } = useUiHelper();
  const { ui } = useAdminManager();

  return (
    <div className="relative flex w-fit items-center rounded-full">
      <button
        className={`${themeBtnClass}`}
        onClick={() => {
          handleTheme("dark");
        }}
      >
        <Moon className="relative z-10" height={16} width={16} />
      </button>
      <button
        className={`${themeBtnClass}`}
        onClick={() => {
          handleTheme("light");
        }}
      >
        <Sun className="relative z-10" height={16} width={16} />
      </button>
      <div
        className={`absolute inset-0 z-0 flex ${
          ui.theme === "light" ? "justify-end" : "justify-start"
        }`}
      >
        <motion.span
          layout
          transition={{ damping: 15, stiffness: 250 }}
          className="h-full w-1/2 rounded-full bg-gradient-to-r from-orange-600 to-orange-400"
        />
      </div>
    </div>
  );
};

export default ThemeSwitcherComponent;
