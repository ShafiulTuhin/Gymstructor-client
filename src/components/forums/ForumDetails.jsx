"use client";
import { createComment } from "@/lib/actions/forums";
import Image from "next/image";
import React, { useState } from "react";
import { FaCalendarAlt, FaUserCircle } from "react-icons/fa";
import { toast } from "react-toastify";

const ForumDetails = ({ forum, user }) => {
  const { _id, title, image, authorName, description, createdAt } = forum;
  const [comment, setComment] = useState("");
  const [forumData, setForumData] = useState(forum);

  // const handleSubmit = async () => {
  //   if (!comment.trim()) return;
  //   if (user?.status === "blocked") {
  //     toast.error("Action restricted by Admin");
  //   }

  //   try {
  //     const res = await createComment(_id, user, comment);

  //     if (res?.success) {
  //       const newComment = res.data;

  //       // 👇 update UI instantly (NO REFRESH)
  //       setForumData((prev) => ({
  //         ...prev,
  //         comments: [...(prev.comments || []), newComment],
  //       }));

  //       setComment("");
  //       toast.success("Comment added");
  //     } else {
  //       toast.error("Failed to add comment");
  //     }
  //   } catch (error) {
  //     toast.error("Something went wrong");
  //   }
  // };
  const handleSubmit = async () => {
    if (!comment.trim()) return;

    // ✅ BLOCK CHECK FIRST
    if (user?.status === "blocked") {
      toast.error("Action restricted by Admin");
      return;
    }

    try {
      const res = await createComment(_id, user, comment);

      if (res?.success) {
        const newComment = res.data;

        setForumData((prev) => ({
          ...prev,
          comments: [...(prev.comments || []), newComment],
        }));

        setComment("");
        toast.success("Comment added");
      } else {
        toast.error("Failed to add comment");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <section className="min-h-screen bg-[#0F3D3E] py-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Article Container */}
        <article className="bg-gradient-to-b from-[#4EA618] to-[#192425] rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-black/40">
          {/* Featured Image */}
          <div className="relative flex justify-center px-4 pt-4">
            <div className="w-full max-w-4xl relative group">
              <Image
                src={image || "/placeholder.png"}
                alt={title || "forum image"}
                width={900}
                height={500}
                // className="w-full h-[260px] md:h-[450px] object-cover rounded-xl"
                className="w-full h-[260px] md:h-[450px] object-cover rounded-2xl transition-transform duration-300 group-hover:scale-[1.01]"
              />

              {/* <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-black/20 to-transparent rounded-xl" /> */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/95 via-black/25 to-transparent rounded-2xl" />
            </div>
          </div>

          {/* CONTENT + COMMENT LAYOUT */}
          <div className="px-6 md:px-12 py-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* LEFT - COMMENTS */}
              <div className="lg:col-span-1 bg-[#071E22] rounded-2xl p-5 border border-white/10 h-fit">
                <h2 className="text-white text-xl font-semibold mb-4">
                  Comments
                </h2>

                {/* Input */}
                <div className="flex flex-col gap-3">
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Write your comment..."
                    className="w-full h-28 p-3 rounded-lg bg-[#0F3D3E] text-white border border-white/10 focus:outline-none focus:border-[#4EA618]"
                  />

                  <button
                    onClick={handleSubmit}
                    className="bg-[#4EA618] hover:bg-green-600 transition text-white py-2 rounded-lg font-semibold cursor-pointer"
                  >
                    Comment
                  </button>
                </div>

                {/* Previous Comments (UI only) */}
                <div className="mt-6 space-y-3">
                  {forumData?.comments?.length > 0 ? (
                    forumData.comments.map((c) => (
                      <div
                        key={c._id}
                        className="bg-[#0F3D3E] p-3 rounded-lg border border-white/10"
                      >
                        <p className="text-white text-sm">{c.text}</p>
                        <span className="text-xs text-gray-400">
                          by {c.userName}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400 text-sm">No comments yet</p>
                  )}
                </div>
              </div>

              {/* RIGHT - ORIGINAL CONTENT */}
              <div className="lg:col-span-2">
                {/* Title */}
                <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                  {title}
                </h1>

                {/* Author & Date */}
                <div className="flex flex-wrap items-center gap-6 mt-6 text-gray-400 border-b border-white/10 pb-6">
                  <div className="flex items-center gap-2">
                    <FaUserCircle className="text-[#00C2FF] text-xl" />
                    <span>{authorName}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-[#00C2FF]" />
                    <span>
                      {createdAt
                        ? new Date(createdAt).toLocaleDateString("en-US", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })
                        : "Unknown Date"}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div className="mt-10">
                  <p className="text-gray-300 leading-9 text-lg whitespace-pre-line">
                    {description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};

export default ForumDetails;
