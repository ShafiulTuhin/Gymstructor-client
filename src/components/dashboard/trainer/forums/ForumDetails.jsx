import Image from "next/image";
import React from "react";
import { FaCalendarAlt, FaUserCircle } from "react-icons/fa";

const ForumDetails = ({ forum }) => {
  const { title, image, authorName, description, createdAt } = forum;

  return (
    <section className="min-h-screen bg-[#0F3D3E] py-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Article Container */}
        <article className="bg-gradient-to-b from-[#4EA618] to-[#192425] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
          {/* Featured Image */}
          <div className="relative">
            <Image
              src={image}
              alt={title}
              width={450}
              height={260}
              radius="none"
              removeWrapper
              className="w-full h-[260px] md:h-[450px] object-cover"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-black/20 to-transparent" />
          </div>

          {/* Content */}
          <div className="px-6 md:px-12 py-10">
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
        </article>
      </div>
    </section>
  );
};

export default ForumDetails;
