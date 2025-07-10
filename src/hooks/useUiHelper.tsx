import { useAdminManager } from "@/context/AdminProvider";

export default function useUiHelper() {
  const { ui, setUiState } = useAdminManager();

  // ToggleSidenav
  const toggleSidenav = () => {
    setUiState((pv) => ({ ...pv, isSidenavOpen: !ui.isSidenavOpen }));
  };

  // handle Sidenav : if it's necessary to maintain sidenav mode
  const handleSidenav = (isOpen: boolean) => {
    setUiState((pv) => ({ ...pv, isSidenavOpen: isOpen }));
  };

  // modal
  const handleModal = (isOpen: boolean) => {
    setUiState((pv) => ({ ...pv, isModalOpen: isOpen }));
  };

  // toggle Theme
  const handleTheme = (theme: "dark" | "light") => {
    if (window !== undefined) {
      localStorage.setItem("theme", theme);
    }
    setUiState((pv) => ({ ...pv, theme: theme }));
  };

  return { toggleSidenav, handleSidenav, handleTheme, handleModal };
}
