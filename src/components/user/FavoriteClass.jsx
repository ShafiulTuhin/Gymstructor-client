"use client";

import Image from "next/image";
import Link from "next/link";
import { FiEye, FiTrash2 } from "react-icons/fi";
import ClassDetails from "../dashboard/trainer/classes/ClassDetails";
import AllClasses from "../dashboard/common/AllClasses";

const FavoriteClass = ({ favClasses = [] }) => {
  console.log(favClasses);

  if (!favClasses.length) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="text-gray-400 text-lg">No favorite classes found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#071E22] px-5 py-10">
      <AllClasses classes={favClasses} />
    </div>
  );
};

export default FavoriteClass;
