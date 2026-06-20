// export default Profile;
import Image from "next/image";
import Avator from "../../assets/avatar.png";

const Profile = ({ user }) => {
  const { name, email, image, role, createdAt, updatedAt } = user;

  return (
    <div className=" p-6 text-white">
      <div className="mx-auto max-w-5xl">
        {/* PROFILE CARD */}
        <div className="mx-auto w-full max-w-md rounded-2xl border border-[#173f40] bg-[#0F3D3E] p-6 shadow-xl">
          {/* IMAGE SECTION */}
          <div className="relative flex flex-col items-center">
            <div className="relative">
              <Image
                src={image || Avator}
                alt="profile"
                width={110}
                height={110}
                className="rounded-full border-4 border-[#4EA618] object-cover"
              />

              {/* ROLE BADGE */}
              <span className="absolute bottom-2 right-2 rounded-full bg-[#4EA618] px-3 py-1 text-xs font-bold capitalize text-black shadow-md">
                {role}
              </span>
            </div>

            {/* NAME */}
            <h2 className="mt-4 text-xl font-bold">{name}</h2>
            <p className="text-sm text-gray-300">{email}</p>
          </div>

          {/* DETAILS */}
          <div className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between border-b border-[#173f40] pb-2">
              <span className="text-gray-400">Role</span>
              <span className="font-semibold capitalize">{role}</span>
            </div>

            <div className="flex justify-between border-b border-[#173f40] pb-2">
              <span className="text-gray-400">Joined</span>
              <span>
                {new Date(createdAt || Date.now()).toLocaleDateString()}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">Last Updated</span>
              <span>
                {new Date(updatedAt || Date.now()).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* FUTURE SECTION */}
        <div className="mt-8">{/* stats / classes / widgets */}</div>
      </div>
    </div>
  );
};

export default Profile;
