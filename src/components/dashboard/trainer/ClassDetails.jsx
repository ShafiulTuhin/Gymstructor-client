import React from "react";
import Image from "next/image";

const statusColor = {
  pending: "bg-yellow-100 text-yellow-700 border-yellow-300",
  approved: "bg-green-100 text-green-700 border-green-300",
  rejected: "bg-red-100 text-red-700 border-red-300",
};

const ClassDetails = ({ myClass }) => {
  if (!myClass) return <p className="p-6">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center p-6">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* LEFT SIDE - IMAGE */}
          <div className="relative h-96 md:h-full">
            <Image
              src={myClass.image}
              alt={myClass.className}
              fill
              className="object-cover"
            />

            {/* STATUS BADGE */}
            <div className="absolute top-4 left-4">
              <span
                className={`px-4 py-1 rounded-full text-sm font-semibold border ${
                  statusColor[myClass.status?.toLowerCase()] ||
                  "bg-gray-100 text-gray-600 border-gray-300"
                }`}
              >
                {myClass.status}
              </span>
            </div>
          </div>

          {/* RIGHT SIDE - DETAILS */}
          <div className="p-6 flex flex-col gap-5">
            {/* TITLE */}
            <h1 className="text-3xl font-bold text-gray-800">
              {myClass.className}
            </h1>

            {/* INFO GRID */}
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-gray-100 p-3 rounded-lg">
                <p className="text-gray-500">Category</p>
                <p className="font-semibold">{myClass.category}</p>
              </div>

              <div className="bg-gray-100 p-3 rounded-lg">
                <p className="text-gray-500">Difficulty</p>
                <p className="font-semibold capitalize">{myClass.difficulty}</p>
              </div>

              <div className="bg-gray-100 p-3 rounded-lg">
                <p className="text-gray-500">Duration</p>
                <p className="font-semibold">{myClass.duration}</p>
              </div>

              <div className="bg-green-100 p-3 rounded-lg">
                <p className="text-gray-500">Price</p>
                <p className="font-bold text-green-700">${myClass.price}</p>
              </div>
            </div>

            {/* DESCRIPTION */}
            <div>
              <h2 className="font-semibold text-gray-700 mb-1">Description</h2>
              <p className="text-gray-600 leading-relaxed">
                {myClass.description}
              </p>
            </div>

            {/* SCHEDULE */}
            <div>
              <h2 className="font-semibold text-gray-700 mb-2">Schedule</h2>

              <div className="space-y-2">
                {myClass.schedule?.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between bg-gray-100 p-3 rounded-lg"
                  >
                    <span className="font-medium">{item.day}</span>
                    <span className="text-gray-600">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* FOOT NOTE */}
            <div className="text-xs text-gray-400 pt-2 border-t">
              Trainer ID: {myClass.trainerId}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassDetails;
