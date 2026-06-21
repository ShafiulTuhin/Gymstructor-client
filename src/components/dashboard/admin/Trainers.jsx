"use client";
import { updateUserRole } from "@/lib/actions/user";
import { toast } from "react-toastify";

const Trainers = ({ trainers }) => {
  const handleDemote = async (id) => {
    const res = await updateUserRole(id, "user");

    if (res.modifiedCount > 0) {
      toast.success("Trainer demoted to user");
    }
  };
  return (
    <div className="min-h-screen p-6 bg-[#071E22] text-white">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-3">All Trainers</h2>
        <p className="text-sm text-slate-400">
          Total Trainers: {trainers?.length || 0}
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-800">
        <table className="w-full text-sm text-left">
          <thead className="bg-[#0F3D3E] text-gray-300 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {trainers?.length > 0 ? (
              trainers.map((trainer, index) => (
                <tr
                  key={trainer?._id || index}
                  className="border-b border-gray-800 hover:bg-gray-800/40 transition"
                >
                  <td className="px-4 py-3 font-medium text-white">
                    {trainer?.name || "N/A"}
                  </td>

                  <td className="px-4 py-3 text-gray-300">
                    {trainer?.email || "N/A"}
                  </td>

                  <td className="px-4 py-3 text-gray-300">
                    {(trainer?.role || "user").charAt(0).toUpperCase() +
                      (trainer?.role || "user").slice(1)}
                  </td>

                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleDemote(trainer._id)}
                      className="rounded-lg bg-red-600 px-4 py-2 text-xs font-medium text-white transition hover:bg-red-700 cursor-pointer"
                    >
                      Demote to User
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-10 text-gray-400">
                  No trainers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Trainers;
