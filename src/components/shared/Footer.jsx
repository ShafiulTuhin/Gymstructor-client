import { FaFacebook, FaInstagram, FaTwitter, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#0F3D3E] via-[#1C2C2E] to-[#0B2E2F] text-white py-12 px-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between gap-10">
        {/* LEFT SIDE */}
        <div className="md:w-1/2">
          <h2 className="text-2xl font-bold text-[#4EA618]">Gymstructor</h2>
          <p className="text-gray-300 mt-2">
            Hire expert trainers and join fitness classes that transform your
            lifestyle.
          </p>

          {/* SOCIAL ICONS */}
          <div className="flex gap-4 mt-5 text-xl">
            <FaFacebook className="cursor-pointer hover:text-[#4EA618]" />
            <FaInstagram className="cursor-pointer hover:text-[#4EA618]" />
            <FaTwitter className="cursor-pointer hover:text-[#4EA618]" />
            <FaEnvelope className="cursor-pointer hover:text-[#4EA618]" />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="md:w-1/2 grid grid-cols-2 gap-8">
          {/* About */}
          <div>
            <h3 className="font-semibold text-[#4EA618] mb-3">About</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="hover:text-white cursor-pointer">Our Mission</li>
              <li className="hover:text-white cursor-pointer">How it Works</li>
              <li className="hover:text-white cursor-pointer">Careers</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-[#4EA618] mb-3">Contact</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="hover:text-white cursor-pointer">Support</li>
              <li className="hover:text-white cursor-pointer">Email Us</li>
              <li className="hover:text-white cursor-pointer">Help Center</li>
            </ul>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-gray-700 mt-10 pt-5 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} Gymstructor. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
