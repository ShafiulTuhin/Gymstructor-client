"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import { FiArrowLeft, FiHome, FiLock } from "react-icons/fi";
import { motion } from "framer-motion";

const UnauthorizedPage = () => {
  return (
    <div className="min-h-screen bg-[#0F3D3E]  flex items-center justify-center px-4 overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#00C2FF]/20 blur-3xl rounded-full" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#4EA618]/20 blur-3xl rounded-full" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-lg w-full"
      >
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-10 text-center">
          {/* Lock Icon */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{
              repeat: Infinity,
              duration: 2,
            }}
            className="mx-auto w-24 h-24 rounded-full bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center mb-6"
          >
            <FiLock className="text-cyan-400 text-5xl" />
          </motion.div>

          {/* Error Code */}
          <h1 className="text-7xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            403
          </h1>

          <h2 className="text-3xl font-bold text-white mt-3">Access Denied</h2>

          <p className="text-gray-400 mt-4 leading-7">
            Sorry, you don't have permission to access this page.
            <br />
            Please log in with the appropriate account or return to a page you
            have access to.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Link href={"/"}>
              <Button
                color="primary"
                size="lg"
                startContent={<FiHome />}
                className="font-semibold bg-[#4EA618] hover:bg-green-600 transition rounded-lg"
              >
                Back to Home
              </Button>
            </Link>

            <Link href={"/classes"}>
              {" "}
              <Button
                variant="bordered"
                size="lg"
                startContent={<FiArrowLeft />}
                className="border-white/20 text-white hover:bg-white/10 rounded-lg"
              >
                Browse Classes
              </Button>
            </Link>
          </div>
        </div>

        <p className="text-center text-gray-500 text-sm mt-6">
          HireLoop • Secure Access Protected
        </p>
      </motion.div>
    </div>
  );
};

export default UnauthorizedPage;
