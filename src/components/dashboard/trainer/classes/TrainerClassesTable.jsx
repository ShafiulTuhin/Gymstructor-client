"use client";

import React from "react";
import Image from "next/image";
import { FaEye } from "react-icons/fa";
import Link from "next/link";
import EditClass from "./EditClass";
import DeleteClass from "./DeleteClass";

const statusColor = {
  pending: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  approved: "bg-green-500/20 text-green-300 border-green-500/30",
  rejected: "bg-red-500/20 text-red-300 border-red-500/30",
};

const TrainerClassesTable = ({ classes = [] }) => {
  return (
    <div className="min-h-screen w-full bg-[#071E22] p-6">
      <div className="mx-auto  overflow-x-auto rounded-2xl border border-[#173f40] bg-[#0F3D3E] shadow-xl">
        <table className="w-full text-left">
          {/* HEADER */}
          <thead className="bg-[#173f40] text-sm uppercase text-gray-300">
            <tr>
              <th className="p-4">Class</th>
              <th className="p-4">Image</th>
              <th className="p-4">Category</th>
              <th className="p-4">Schedule</th>
              <th className="p-4">Price</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {classes.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-10 text-center text-gray-400">
                  No classes found
                </td>
              </tr>
            ) : (
              classes.map((item) => (
                <tr
                  key={item._id}
                  className="border-t border-[#173f40] transition hover:bg-[#173f40]/40"
                >
                  {/* CLASS NAME */}
                  <td className="p-4 text-white">{item.className}</td>

                  {/* IMAGE */}
                  <td className="p-4">
                    <Image
                      src={item.image}
                      alt={item.className}
                      width={50}
                      height={50}
                      className="h-[50px] w-[50px] rounded-lg object-cover"
                    />
                  </td>

                  {/* CATEGORY */}
                  <td className="p-4 text-gray-300">{item.category}</td>
                  {/* SCHEDULE */}
                  <td className="p-4 text-gray-300">
                    {item.schedule?.length > 0 ? (
                      <div className="flex flex-col gap-1">
                        {item.schedule.slice(0, 2).map((s, idx) => (
                          <span key={idx} className="text-xs">
                            {s.day} - {s.time}
                          </span>
                        ))}

                        {item.schedule.length > 2 && (
                          <span className="text-xs text-gray-400">
                            +{item.schedule.length - 2} more
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-gray-500 text-xs">No schedule</span>
                    )}
                  </td>

                  {/* PRICE */}
                  <td className="p-4 font-semibold text-[#4EA618]">
                    ${item.price}
                  </td>

                  {/* STATUS */}
                  <td className="p-4">
                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-medium ${
                        statusColor[item.status?.toLowerCase()] ||
                        "bg-gray-500/20 text-gray-300 border-gray-500/30"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-4 text-gray-300">
                      {/* VIEW */}
                      <Link href={`/dashboard/trainer/classes/${item._id}`}>
                        <FaEye
                          size={16}
                          className="cursor-pointer transition hover:text-[#4EA618]"
                        />
                      </Link>

                      {/* EDIT */}
                      <EditClass myClass={item} />

                      {/* DELETE */}
                      <DeleteClass myClass={item} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrainerClassesTable;
