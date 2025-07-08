"use client";
import { useAdminManager } from "@/context/AdminProvider";
import useUiHelper from "@/hooks/useUiHelper";
import useWindowWidth from "@/hooks/useWindowWidth";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

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
          className="bg-primary dark:bg-sidebar-accent left-0 bottom-0 top-0"
          style={{
            zIndex: 200,
            minWidth: "280px",
            maxWidth: "280px",
            position:
              windowWidth && windowWidth >= 960 ? "relative" : "absolute",
          }}
        >
          SideBar scomponen
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SidebarComponent;
