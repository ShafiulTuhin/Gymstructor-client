import React from "react";
import Link from "next/link";
import { FaDumbbell, FaHome, FaExclamationTriangle } from "react-icons/fa";

const NotFound = () => {
  return (
    <section className="min-h-screen bg-[#0F3D3E] flex items-center justify-center px-4">
      <div className="relative w-full max-w-2xl text-center">
        {/* Glow Effects */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#00C2FF]/20 blur-3xl rounded-full" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#4EA618]/20 blur-3xl rounded-full" />

        {/* Card */}
        <div className="relative z-10 bg-gradient-to-b from-[#192425] to-[#0b1220] border border-white/10 rounded-3xl p-10 shadow-2xl">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center">
              <FaExclamationTriangle className="text-red-400 text-3xl" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Page Not Found
          </h1>

          {/* Subtitle */}
          <p className="mt-4 text-gray-300 leading-7">
            Oops! The page you are looking for doesn’t exist or has been moved.
            Please go back to home or explore our classes.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/"
              className="bg-[#4EA618] hover:bg-[#5ab61d] transition px-6 py-3 rounded-xl text-white font-semibold flex items-center justify-center gap-2"
            >
              <FaHome />
              Go Home
            </Link>

            <Link
              href="/classes"
              className="border border-white/20 hover:border-[#00C2FF] hover:text-[#00C2FF] transition px-6 py-3 rounded-xl text-white font-semibold flex items-center justify-center gap-2"
            >
              <FaDumbbell />
              Browse Classes
            </Link>
          </div>

          {/* Footer Text */}
          <p className="mt-8 text-sm text-gray-500">
            Gymstructor — Train smart, stay strong 💪
          </p>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
