"use client";
import {
  createComment,
  deleteComment,
  // editComment,
} from "@/lib/actions/forums";
import Image from "next/image";
import React, { useState } from "react";
import { FaCalendarAlt, FaUserCircle } from "react-icons/fa";
import { toast } from "react-toastify";

const ForumDetails = ({ forum, user }) => {
  const { _id, title, image, authorName, description, createdAt } = forum;
  const [comment, setComment] = useState("");
  const [forumData, setForumData] = useState(forum);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  // console.log(user);

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
  const editComment = async (forumId, commentId, userId, text) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/forums/${forumId}/comments/${commentId}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, text }),
      },
    );

    return res.json(); // ✅ IMPORTANT
  };
  const handleEdit = async (commentId) => {
    if (!editText.trim()) return;

    try {
      const res = await editComment(_id, commentId, user.id, editText);

      if (res?.success) {
        setForumData((prev) => ({
          ...prev,
          comments: prev.comments.map((c) =>
            c._id === commentId ? { ...c, text: editText } : c,
          ),
        }));

        setEditingId(null);
        setEditText("");
        toast.success("Comment updated");
      } else {
        toast.error(res?.message || "Update failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };
  const handleDelete = async (commentId) => {
    try {
      const res = await deleteComment(_id, commentId, user.id);

      if (res?.success) {
        setForumData((prev) => ({
          ...prev,
          comments: prev.comments.filter((c) => c._id !== commentId),
        }));

        toast.success("Comment deleted");
      } else {
        toast.error(res?.message || "Delete failed");
      }
    } catch (err) {
      console.error(err);
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
                  {/* {forumData?.comments?.length > 0 ? (
                    [...forumData.comments]
                      .reverse()
                      .slice(0, 3)
                      .map((c) => (
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
                  )} */}
                  {forumData?.comments?.length > 0 ? (
                    [...forumData.comments]
                      .slice()
                      .reverse()
                      .slice(0, 3)
                      .map((c) => (
                        <div
                          key={c._id}
                          className="bg-[#0F3D3E] p-3 rounded-lg border border-white/10"
                        >
                          {/* TEXT OR EDIT MODE */}
                          {editingId === c._id ? (
                            <div className="flex flex-col gap-2">
                              <textarea
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                className="w-full p-2 rounded bg-[#071E22] text-white"
                              />

                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleEdit(c._id)}
                                  className="px-3 py-1 bg-[#4EA618] text-white rounded"
                                >
                                  Save
                                </button>

                                <button
                                  onClick={() => setEditingId(null)}
                                  className="px-3 py-1 bg-gray-600 text-white rounded"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <p className="text-white text-sm">{c.text}</p>
                          )}

                          <div className="flex justify-between items-center mt-2">
                            <span className="text-xs text-gray-400">
                              by {c.userName}
                            </span>

                            {/* OWNER ONLY ACTIONS */}
                            {String(c.userId) === String(user?.id) && (
                              <div className="flex gap-2 text-xs">
                                <button
                                  onClick={() => {
                                    setEditingId(c._id);
                                    setEditText(c.text);
                                  }}
                                  className="text-blue-400"
                                >
                                  Edit
                                </button>

                                <button
                                  onClick={() => handleDelete(c._id)}
                                  className="text-red-400"
                                >
                                  Delete
                                </button>
                              </div>
                            )}
                          </div>
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
