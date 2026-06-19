"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import { FaExclamationTriangle, FaHome } from "react-icons/fa";

export default function ErrorPage({ error, reset }) {
  return (
    <div className="min-h-screen  flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl p-6 md:p-10 text-center">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-white/20 p-5 rounded-full">
            <FaExclamationTriangle className="text-5xl md:text-6xl text-cyan-500" />
          </div>
        </div>

        {/* Error Code */}
        <h1 className="text-6xl md:text-8xl text-cyan-500 font-black  tracking-wider">
          Oops!
        </h1>

        {/* Title */}
        <h2 className="mt-4 text-2xl md:text-4xl font-bold text-red-500">
          Something went wrong
        </h2>

        {/* Description */}
        <p className="mt-4 text-sm md:text-base text-cyan-100 leading-relaxed max-w-lg mx-auto">
          We couldn&apos;t process your request right now. Please try again or
          return to the homepage.
        </p>

        {/* Error Message */}
        {error?.message && (
          <div className="mt-6 rounded-2xl bg-gradient-to-r from-cyan-500 to-emerald-500 border border-white/10 p-4 text-left overflow-auto">
            <p className="text-black text-sm break-words">{error.message}</p>
          </div>
        )}

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            onPress={() => reset()}
            className="bg-gradient-to-r from-cyan-500 to-emerald-500 hover:bg-cyan-400  font-semibold px-8 w-full sm:w-auto"
            radius="full"
            size="lg"
          >
            Try Again
          </Button>

          <Link href="/" className="w-full sm:w-auto">
            <Button
              startContent={<FaHome />}
              variant="bordered"
              className="border-white  hover:bg-white hover:text-cyan-700 font-semibold px-8 w-full"
              radius="full"
              size="lg"
            >
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
