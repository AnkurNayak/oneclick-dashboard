import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Layout() {
  return (
    <div className="max-h-screen bg-gradient-to-b from-primary to-orange-400 flex flex-col h-full">
      <header className="bg-gray-900 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="w-48 h-16 flex items-center">
            <Image
              src="https://www.oneclickdrive.com/application/views/images/main-logo-mob.svg?v=4"
              loading="eager"
              alt="logo"
              height={20}
              width={34}
              className="w-auto"
            />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex flex-1 w-full">
        <div className="w-full flex items-center justify-center">
          <motion.div
            className="bg-white rounded-md min-w-72 min-h-72 shadow-2xl flex items-center justify-center flex-col gap-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{
              y: [0, -10, 0],
              opacity: 1,
            }}
            transition={{
              y: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              },
              opacity: { duration: 0.5 },
            }}
            whileHover={{
              boxShadow:
                "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
          >
            <Link
              href={"/auth/login"}
              className="flex items-center justify-center rounded-full bg-primary text-white h-10 px-4 cursor-pointer hover:bg-primary-dark transition-colors"
            >
              Login to Admin Dashboard
            </Link>
            <span>Click login to access admin dashboard</span>
          </motion.div>
        </div>
      </main>

      <footer className="bg-gray-900 border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex w-full items-center justify-center">
          <Link
            href={"https://ankurnayak.netlify.app"}
            className="text-center text-gray-500 hover:text-white transition-colors"
          >
            © {new Date().getFullYear()} Made with love ❤️ By Ankur Nayak
          </Link>
        </div>
      </footer>
    </div>
  );
}
