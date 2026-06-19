"use client";

import React from "react";
import Image from "next/image";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import Link from "next/link";
import EditClass from "./EditClass";
import DeleteClass from "./DeleteClass";

const statusColor = {
  pending: "bg-yellow-100 text-yellow-700 border-yellow-300",
  approved: "bg-green-100 text-green-700 border-green-300",
  rejected: "bg-red-100 text-red-700 border-red-300",
};

const TrainerClassesTable = ({ classes = [], onView, onEdit, onDelete }) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-left border border-gray-200 rounded-lg overflow-hidden bg-white shadow-md">
        {/* HEADER */}
        <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
          <tr>
            <th className="p-3">Class</th>
            <th className="p-3">Image</th>
            <th className="p-3">Category</th>
            <th className="p-3">Price</th>
            <th className="p-3">Status</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {classes.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center p-6 text-gray-500">
                No classes found
              </td>
            </tr>
          ) : (
            classes.map((item) => (
              <tr
                key={item._id}
                className="border-t hover:bg-gray-50 transition"
              >
                {/* CLASS NAME */}
                <td className="p-3 font-medium text-gray-800">
                  {item.className}
                </td>

                {/* IMAGE */}
                <td className="p-3">
                  <Image
                    src={item.image}
                    alt={item.className}
                    width={50}
                    height={50}
                    className="rounded-md object-cover"
                  />
                </td>

                {/* CATEGORY */}
                <td className="p-3 text-gray-600">{item.category}</td>

                {/* PRICE */}
                <td className="p-3 text-gray-600">${item.price}</td>

                {/* STATUS */}
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs border font-medium ${
                      statusColor[item.status?.toLowerCase()] ||
                      "bg-gray-100 text-gray-600 border-gray-300"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>

                {/* ACTIONS */}
                <td className="p-3">
                  <div className="flex justify-center items-center gap-3 text-gray-600">
                    {/* VIEW */}
                    <Link href={`/dashboard/trainer/classes/${item._id}`}>
                      {" "}
                      <button
                        onClick={() => onView?.(item)}
                        className="hover:text-blue-500 transition cursor-pointer"
                        title="View"
                      >
                        <FaEye size={16} />
                      </button>
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
  );
};

export default TrainerClassesTable;
