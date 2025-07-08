"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import InputComponent from "../common/InputComponent";

// Login Form
const LoginFormComponent = () => {
  const [loginInput, setLoginInput] = useState<{
    email: string;
    password: string;
  }>({ email: "", password: "" });

  // Get inputs : higher order fn
  const handleInputChange =
    (field: keyof typeof loginInput) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setLoginInput((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  useEffect(() => {
    console.log("login input", loginInput);
  }, [loginInput]);

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
      <div className="mt-8">
        <InputComponent
          label="Email Address*"
          value={loginInput.email}
          onChange={handleInputChange("email")}
          errorMessage="Error Message"
          placeholder="Enter email"
          type="text"
        />
        <InputComponent
          label="Password*"
          value={loginInput.password}
          onChange={handleInputChange("password")}
          type="password"
          errorMessage={!loginInput.password ? "Password is required" : ""}
          placeholder="Enter password"
        />
        <button className="mt-6 h-10 rounded-full bg-primary w-full text-white cursor-pointer">
          Sign in
        </button>
      </div>
    </div>
  );
};

export default LoginFormComponent;
