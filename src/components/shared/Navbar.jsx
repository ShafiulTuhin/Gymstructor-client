"use client";

import { useState } from "react";
import { Button, Link, Spinner } from "@heroui/react";
import Image from "next/image";
import Logo from "@/assets/logo.png";
// import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  //   const { data, isPending } = authClient.useSession();

  //   const user = data?.user;
  // const session = data?.session;
  // console.log(user, session);

  const router = useRouter();
  const handleLogout = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/");
            toast.success("Logged out successfully", {
              position: "top-center",
              autoClose: 5000,
            });
          },
        },
      });
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  const dashBoardLinks = {
    path: "/dashboard",
  };
  // const dashBoardLinks =
  //   user?.role === "seeker"
  //     ? "/dashboard/seeker"
  //     : user?.role === "recruiter"
  //       ? "/dashboard/recruiter"
  //       : user?.role === "admin"
  //         ? "/dashboard/admin"
  //         : "/auth/login";
  return (
    <nav className="sticky bg-slate-100 top-0 z-50  py-5">
      <div className="lg:px-0 px-4">
        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-6 py-3 backdrop-blur-md shadow-lg">
          {/* Logo */}
          <Link href="/" className="p-0">
            <Image
              src={Logo}
              alt="Logo"
              width={80}
              height={80}
              priority
              className="rounded-lg"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10 ">
            <Link
              href="/"
              className=" text-[#58F63C] font-bold  hover:text-green-600"
            >
              Home
            </Link>

            <Link
              href={dashBoardLinks}
              className=" text-[#58F63C] font-bold  hover:text-green-600"
            >
              Dashboard
            </Link>

            <Link
              href="/classes"
              className=" text-[#58F63C] font-bold  hover:text-green-600"
            >
              All Classes
            </Link>
            <Link
              href="/forums"
              className=" text-[#58F63C] font-bold  hover:text-green-600"
            >
              Community Forum
            </Link>

            <div className="h-5 w-px bg-white/20" />
            {/* {isPending ? (
              <div className="flex justify-center items-center py-1">
                <Spinner size="sm" />
              </div>
            ) : user ? ( 
            <div className="flex gap-4 items-center">
              <div className="flex flex-col">
                <p className="bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent font-semibold text-sm">
                  Welcome!
                </p>

                <p className="font-bold text-sm text-white">Hello</p>
              </div>

              <Button
                //   onClick={handleLogout}
                className="bg-gradient-to-r from-violet-600 to-indigo-500 rounded-lg"
              >
                Logout
              </Button>
            </div>
            {/* ) : (*/}
            <div className="space-x-4">
              <Link
                href="/auth/login"
                className="text-sm font-medium text-violet-400 hover:text-violet-300"
              >
                Sign In
              </Link>
              <Link href="/auth/login">
                <Button
                  radius="lg"
                  className="mt-3 bg-gradient-to-r from-violet-600 to-indigo-500 text-white"
                >
                  Signup
                </Button>
              </Link>
            </div>
            {/* )}  */}
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="menu"
          >
            <svg
              className="h-7 w-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mt-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md md:hidden">
            <div className="flex flex-col p-5">
              <Link href="/" className="text-sm text-gray-300 hover:text-white">
                Home
              </Link>

              <Link
                href={dashBoardLinks}
                className="text-sm text-gray-300 hover:text-white"
              >
                Dashboard
              </Link>

              <Link
                href="/classes"
                className="text-sm text-gray-300 hover:text-white"
              >
                All Classes
              </Link>
              <Link
                href="/forums"
                className="text-sm text-gray-300 hover:text-white"
              >
                Community Forum
              </Link>

              <div className="my-4 h-px bg-white/10" />

              {/* {isPending ? (
                <div className="flex justify-center items-center py-1">
                  <Spinner size="sm" />
                </div>
              ) : user ? (
                <div className="flex justify-between items-center">
                  <div className="flex flex-col">
                    <p className="bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent font-semibold text-sm">
                      Welcome!
                    </p>

                    <p className="font-bold text-sm text-white">{user?.name}</p>
                  </div>

                  <Button
                    onClick={handleLogout}
                    className="
                bg-gradient-to-r
                from-violet-600
                to-indigo-500"
                  >
                    Logout
                  </Button>
                </div>
              ) : ( */}
              <div className="space-x-4">
                <Link
                  href="/auth/login"
                  className="py-3 font-medium text-violet-400"
                >
                  Sign In
                </Link>
                <Link href="/auth/signup">
                  <Button
                    radius="lg"
                    className="mt-3 bg-gradient-to-r from-violet-600 to-indigo-500 text-white"
                  >
                    Signup
                  </Button>
                </Link>
              </div>
              {/* )} */}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
