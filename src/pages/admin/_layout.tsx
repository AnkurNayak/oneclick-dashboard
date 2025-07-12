import HeaderComponent from "@/components/admin/common/HeaderComponent";
import OverlayScreenComponent from "@/components/admin/common/OverlayScreenComponent";
import SidebarComponent from "@/components/admin/common/SidebarComponent";
import { useAdminManager } from "@/context/AdminProvider";
import { ReactNode, useEffect, useState } from "react";

const AdminDashboardLayout = ({ page }: { page: ReactNode }) => {
  const { ui } = useAdminManager();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // if modal open bodt overflow hidden
  useEffect(() => {
    if (ui.isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [ui.isModalOpen]);

  if (!isMounted) return <div>Loading...</div>;

  return (
    <main
      className={`layout ${ui.theme} text-foreground h-dvh overflow-hidden`}
    >
      <SidebarComponent />
      <div className="flex flex-col flex-auto w-full min-w-0 bg-background">
        <HeaderComponent />
        <div className="flex flex-col flex-auto relative overflow-hidden">
          {page}
        </div>
      </div>
      {ui.isSidenavOpen && <OverlayScreenComponent />}
    </main>
  );
};

export default AdminDashboardLayout;
