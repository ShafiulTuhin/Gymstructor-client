// "use client";

// import { authClient } from "@/lib/auth-client";
// import { handleGoogleLogin } from "@/lib/common";

// import Image from "next/image";
// import { useRouter } from "next/navigation";

// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { toast } from "react-toastify";

// const Login = () => {
//   const [isPasswordShow, setIsPasswordShow] = useState(false);
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();
//   const router = useRouter();
//   const handleSubmitForm = async (data) => {
//     const { email, password } = data;

//     const { data: res, error } = await authClient.signIn.email({
//       email,
//       password,
//       rememberMe: true,
//       callbackURL: "/",
//     });

//     if (error) {
//       toast.error(error.message);
//     }

//     if (res) {
//       toast.success("sign in successfully");
//     }
//   };

//   return (
//     <div className="bg-gradient-to-r from-[#4EA618] via-[#7ED957] to-[#0B2E2F] py-20 px-5">
//       <div className="bg-gradient-to-r from-[#0F3D3E] via-[#2E7D32] to-[#4EA618] lg:w-1/2 mx-auto  py-19 rounded-lg px-3 lg:px-0">
//         <h2 className="mb-1 text-center text-[#000000] font-semibold lg:text-[35px] text-2xl">
//           Welcome Back!
//         </h2>
//         <p className="text-center text-[#131313] mb-5 pb-3 border-b-2">
//           Enter your credentials to access your account
//         </p>
//         <form
//           onSubmit={handleSubmit(handleSubmitForm)}
//           className="lg:w-1/2 mx-auto space-y-4 text-white"
//         >
//           <fieldset className="fieldset ">
//             <legend className="fieldset-legend">Email address</legend>
//             <input
//               type="email"
//               className="input  bg-gray-300 mt-3 w-full"
//               placeholder="email@email.com"
//               {...register("email", {
//                 required: "Email field cannot be empty",
//               })}
//             />
//             {errors.email && (
//               <p className="text-red-500 font-semibold">
//                 {errors.email.message}
//               </p>
//             )}
//           </fieldset>
//           <fieldset className="fieldset relative">
//             <legend className="fieldset-legend">Password</legend>
//             <div className="flex -gap-10">
//               <input
//                 type={isPasswordShow ? "text" : "password"}
//                 className="input bg-gray-300 mt-3 w-full"
//                 placeholder="Type here"
//                 {...register("password", {
//                   required: "Password cannot be empty",
//                 })}
//               />
//               <span
//                 onClick={() => setIsPasswordShow(!isPasswordShow)}
//                 className="absolute right-2 top-5 cursor-pointer"
//               >
//                 {isPasswordShow ? (
//                   <FaEye size={20} />
//                 ) : (
//                   <FaEyeSlash size={20} />
//                 )}
//               </span>
//             </div>

//             {errors.password && (
//               <p className="text-red-500 font-semibold">
//                 {errors.password.message}
//               </p>
//             )}
//           </fieldset>
//           <button className="btn bg-gradient-to-r from-[#4EA618] to-gray-400 py-2 text-white hover:opacity-90 transition rounded-lg w-full font-semibold cursor-pointer">
//             Login
//           </button>
//         </form>
//         <p className="text-white text-center py-5">Or</p>
//         <div className="text-center lg:w-1/2 mx-auto">
//           {/* Continue with Google Button */}
//           <button
//             onClick={handleGoogleLogin}
//             type="submit"
//             className="flex items-center justify-center gap-3 w-full border border-4 border-t-[#4EA618] border-r-gray-400 border-b-[#4EA618] border-l-gray-400 rounded-lg py-2 hover:bg-gray-100 transition cursor-pointer"
//           >
//             <Image
//               src="https://www.svgrepo.com/show/475656/google-color.svg"
//               alt="Google"
//               // className="w-5 h-5"
//               width={30}
//               height={30}
//             />
//             <span className="font-medium text-[#131313] font-bold">
//               Continue with Google
//             </span>
//           </button>
//           <p className="mt-3 text-[#131313]">
//             Don't have an account ?
//             <span
//               onClick={() => router.push("/auth/signup")}
//               className="text-gray-300 cursor-pointer underline font-bold  "
//             >
//               Register
//             </span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
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
            className="w-full bg-[#4EA618] hover:bg-green-600 transition py-3 rounded-lg font-semibold"
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
          className="w-full flex items-center justify-center gap-3 bg-[#173f40] border border-gray-700 py-3 rounded-lg hover:border-[#4EA618] transition"
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
