"use client";
import { Button } from "@heroui/react";
import Link from "next/link";
import { toast } from "react-toastify";

export default function BookNowButton({ user, myClass, isBooked }) {
  const handleBlockedUser = (e) => {
    if (user?.status === "blocked") {
      e.preventDefault();
      toast.error("Action restricted by Admin");
    }
  };

  return (
    <div className="flex gap-4">
      {isBooked && isBooked ? (
        <Button
          disabled
          className="bg-gray-600 text-white px-10 py-5 rounded-lg font-semibold cursor-not-allowed"
        >
          Already Booked
        </Button>
      ) : (
        <Link href={`/payment/${myClass._id}`}>
          <Button
            onClick={handleBlockedUser}
            className="bg-[#4EA618] text-white px-10 py-5 rounded-lg font-semibold hover:bg-green-600 transition"
          >
            Book Class
          </Button>
        </Link>
      )}

      {/* <AddToFavorite user={user} myClass={myClass} /> */}
    </div>
  );
}
