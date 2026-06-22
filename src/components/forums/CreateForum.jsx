"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { createForum } from "@/lib/actions/forums";
import { useRouter } from "next/navigation";

const CreateForum = ({ user }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleImageUpload = async (e) => {
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
  };

  const onSubmit = async (data) => {
    try {
      if (!imageUrl) {
        toast.error("Image is required");
        return;
      }

      await createForum({
        title: data.title,
        authorId: user?.id,
        authorName: user?.name,
        image: imageUrl,
        description: data.description,
      });

      toast.success("Forum created successfully!");

      router.push(
        user?.role === "trainer"
          ? "/dashboard/trainer/forums"
          : "/dashboard/admin/forums",
      );

      reset();
      setImageUrl("");
    } catch (error) {
      toast.error("Failed to create forum");
    }
  };

  return (
    <div className="min-h-screen bg-[#071E22] px-5 py-10 text-white">
      <div className="mx-auto max-w-3xl rounded-2xl bg-[#0F3D3E] p-6 shadow-xl">
        <h2 className="mb-6 text-2xl font-bold">Create Forum</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* TITLE */}
          <input
            {...register("title", { required: "Title is required" })}
            placeholder="Forum Title"
            className="w-full rounded-lg bg-[#173f40] p-3 text-white outline-none"
          />
          {errors.title && (
            <p className="text-sm text-red-400">{errors.title.message}</p>
          )}

          {/* IMAGE UPLOAD */}
          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Upload Image
            </label>

            <label className="flex cursor-pointer items-center justify-center rounded-lg border border-dashed border-gray-500 bg-[#173f40] p-4 hover:border-[#4EA618]">
              <input
                type="file"
                onChange={handleImageUpload}
                className="hidden"
              />
              {uploading ? "Uploading..." : "Click to upload image"}
            </label>

            {imageUrl && (
              <img
                src={imageUrl}
                className="mt-3 h-40 w-full rounded-lg object-cover"
                alt="preview"
              />
            )}
          </div>

          {/* DESCRIPTION */}
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            placeholder="Write your forum content..."
            className="w-full rounded-lg bg-[#173f40] p-3 text-white outline-none"
          />
          {errors.description && (
            <p className="text-sm text-red-400">{errors.description.message}</p>
          )}

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={uploading}
            className="cursor-pointer w-full rounded-lg bg-[#4EA618] py-3 font-bold text-white transition hover:bg-green-700 disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Create Forum"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateForum;
