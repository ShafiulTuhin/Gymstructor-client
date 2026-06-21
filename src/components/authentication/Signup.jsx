"use client";

import { authClient, signUp } from "@/lib/auth-client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { handleGoogleLogin } from "@/lib/common";

const Signup = () => {
  const [isPasswordShow, setIsPasswordShow] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      role: "user",
    },
  });

  const router = useRouter();
  const [role, setRole] = useState("user");

  const handleSubmitForm = async (data) => {
    const { name, email, password, photo } = data;

    const status = "active";

    const { data: res, error } = await authClient.signUp.email({
      name,
      email,
      password,
      image: photo,
      role,
      status,
      callbackURL: "/",
    });

    if (error) {
      toast.error(error.message);
    }

    if (res) {
      toast.success("Signup successful");
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen bg-[#071E22] flex items-center justify-center px-5 py-10">
      <div className="w-full max-w-2xl bg-[#0F3D3E] border border-gray-700 rounded-2xl shadow-xl p-8 text-white">
        {/* HEADER */}
        <h2 className="text-3xl font-bold text-center">Create Account</h2>
        <p className="text-center text-gray-400 mt-2 mb-6">
          Fill in the fields to get started
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-5">
          {/* NAME */}
          <div>
            <label className="text-sm text-gray-300">Name</label>
            <input
              type="text"
              className="w-full mt-2 px-4 py-3 rounded-lg bg-[#173f40] text-white outline-none border border-gray-700 focus:border-[#4EA618]"
              placeholder="John Doe"
              {...register("name", {
                required: "Name field cannot be empty",
              })}
            />
            {errors.name && (
              <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* PHOTO */}
          <div>
            <label className="text-sm text-gray-300">Photo URL</label>
            <input
              type="text"
              className="w-full mt-2 px-4 py-3 rounded-lg bg-[#173f40] text-white outline-none border border-gray-700 focus:border-[#4EA618]"
              placeholder="Enter photo URL"
              {...register("photo", {
                required: "Photo url field cannot be empty",
              })}
            />
            {errors.photo && (
              <p className="text-red-400 text-sm mt-1">
                {errors.photo.message}
              </p>
            )}
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm text-gray-300">Email</label>
            <input
              type="email"
              className="w-full mt-2 px-4 py-3 rounded-lg bg-[#173f40] text-white outline-none border border-gray-700 focus:border-[#4EA618]"
              placeholder="email@example.com"
              {...register("email", {
                required: "Email field cannot be empty",
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
              className="w-full mt-2 px-4 py-3 rounded-lg bg-[#173f40] text-white outline-none border border-gray-700 focus:border-[#4EA618]"
              placeholder="••••••••"
              {...register("password", {
                required: "Password cannot be empty",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z]).+$/,
                  message: "Must contain uppercase and lowercase letter",
                },
              })}
            />

            <span
              onClick={() => setIsPasswordShow(!isPasswordShow)}
              className="absolute right-3 top-13 cursor-pointer text-gray-300"
            >
              {isPasswordShow ? <FaEye /> : <FaEyeSlash />}
            </span>

            {errors.password && (
              <p className="text-red-400 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* ROLE */}
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setRole("user")}
              className={`rounded-lg border p-4 transition ${
                role === "user"
                  ? "border-[#4EA618] bg-[#4EA618]/20"
                  : "border-gray-700"
              }`}
            >
              Member
            </button>

            <button
              type="button"
              onClick={() => setRole("trainer")}
              className={`rounded-lg border p-4 transition ${
                role === "trainer"
                  ? "border-[#4EA618] bg-[#4EA618]/20"
                  : "border-gray-700"
              }`}
            >
              Trainer
            </button>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-[#4EA618] hover:bg-green-600 transition py-3 rounded-lg font-semibold cursor-pointer"
          >
            Register
          </button>
        </form>

        {/* GOOGLE */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gray-700"></div>
          <span className="text-gray-400 text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-700"></div>
        </div>

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

        <p className="text-center text-gray-400 mt-6">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/auth/login")}
            className="text-[#4EA618] cursor-pointer font-semibold"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
