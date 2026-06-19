"use client";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Avatar from "@/assets/avatar.png";

const User = () => {
  const { data } = authClient.useSession();
  const user = data?.user;
  // console.log(user);

  return (
    <div className="flex gap-2 items-center mb-10">
      <Image
        src={Avatar}
        alt="User_Img"
        width={50}
        height={50}
        className="rounded-full"
      />
      <div>
        <h2 className="text-white font-bold text-[20px]">{user?.name}</h2>
        <h2 className="text-[#131313] font-semibold">
          {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
        </h2>
      </div>
    </div>
  );
};

export default User;
