"use client";
import { AdminProvider } from "@/context/AdminProvider";
import React, { ReactNode } from "react";
import AdminDashboardMainPage from "./page";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AdminProvider>
      <AdminDashboardMainPage>{children}</AdminDashboardMainPage>
    </AdminProvider>
  );
}
