"use client";

import { authClient } from "@/lib/auth-client";
import { handleGoogleLogin } from "@/lib/common";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

const Login = () => {
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSubmitForm = async (data) => {
    const { email, password } = data;

    const { data: res, error } = await authClient.signIn.email({
      email,
      password,
      rememberMe: true,
      callbackURL: "/",
    });

    if (error) return toast.error(error.message);

    toast.success("Signed in successfully");
  };

  return (
    <div className="min-h-screen bg-[#071E22] flex items-center justify-center px-5">
      <div className="w-full max-w-lg bg-[#0F3D3E] border border-gray-700 rounded-2xl shadow-xl p-8 text-white">
        {/* HEADER */}
        <h2 className="text-3xl font-bold text-center">Welcome Back</h2>
        <p className="text-center text-gray-400 mt-2 mb-6">
          Login to continue your journey
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-5">
          {/* EMAIL */}
          <div>
            <label className="text-sm text-gray-300">Email</label>
            <input
              type="email"
              placeholder="email@example.com"
              className="w-full mt-2 px-4 py-3 rounded-lg bg-[#173f40] text-white outline-none border border-gray-700 focus:border-[#4EA618]"
              {...register("email", {
                required: "Email is required",
              })}
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* PASSWORD */}
          <div className="relative">
            <label className="text-sm text-gray-300">Password</label>
            <input
              type={isPasswordShow ? "text" : "password"}
              placeholder="••••••••"
              className="w-full mt-2 px-4 py-3 rounded-lg bg-[#173f40] text-white outline-none border border-gray-700 focus:border-[#4EA618]"
              {...register("password", {
                required: "Password is required",
              })}
            />

            <span
              onClick={() => setIsPasswordShow(!isPasswordShow)}
              className="absolute right-3 top-10 cursor-pointer text-gray-300"
            >
              {isPasswordShow ? <FaEye /> : <FaEyeSlash />}
            </span>

            {errors.password && (
              <p className="text-red-400 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="cursor-pointer w-full bg-[#4EA618] hover:bg-green-600 transition py-3 rounded-lg font-semibold"
          >
            Login
          </button>
        </form>

        {/* DIVIDER */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gray-700"></div>
          <span className="text-gray-400 text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-700"></div>
        </div>

        {/* GOOGLE */}
        <button
          onClick={handleGoogleLogin}
          className="cursor-pointer w-full flex items-center justify-center gap-3 bg-[#173f40] border border-gray-700 py-3 rounded-lg hover:border-[#4EA618] transition"
        >
          <Image
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            width={24}
            height={24}
          />
          <span className="text-white font-medium">Continue with Google</span>
        </button>

        {/* SIGNUP */}
        <p className="text-center text-gray-400 mt-6">
          Don’t have an account?{" "}
          <span
            onClick={() => router.push("/auth/signup")}
            className="text-[#4EA618] cursor-pointer font-semibold"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
