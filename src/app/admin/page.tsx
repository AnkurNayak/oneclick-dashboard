import HeaderComponent from "@/components/admin/common/HeaderComponent";
import OverlayScreenComponent from "@/components/admin/common/OverlayScreenComponent";
import SidebarComponent from "@/components/admin/common/SidebarComponent";
import { useAdminManager } from "@/context/AdminProvider";
import { ReactNode, useEffect, useState } from "react";

const AdminDashboardMainPage = ({ children }: { children: ReactNode }) => {
  const { ui } = useAdminManager();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <div>Loading...</div>;

  return (
    <main className={`layout ${ui.theme}`}>
      <SidebarComponent />
      <div className="flex flex-col flex-auto w-full min-w-0 bg-background">
        <HeaderComponent />
        <div className="flex flex-col flex-auto">{children}</div>
      </div>
      {ui.isSidenavOpen && <OverlayScreenComponent />}
    </main>
  );
};

export default AdminDashboardMainPage;
