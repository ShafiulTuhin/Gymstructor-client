"use client";

import { Button } from "@heroui/react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AddToFavorite = ({ user, myClass }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ CHECK ON LOAD
  useEffect(() => {
    const checkFavorite = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/favorites/${user.id}`,
      );
      const data = await res.json();

      const exists = data.find((item) => item._id === myClass._id);

      setIsFavorite(!!exists);
    };

    if (user?.id && myClass?._id) {
      checkFavorite();
    }
  }, [user, myClass]);

  // TOGGLE
  const toggleFavorite = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/favorites/toggle`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.id,
            classId: myClass._id,
          }),
        },
      );

      const data = await res.json();
      setIsFavorite(data.favorite);
      toast.success("Successfully added to your favorites!");
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
