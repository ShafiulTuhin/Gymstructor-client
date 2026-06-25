"use client";

import { Button } from "@heroui/react";
import Link from "next/link";
import { FiAlertTriangle, FiRefreshCw } from "react-icons/fi";

export default function Error({ error }) {
  return (
    <div className="min-h-screen bg-[#071E22] flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-[#173f40] bg-gradient-to-b from-[#0F3D3E] to-[#071E22] shadow-2xl p-8 text-center relative overflow-hidden">
        {/* subtle glow background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(78,166,24,0.08),transparent_60%)]"></div>

        {/* Icon */}
        <div className="relative flex justify-center mb-5">
          <div className="w-18 h-18 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/30 animate-pulse">
            <FiAlertTriangle className="text-red-400 text-3xl" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-white relative">
          Something went wrong
        </h2>

        {/* Message */}
        <p className="text-gray-400 mt-3 text-sm leading-6 relative">
          {error?.message ||
            "An unexpected error occurred while loading this page. Please try again."}
        </p>

        {/* error hint box */}
        {error?.message && (
          <div className="mt-4 bg-[#071E22] border border-red-500/20 rounded-lg p-3 text-xs text-red-300 text-left break-words">
            {error.message}
          </div>
        )}

        {/* Button */}
        <Link href={"/"}>
          <Button className="cursor-pointer mt-6 w-full py-3 rounded-xl bg-[#4EA618] text-white font-semibold hover:bg-green-600 transition flex items-center justify-center gap-2">
            <FiRefreshCw className="text-sm" />
            Back to Home
          </Button>
        </Link>

        {/* Footer */}
        <p className="text-xs text-gray-500 mt-4 relative">
          Gymstructor system will automatically retry your request
        </p>
      </div>
    </div>
  );
}
