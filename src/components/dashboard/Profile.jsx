import Image from "next/image";
import Avator from "../../assets/avatar.png";

const Profile = ({ user }) => {
  const { name, email, image, role, createdAt, updatedAt } = user;
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#0F3D3E] via-[#1C2C2E] to-[#0B2E2F] p-6">
      {/* PAGE WRAPPER (TOP ALIGNED) */}
      <div className="max-w-5xl mx-auto">
        {/* PROFILE CARD */}
        <div className="w-full max-w-md mx-auto bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-6 text-white">
          {/* PROFILE IMAGE */}
          <div className="flex flex-col items-center relative">
            <div className="relative">
              <Image
                src={image || Avator}
                alt="profile"
                width={110}
                height={110}
                className="rounded-full border-4 border-[#4EA618] object-cover"
              />

              {/* ROLE BADGE */}
              <span className="absolute bottom-2 right-2 bg-[#4EA618] text-black text-xs font-bold px-3 py-1 rounded-full capitalize shadow-md">
                {role}
              </span>
            </div>

            {/* NAME */}
            <h2 className="mt-4 text-xl font-bold">{name}</h2>
            <p className="text-gray-300 text-sm">{email}</p>
          </div>

          {/* DETAILS */}
          <div className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-gray-300">Role</span>
              <span className="capitalize font-semibold">{role}</span>
            </div>

            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-gray-300">Joined</span>
              <span>
                {new Date(createdAt || Date.now()).toLocaleDateString()}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-300">Last Updated</span>
              <span>
                {new Date(updatedAt || Date.now()).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* FUTURE CONTENT AREA */}
        <div className="mt-8 text-white">
          {/* Add dashboard widgets / classes / stats here */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
