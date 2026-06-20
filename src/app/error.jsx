"use client";

import Link from "next/link";
import { FiAlertTriangle } from "react-icons/fi";

export default function Error({ error, reset }) {
  return (
    <div className="min-h-screen bg-[#071E22] flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-[#173f40] bg-gradient-to-b from-[#0F3D3E] to-[#071E22] shadow-2xl p-8 text-center">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/30">
            <FiAlertTriangle className="text-red-400 text-3xl" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-white">Something went wrong</h2>

        {/* Message */}
        <p className="text-gray-400 mt-3 text-sm leading-6">
          {error?.message ||
            "An unexpected error occurred while loading this page."}
        </p>

        {/* Action button */}
        <Link href={"/"}>
          <button className="mt-6 w-full py-3 rounded-xl bg-[#4EA618] text-white font-semibold hover:bg-green-600 transition cursor-pointer">
            Back To Home
          </button>
        </Link>

        {/* Footer hint */}
        <p className="text-xs text-gray-500 mt-4">
          Gymstructor system will reload this page
        </p>
      </div>
    </div>
  );
}
