"use client";

import { getUserToken } from "@/lib/core/token-client";
import { Button } from "@heroui/react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AddToFavorite = ({ user, myClass }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ CHECK ON LOAD
  useEffect(() => {
    const checkFavorite = async () => {
      const token = await getUserToken();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/favorites/${user.id}`,
        { headers: { authorization: `Bearer ${token}` } },
      );
      const data = await res.json();
      console.log(data);

      const exists = data.find((item) => item._id === myClass._id);

      setIsFavorite(!!exists);
    };

    if (user?.id && myClass?._id) {
      checkFavorite();
    }
  }, [user, myClass]);

  // TOGGLE
  const toggleFavorite = async () => {
    const token = await getUserToken();
    console.log(token);

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/favorites/toggle`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userId: user.id,
            classId: myClass._id,
          }),
        },
      );

      const data = await res.json();
      setIsFavorite(data.favorite);
      if (data.favorite) {
        toast.success("Added to favorites!");
      } else {
        toast.success("Removed from favorites!");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={toggleFavorite}
      disabled={loading}
      className={`px-10 py-5 rounded-lg font-semibold transition ${
        isFavorite ? "bg-red-500 text-white" : "bg-gray-700 text-white"
      }`}
    >
      {isFavorite ? "Remove Favorite" : "Add to Favorite"}
    </Button>
  );
};

export default AddToFavorite;
