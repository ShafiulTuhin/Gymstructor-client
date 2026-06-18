"use client";

import { authClient, signUp } from "@/lib/auth-client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { Description, Label, Radio, RadioGroup } from "@heroui/react";
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

    // const plan = role === "seeker" ? "seeker_free" : " recruiter_free";
    const status = "active";

    const { data: res, error } = await authClient.signUp.email({
      name,
      email,
      password,
      image: photo,
      role,
      status,
      //   plan,
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
    <div className="bg-gradient-to-r from-[#4EA618] via-[#7ED957] to-[#0B2E2F] py-20 px-5">
      <div className="bg-gradient-to-r from-[#0F3D3E] via-[#2E7D32] to-[#4EA618] lg:w-1/2 mx-auto  py-19 rounded-lg px-3 lg:px-0 ">
        <h2 className="mb-1 text-center text-[#000000] font-semibold lg:text-[35px] text-2xl">
          Create account
        </h2>
        <p className="text-center text-[#131313] mb-5 border-b-2 pb-3">
          Fill in the fields to get started
        </p>
        <form
          onSubmit={handleSubmit(handleSubmitForm)}
          className="lg:w-1/2 mx-auto space-y-4 text-white"
        >
          <fieldset className="fieldset ">
            <legend className="fieldset-legend">Name</legend>
            <input
              type="text"
              className="input  bg-gray-300 mt-3 w-full"
              placeholder="John Doe"
              {...register("name", {
                required: "Name field cannot be empty",
              })}
            />
            {errors.name && (
              <p className="text-red-500 font-semibold">
                {errors.name.message}
              </p>
            )}
          </fieldset>
          <fieldset className="fieldset ">
            <legend className="fieldset-legend">Photo Url</legend>
            <input
              type="text"
              className="input  bg-gray-300 mt-3 w-full"
              placeholder="Enter photo Url"
              {...register("photo", {
                required: "Photo url field cannot be empty",
              })}
            />
            {errors.photo && (
              <p className="text-red-500 font-semibold">
                {errors.photo.message}
              </p>
            )}
          </fieldset>
          <fieldset className="fieldset ">
            <legend className="fieldset-legend">Email </legend>
            <input
              type="email"
              className="input  bg-gray-300 mt-3 w-full"
              placeholder="email@email.com"
              {...register("email", {
                required: "Email field cannot be empty",
              })}
            />
            {errors.email && (
              <p className="text-red-500 font-semibold">
                {errors.email.message}
              </p>
            )}
          </fieldset>
          <fieldset className="fieldset relative">
            {" "}
            <legend className="fieldset-legend">Password</legend>{" "}
            <input
              type={isPasswordShow ? "text" : "password"}
              className="input bg-gray-300 mt-3 w-full"
              placeholder="Type here"
              {...register("password", {
                required: "Password cannot be empty",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z]).+$/,
                  message:
                    "Name must contain at least 1 uppercase and 1 lowercase letter",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 font-semibold">
                {errors.password.message}
              </p>
            )}{" "}
            <span
              onClick={() => setIsPasswordShow(!isPasswordShow)}
              className="absolute right-2 top-3 cursor-pointer"
            >
              {isPasswordShow ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
            </span>
          </fieldset>
          {/* Role */}

          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setRole("user")}
              className={`rounded-lg border-2 p-4 transition-all cursor-pointer ${
                role === "user"
                  ? "border-[#4EA618] bg-[#4EA618]/20"
                  : "border-gray-400 hover:border-[#4EA618]"
              }`}
            >
              <h3 className="font-semibold text-white">Member</h3>
              <p className="text-sm text-gray-200">
                Join classes and book trainers.
              </p>
            </button>

            <button
              type="button"
              onClick={() => setRole("trainer")}
              className={`rounded-lg border-2 p-4 transition-all cursor-pointer ${
                role === "trainer"
                  ? "border-[#4EA618] bg-[#4EA618]/20"
                  : "border-gray-400 hover:border-[#4EA618]"
              }`}
            >
              <h3 className="font-semibold text-white">Trainer</h3>
              <p className="text-sm text-gray-200">
                Apply to teach and manage classes.
              </p>
            </button>
          </div>
          <button className="btn bg-gradient-to-r from-[#4EA618] to-gray-400 py-2 py-2 text-white rounded-lg w-full   font-semibold cursor-pointer">
            Register
          </button>
        </form>
        <p className="text-white text-center py-5">Or</p>
        <div className="text-center lg:w-1/2 mx-auto">
          {/* Continue with Google Button */}
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-3 w-full border-4 border-t-[#4EA618] border-r-gray-400 border-b-[#4EA618] border-l-gray-400 rounded-lg py-2 hover:bg-gray-300 transition cursor-pointer"
          >
            <Image
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              // className="w-5 h-5"
              width={30}
              height={30}
            />
            <span className="font-medium text-[#000000]">
              Continue with Google
            </span>
          </button>
          <p className="mt-3 text-[#131313]">
            Already have an account?
            <span
              onClick={() => router.push("/auth/login")}
              className="text-gray-300 cursor-pointer underline font-bold"
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
