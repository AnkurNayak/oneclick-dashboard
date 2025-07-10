import type { AppProps } from "next/app";
import "@/assets/styles/globals.css";
import { AdminProvider } from "@/context/AdminProvider";
import { usePathname } from "next/navigation";
import AdminDashboardLayout from "./admin/_layout";

export default function MyApp({ Component, pageProps }: AppProps) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");
  return (
    <div>
      {isAdminRoute ? (
        <AdminProvider>
          <AdminDashboardLayout page={<Component {...pageProps} />} />
        </AdminProvider>
      ) : (
        <Component {...pageProps} />
      )}
    </div>
  );
}
