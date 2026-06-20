"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

const statusColor = {
  pending: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  approved: "bg-green-500 text-green-100 border-green-500/30",
  rejected: "bg-red-500/20 text-red-300 border-red-500/30",
};

const ClassDetails = ({ myClass }) => {
  if (!myClass) return <p className="p-6 text-white">Loading...</p>;

  return (
    <div className="bg-[#071E22] px-5 py-10">
      <div className="px-5 pt-6">
        <Link
          href="/classes"
          className="inline-flex items-center gap-2 rounded-lg bg-[#173f40] px-4 py-2 text-sm text-white transition hover:bg-[#4EA618]"
        >
          <FiArrowLeft />
          Back to Classes
        </Link>
      </div>

      <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl bg-[#0F3D3E] shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* ================= IMAGE SIDE ================= */}
          <div className="relative h-80 md:h-full">
            <Image
              src={myClass.image}
              alt={myClass.className}
              fill
              className="object-cover"
            />

            {/* STATUS */}
            <div className="absolute top-4 left-4">
              <span
                className={`rounded-full border px-4 py-1 text-sm font-semibold ${
                  statusColor[myClass.status?.toLowerCase()] ||
                  "bg-gray-500/20 text-gray-300 border-gray-500/30"
                }`}
              >
                {myClass.status}
              </span>
            </div>
          </div>

          {/* ================= CONTENT SIDE ================= */}
          <div className="flex flex-col gap-6 p-6 text-white">
            {/* TITLE */}
            <h1 className="text-3xl font-bold">{myClass.className}</h1>

            {/* INFO GRID */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="rounded-xl bg-[#173f40] p-4">
                <p className="text-gray-300">Category</p>
                <p className="font-semibold text-white">{myClass.category}</p>
              </div>

              <div className="rounded-xl bg-[#173f40] p-4">
                <p className="text-gray-300">Difficulty</p>
                <p className="font-semibold capitalize text-white">
                  {myClass.difficulty}
                </p>
              </div>

              <div className="rounded-xl bg-[#173f40] p-4">
                <p className="text-gray-300">Duration</p>
                <p className="font-semibold text-white">{myClass.duration}</p>
              </div>

              <div className="rounded-xl bg-[#173f40] p-4">
                <p className="text-gray-300">Price</p>
                <p className="font-bold text-[#4EA618]">${myClass.price}</p>
              </div>
            </div>

            {/* DESCRIPTION */}
            <div>
              <h2 className="mb-2 text-lg font-semibold">Description</h2>
              <p className="text-sm leading-6 text-gray-300">
                {myClass.description}
              </p>
            </div>

            {/* SCHEDULE */}
            {myClass.schedule?.length > 0 && (
              <div>
                <h2 className="mb-3 text-lg font-semibold">Schedule</h2>

                <div className="space-y-2">
                  {myClass.schedule.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between rounded-lg bg-[#173f40] p-3 text-sm"
                    >
                      <span className="font-medium text-white">{item.day}</span>
                      <span className="text-gray-300">{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FOOT NOTE */}
            <div className="border-t border-gray-700 pt-3 text-xs text-gray-400">
              Trainer ID: {myClass.trainerId}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassDetails;
