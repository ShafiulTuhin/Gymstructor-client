import Image from "next/image";
import Link from "next/link";
import {
  FaFacebook,
  FaInstagram,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#0F3D3E] via-[#1C2C2E] to-[#0B2E2F] text-white">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* LOGO & ABOUT */}
        <div>
          <div className="flex items-center gap-3">
            <Image
              src={logo}
              alt="Gymstructor Logo"
              width={50}
              height={50}
              className="rounded-lg"
            />
            <h2 className="text-2xl font-bold text-[#4EA618]">Gymstructor</h2>
          </div>

          <p className="mt-4 text-gray-300 text-sm leading-relaxed">
            Connect with certified fitness trainers, book classes, and achieve
            your fitness goals with Gymstructor.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-lg font-semibold text-[#4EA618] mb-4">
            Quick Links
          </h3>

          <ul className="space-y-3 text-gray-300">
            <li>
              <Link href="/" className="hover:text-white">
                Home
              </Link>
            </li>

            <li>
              <Link href="/all-trainers" className="hover:text-white">
                All Trainers
              </Link>
            </li>

            <li>
              <Link href="/all-classes" className="hover:text-white">
                Classes
              </Link>
            </li>

            <li>
              <Link href="/forums" className="hover:text-white">
                Community Forum
              </Link>
            </li>
          </ul>
        </div>

        {/* CONTACT INFO */}
        <div>
          <h3 className="text-lg font-semibold text-[#4EA618] mb-4">
            Contact Information
          </h3>

          <ul className="space-y-3 text-gray-300 text-sm">
            <li className="flex items-center gap-2">
              <FaEnvelope />
              support@gymstructor.com
            </li>

            <li className="flex items-center gap-2">
              <FaPhone />
              +880 1234 567890
            </li>

            <li className="flex items-start gap-2">
              <FaMapMarkerAlt className="mt-1" />
              Dhaka, Bangladesh
            </li>
          </ul>
        </div>

        {/* SOCIAL LINKS */}
        <div>
          <h3 className="text-lg font-semibold text-[#4EA618] mb-4">
            Follow Us
          </h3>

          <div className="flex gap-4 text-2xl">
            <a href="#" className="hover:text-[#4EA618]">
              <FaFacebook />
            </a>

            <a href="#" className="hover:text-[#4EA618]">
              <FaInstagram />
            </a>

            <a href="#" className="hover:text-[#4EA618]">
              <FaXTwitter />
            </a>

            <a href="#" className="hover:text-[#4EA618]">
              <FaEnvelope />
            </a>
          </div>

          <p className="text-gray-400 text-sm mt-4">
            Stay connected with the Gymstructor community.
          </p>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-gray-700 py-5 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Gymstructor. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
