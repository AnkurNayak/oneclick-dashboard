import LoginFormComponent from "@/components/admin/login/LoginFormComponent";
import WelcomeMessageBoxComponent from "@/components/admin/login/WelcomeMessageBoxComponent";

export default function LoginPage() {
  return (
    <div className="layout min-h-screen">
      <div className="flex flex-col flex-auto w-full">
        <div className="flex h-full flex-col sm:flex-row items-center md:items-start justify-center md:justify-start flex-auto min-w-0">
          <div className="md:flex md:items-center md:justify-end w-full sm:w-auto md:h-full md:w-1/2 py-8 px-4 sm:p-12 md:p-16 sm:rounded-2xl md:rounded-none sm:shadow md:shadow-none">
            <LoginFormComponent />
          </div>
          <WelcomeMessageBoxComponent />
        </div>
      </div>
    </div>
  );
}
