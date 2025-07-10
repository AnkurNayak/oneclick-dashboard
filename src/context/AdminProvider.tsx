"use client";

import { createContext, ReactNode, useContext, useState } from "react";

// To manage ui
interface UIManager {
  isSidenavOpen: boolean;
  theme: "dark" | "light";
  isModalOpen: boolean;
}

// All types for admin
interface AdminContextType {
  ui: UIManager;
  // fns
  setUiState: React.Dispatch<React.SetStateAction<UIManager>>;
}

// Get theme from storage
const getInitialTheme = (): "dark" | "light" => {
  if (typeof window !== "undefined") {
    const theme = window.localStorage.getItem("theme");
    return theme === "dark" || theme === "light" ? theme : "light";
  }
  return "light";
};

// Initial States
const initialStates = {
  // Ui states
  ui: {
    isSidenavOpen: false,
    theme: getInitialTheme(),
    isModalOpen: false,
  },
};

// Context
const AdminContext = createContext<AdminContextType | undefined>(undefined);

// Provider
const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [uiState, setUiState] = useState(initialStates.ui);

  const exportVal: AdminContextType = {
    ui: uiState,
    // functions
    setUiState,
  };

  return (
    <AdminContext.Provider value={exportVal}>{children}</AdminContext.Provider>
  );
};

// use hook
const useAdminManager = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("Use this hook inside AdminProvider");
  }
  return context;
};

export { AdminProvider, useAdminManager };
