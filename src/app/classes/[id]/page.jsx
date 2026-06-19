import ClassDetails from "@/components/dashboard/trainer/classes/ClassDetails";
import AddToFavorite from "@/components/user/AddToFavorite";
import { getSingleClass } from "@/lib/actions/classes";
import { getUserSession } from "@/lib/core/session";
import { Button } from "@heroui/react";
import React from "react";
import { FaHeart } from "react-icons/fa";

const DetailsClassPage = async ({ params }) => {
  const { id } = await params;
  const myClass = await getSingleClass(id);
  const user = await getUserSession();

  return (
    <div className="min-h-screen bg-[#071E22] px-5 py-10">
      <ClassDetails myClass={myClass} />

      {/* ACTION BUTTONS */}
      <div className="max-w-6xl mx-auto flex justify-center">
        <div className="flex gap-4">
          {/* BOOK BUTTON */}
          <Button className="bg-[#4EA618] text-white px-10 py-5 rounded-lg font-semibold hover:bg-green-600 transition">
            Book Class
          </Button>

          {/* FAVORITE BUTTON */}
          <AddToFavorite user={user} myClass={myClass} />
        </div>
      </div>
    </div>
  );
};

export default DetailsClassPage;
