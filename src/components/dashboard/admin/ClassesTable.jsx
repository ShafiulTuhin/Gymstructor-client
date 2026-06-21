"use client";

import { deleteClass, updateClassStatus } from "@/lib/actions/classes";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const ClassesTable = ({ classes }) => {
  const [data, setData] = useState(classes);
  const router = useRouter();

  // ✅ FIXED: correct field + proper state update
  const handleStatusChange = (id, value) => {
    const updated = data.map((cls) =>
      cls._id === id ? { ...cls, status: value } : cls,
    );

    setData(updated);
  };
  const handleUpdate = async (id) => {
    const current = data.find((c) => c._id === id);

    try {
      const res = await updateClassStatus(id, current.status);

      if (res?.modifiedCount > 0 || res?.success !== false) {
        toast.success("Status updated");
      } else {
        toast.error("Update failed");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    const current = data.find((c) => c._id === id);

    const res = await deleteClass(current._id);

    setData((prevData) => prevData.filter((item) => item._id !== id));

    toast.success(`${current.className} successfully deleted`);

    setTimeout(() => {
      router.push("/dashboard/admin/classes");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#071E22] p-6 text-white">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Classes List</h2>
        <p className="text-sm text-gray-400">
          Total Classes: {data?.length || 0}
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-800">
        <table className="w-full text-sm text-left">
          {/* HEADER */}
          <thead className="bg-[#0F3D3E] text-gray-300 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Class Name</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Trainer</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Status Action</th>
              <th className="px-4 py-3 text-center">Delete Action</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {data?.length > 0 ? (
              data.map((cls, index) => (
                <tr
                  key={cls?._id || index}
                  className="border-b border-gray-800 hover:bg-gray-800/40 transition"
                >
                  {/* CLASS NAME */}
                  <td className="px-4 py-3 font-medium">
                    {cls?.className || "N/A"}
                  </td>

                  {/* CATEGORY */}
                  <td className="px-4 py-3 text-gray-300">
                    {cls?.category || "N/A"}
                  </td>

                  {/* TRAINER */}
                  <td className="px-4 py-3 text-gray-300">
                    {cls?.trainerName || "N/A"}
                  </td>

                  {/* STATUS SELECT */}
                  <td className="px-6 py-5 text-center">
                    <select
                      value={cls?.status || "pending"}
                      onChange={(e) =>
                        handleStatusChange(cls._id, e.target.value)
                      }
                      className="cursor-pointer rounded-lg border border-slate-700 bg-[#173f40] px-4 py-2 text-sm font-medium text-white outline-none transition focus:border-blue-500"
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>

                  {/* UPDATE BUTTON */}
                  <td className="px-6 py-5 text-center">
                    <button
                      onClick={() => handleUpdate(cls._id)}
                      className="cursor-pointer rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700 active:scale-95"
                    >
                      Update
                    </button>
                  </td>

                  {/* DELETE */}
                  <td className="px-4 py-3 text-center">
                    <button
                      className="bg-red-600 hover:bg-red-700 transition px-3 py-1 rounded-md text-xs font-medium cursor-pointer"
                      onClick={() => handleDelete(cls._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-10 text-gray-400">
                  No classes found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClassesTable;
