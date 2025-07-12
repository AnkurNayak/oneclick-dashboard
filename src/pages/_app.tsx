import type { AppProps } from "next/app";
import "@/assets/styles/globals.css";
import { AdminProvider } from "@/context/AdminProvider";
import { usePathname } from "next/navigation";
import AdminDashboardLayout from "./admin/_layout";
import { Toaster } from "sonner";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function MyApp({ Component, pageProps }: AppProps) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");
  return (
    <div className={`${inter.className} flex h-dvh flex-col w-full`}>
      {isAdminRoute ? (
        <AdminProvider>
          <AdminDashboardLayout page={<Component {...pageProps} />} />
        </AdminProvider>
      ) : (
        <Component {...pageProps} />
      )}
      <Toaster />
    </div>
  );
}
