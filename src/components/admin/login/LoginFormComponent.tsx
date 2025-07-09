"use client";
import Image from "next/image";
import InputComponent from "../common/InputComponent";
import { login } from "@/lib/api.service";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormData, loginSchema } from "@/lib/schema/LoginFormSchema";
import { LoaderCircle } from "lucide-react";
import { RedirectType, redirect } from "next/navigation";

// Login Form
const LoginFormComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = async (data: LoginFormData) => {
    const response = await login({
      email: data.email,
      password: data.password,
    });
    if (response.success) {
      redirect("/admin/dashboard", RedirectType.push);
    }
  };

  return (
    <div className="w-full max-w-80 sm:w-80 mx-auto sm:mx-0">
      <div className="w-48">
        <Image
          src="https://www.oneclickdrive.com/application/views/images/main-logo-mob.svg?v=4"
          loading="eager"
          alt="logo"
          height={20}
          width={34}
          className="w-auto"
        />
      </div>
      <div className="mt-8 text-4xl font-extrabold tracking-tight leading-tight">
        Admin sign in
      </div>
      <form className="mt-8" onSubmit={handleSubmit(handleLogin)}>
        <InputComponent
          {...register("email")}
          label="Email Address*"
          placeholder="Enter email"
          type="text"
          errorMessage={errors.email?.message}
        />
        <InputComponent
          {...register("password")}
          label="Password*"
          type="password"
          placeholder="Enter password"
          errorMessage={errors.password?.message}
        />
        <button
          className={`"mt-6 h-10 rounded-full w-full text-white flex items-center justify-center cursor-pointer ${
            isSubmitting ? "bg-gray-300" : "bg-primary"
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? <LoaderCircle className="animate-spin" /> : "Sign in"}
        </button>
      </form>
    </div>
  );
};

export default LoginFormComponent;
