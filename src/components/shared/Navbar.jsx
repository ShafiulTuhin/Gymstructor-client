"use client";

import { useState } from "react";
import { Button, Link, Spinner } from "@heroui/react";
import Image from "next/image";
import Logo from "@/assets/logo.png";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Avator from "../../assets/avatar.png";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data, isPending } = authClient.useSession();

  const user = data?.user;
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
              autoClose: 3000,
            });
          },
        },
      });
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  const dashBoardLinks =
    user?.role === "user"
      ? "/dashboard/user"
      : user?.role === "trainer"
        ? "/dashboard/trainer"
        : user?.role === "admin"
          ? "/dashboard/admin"
          : "/auth/login";
  return (
    <nav className="sticky bg-slate-300 top-0 z-50 ">
      <div className="">
        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-6 py-3 backdrop-blur-md shadow-lg">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link href="/">
              <Image
                src={Logo}
                alt="Logo"
                width={80}
                height={80}
                priority
                className="rounded-3xl"
              />
            </Link>
            <h2 className="text-2xl font-bold -mt-4">
              gym
              <span className="bg-gradient-to-r from-[#192425] to-[#4EA618] bg-clip-text text-transparent  text-3xl font-extrabold">
                S
              </span>
              tructor
            </h2>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10 ">
            <Link
              href="/"
              className=" text-[#4EA618] font-bold  hover:text-[#192425]"
            >
              Home
            </Link>

            <Link
              href={dashBoardLinks}
              className=" text-[#4EA618] font-bold  hover:text-[#192425]"
            >
              Dashboard
            </Link>

            <Link
              href="/classes"
              className=" text-[#4EA618] font-bold  hover:text-[#192425]"
            >
              All Classes
            </Link>
            <Link
              href="/forums"
              className=" text-[#4EA618] font-bold  hover:text-[#192425]"
            >
              Community Forum
            </Link>

            <div className="h-5 w-px bg-white/20" />
            {isPending ? (
              <div className="flex justify-center items-center py-1">
                <Spinner size="sm" />
              </div>
            ) : user ? (
              <div className="flex gap-4 items-center">
                <Image
                  src={user?.image || Avator}
                  alt={user?.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <p className="bg-gradient-to-r from-[#192425] to-[#4EA618] bg-clip-text text-transparent font-bold ">
                    Welcome!
                  </p>

                  <p className="font-bold text-sm bg-[#4EA618] hover:bg-green-600 transition bg-clip-text text-transparent">
                    {user?.name}
                  </p>
                </div>

                <Button
                  onClick={handleLogout}
                  className="bg-[#4EA618] hover:bg-green-600 transition text-white rounded-lg"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="space-x-4">
                <Link
                  href="/auth/login"
                  className="font-medium text-[#4EA618] hover:text-violet-300"
                >
                  Sign In
                </Link>
                <Link href="/auth/signup">
                  <Button
                    radius="lg"
                    className="bg-[#4EA618] hover:bg-green-600 transition  text-white rounded-lg"
                  >
                    Signup
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden "
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
            <div className="flex flex-col gap-4 p-5">
              <Link
                href="/"
                className="text-[#4EA618] font-bold  hover:text-[#192425]"
              >
                Home
              </Link>

              <Link
                href={dashBoardLinks}
                className="text-[#4EA618] font-bold  hover:text-[#192425]"
              >
                Dashboard
              </Link>

              <Link
                href="/classes"
                className="text-[#4EA618] font-bold  hover:text-[#192425]"
              >
                All Classes
              </Link>
              <Link
                href="/forums"
                className="text-[#4EA618] font-bold  hover:text-[#192425]"
              >
                Community Forum
              </Link>

              <div className="my-4 h-px bg-white/10" />

              {isPending ? (
                <div className="flex justify-center items-center py-1">
                  <Spinner size="sm" />
                </div>
              ) : user ? (
                <div className="flex justify-between items-center">
                  <div className="flex flex-col">
                    <p className="bg-gradient-to-r from-[#192425] to-[#4EA618] bg-clip-text text-transparent font-semibold text-sm">
                      Welcome!
                    </p>

                    <p className="font-bold text-sm bg-[#4EA618] hover:bg-green-600 transition bg-clip-text text-transparent">
                      {user?.name}
                    </p>
                  </div>

                  <Button
                    onClick={handleLogout}
                    className="
                bg-[#4EA618] hover:bg-green-600 transition"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <Link
                    href="/auth/login"
                    className="py-3 font-medium text-[#4EA618]"
                  >
                    Sign In
                  </Link>
                  <Link href="/auth/signup">
                    <Button
                      radius="lg"
                      className="bg-[#4EA618] hover:bg-green-600 transition text-white"
                    >
                      Signup
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
