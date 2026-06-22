"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import { FiArrowLeft, FiHome, FiLock } from "react-icons/fi";
import { motion } from "framer-motion";

const UnauthorizedPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-[#0b1220] flex items-center justify-center px-4 overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute w-96 h-96 bg-cyan-500/10 blur-[140px] rounded-full -top-24 -left-20" />
      <div className="absolute w-96 h-96 bg-blue-600/10 blur-[140px] rounded-full bottom-0 right-0" />

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
            <Link href={"/j"}>
              <Button
                color="primary"
                size="lg"
                startContent={<FiHome />}
                className="font-semibold"
              >
                Back to Home
              </Button>
            </Link>

            <Button
              variant="bordered"
              size="lg"
              startContent={<FiArrowLeft />}
              className="border-white/20 text-white hover:bg-white/10"
              onPress={() => window.history.back()}
            >
              Go Back
            </Button>
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
