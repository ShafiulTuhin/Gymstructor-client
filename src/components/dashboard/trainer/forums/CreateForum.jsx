"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { createClass } from "@/lib/actions/classes";
import { useRouter } from "next/navigation";
import { createForum } from "@/lib/actions/forums";

const CreateForum = ({ user }) => {
  console.log(user);

  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // 🔥 Image upload (safe)
  const handleImageUpload = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file) return;

      setUploading(true);

      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_API}`,
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await res.json();

      if (!data?.data?.url) {
        toast.error("Image upload failed");
        setUploading(false);
        return;
      }

      setImageUrl(data.data.url);
      setUploading(false);
    } catch (error) {
      console.error(error);
      toast.error("Image upload error");
      setUploading(false);
    }
  };

  // 🔥 Submit class
  const onSubmit = async (data) => {
    try {
      if (!imageUrl) {
        toast.error("Image is required");
        return;
      }

      const payload = {
        title: data.title,
        authorId: user?.id,
        authorName: user?.name,
        image: imageUrl,
        description: data.description,
      };

      const res = await createForum(payload);

      toast.success("Article created successfully!");

      user?.role === "trainer"
        ? router.push("/dashboard/trainer/forums")
        : router.push("/dashboard/admin/forums");

      reset();
      setImageUrl("");
    } catch (error) {
      console.error("Create class error:", error);
      toast.error(error?.message || "Failed to create class");
    }
  };

  return (
    <div className="min-h-screen bg-[#0F3D3E] p-6 text-white">
      <div className="max-w-3xl mx-auto bg-white/10 p-6 rounded-xl border border-white/20">
        <h2 className="text-2xl font-bold mb-6">Create Class</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Title */}

          <input
            {...register("title", {
              required: "Title is required",
            })}
            placeholder="Title"
            className="w-full p-2 rounded bg-gray-800"
          />
          {errors.title && (
            <p className="text-red-400 text-sm">{errors.title.message}</p>
          )}

          {/* Image Upload */}
          <input
            type="file"
            onChange={handleImageUpload}
            className="w-full p-2 bg-gray-800 rounded"
          />

          {uploading && (
            <p className="text-yellow-300 text-sm">Uploading image...</p>
          )}

          {imageUrl && (
            <img
              src={imageUrl}
              className="w-full h-40 object-cover rounded"
              alt="preview"
            />
          )}

          {/* Description */}
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            placeholder="Description"
            className="w-full p-2 rounded bg-gray-800"
          />
          {errors.description && (
            <p className="text-red-400 text-sm">{errors.description.message}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#4EA618] p-2 rounded font-bold disabled:opacity-50 cursor-pointer"
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Create Class"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateForum;
