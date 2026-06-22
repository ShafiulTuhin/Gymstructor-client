import Image from "next/image";
import React from "react";
import { Trash2 } from "lucide-react";
import DeleteForum from "@/components/forums/DeleteForum";

const ForumsTable = ({ forums, user }) => {
  return (
    <div className="min-h-screen p-6 bg-[#071E22] text-white">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">Forums</h2>
        <p className="text-sm text-slate-400">
          Total Forums: {forums?.length || 0}
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-800">
        <table className="w-full text-sm text-left">
          <thead className="bg-[#0F3D3E] text-gray-300 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Author</th>
              <th className="px-4 py-3">Created At</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {forums?.length > 0 ? (
              forums.map((forum, index) => (
                <tr
                  key={forum?._id || index}
                  className="border-b border-gray-800 hover:bg-gray-800/40 transition"
                >
                  <td className="px-4 py-3">
                    <div className="relative h-14 w-14 overflow-hidden rounded-lg">
                      <Image
                        src={forum?.image || "/placeholder.jpg"}
                        alt={forum?.title || "Forum"}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </td>

                  <td className="px-4 py-3 font-medium text-white max-w-xs truncate">
                    {forum?.title || "N/A"}
                  </td>

                  <td className="px-4 py-3 text-gray-300">
                    {forum?.authorName || "N/A"}
                  </td>

                  <td className="px-4 py-3 text-gray-300">
                    {forum?.createdAt
                      ? new Date(forum.createdAt).toLocaleDateString()
                      : "N/A"}
                  </td>

                  <td className="px-4 py-3 text-center">
                    {/* <button className="flex gap-2 rounded-lg bg-red-600 px-4 py-3 text-xs font-medium text-white transition hover:bg-red-700 cursor-pointer">
                      <Trash2 size={16} />
                      Delete
                    </button> */}
                    <DeleteForum myForum={forum} user={user} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-10 text-gray-400">
                  No forums found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ForumsTable;
