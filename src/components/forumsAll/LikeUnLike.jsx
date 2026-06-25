"use client";

import { getUserToken } from "@/lib/core/token-client";
import { Button } from "@heroui/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function LikeUnlike({ user, forum }) {
  const key = `${user?.id}-${forum?._id}`;

  const [voted, setVoted] = useState(false);
  const [loading, setLoading] = useState(false);

  // restore state after refresh (frontend only fix)
  useEffect(() => {
    const saved = localStorage.getItem(key);
    if (saved === "true") setVoted(true);
  }, [key]);

  const handleVote = async (type) => {
    if (user?.status === "blocked") {
      toast.error("Action restricted by Admin");
      return;
    }
    const token = await getUserToken();
    // console.log(token);

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/forums/vote`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userId: user.id, // ✅ FIXED
            forumId: forum._id,
            vote: type,
          }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Already voted");
        return;
      }

      setVoted(true);
      localStorage.setItem(key, "true");

      toast.success("You have completed your vote");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex lg:mt-0 mt-5 gap-4">
        <Button
          onClick={() => handleVote("like")}
          disabled={voted || loading}
          className={`bg-[#4EA618] text-white px-6 rounded-lg ${
            voted ? "opacity-40 cursor-not-allowed" : ""
          }`}
        >
          Like
        </Button>
        <Button
          onClick={() => handleVote("dislike")}
          disabled={voted || loading}
          className={`bg-red-500 text-white px-6 rounded-lg ${
            voted ? "opacity-40 cursor-not-allowed" : ""
          }`}
        >
          Dislike
        </Button>
      </div>
      <div className="w-[200px] text-gray-300">
        <h2 className="text-2xl mb-4">Note:</h2>
        <p>
          A person is allowed to make one vote only, once you clicked
          like/unlike it will be counted. Can't change your vote again
        </p>
      </div>
    </>
  );
}
