"use client";
import { updateUserRole, updateUserStatus } from "@/lib/actions/user";
import Link from "next/link";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";

const UserTable = ({ users }) => {
  const [data, setData] = useState(users);
  const [search, setSearch] = useState("");
  const ITEMS_PER_PAGE = 10;

  const [currentPage, setCurrentPage] = useState(1);
  // change Role locally

  const handleRoleChange = (id, value) => {
    const updated = data?.map((user) =>
      user._id === id ? { ...user, role: value } : user,
    );

    setData(updated);
  };
  // send update (API / server action)
  const handleUpdateRole = async (id) => {
    const user = data.find((c) => c._id === id);
    const originalUser = users.find((c) => c._id === id);

    if (user.role === originalUser.role) {
      toast.info("Please select a role");
      return;
    }

    const updatedUserRole = await updateUserRole(id, user.role);

    toast.success("Updated successfully");
    console.log(updatedUserRole);
  };
  //Handle status update
  const handleUpdateStatus = async (id, status) => {
    const updated = data.map((user) =>
      user._id === id ? { ...user, status } : user,
    );

    setData(updated);

    await updateUserStatus(id, status);
  };

  // Search option
  const filteredUsers = useMemo(() => {
    return data.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [data, search]);

  //   Pagination
  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);

  const paginatedUser = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredUsers.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredUsers, currentPage]);

  return (
    <div className="min-h-screen p-6 bg-[#071E22] text-white">
      {/* <h1 className="text-2xl font-semibold mb-6">My Booked Classes</h1> */}
      <div className="mb-6 md:flex items-center justify-between px-7 pt-4">
        <div className="md:mb-0 mb-5 md:text-left text-center">
          <h2 className="text-2xl font-bold text-white">User Dashboard</h2>
          <p className="text-sm text-slate-400">
            Total User: {filteredUsers.length}
          </p>
        </div>

        <input
          type="text"
          placeholder="Search by user name..."
          value={search}
          // onChange={(e) => setSearch(e.target.value)}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="md:w-80 w-full rounded-lg border border-slate-700 bg-[#0F3D3E] px-4 py-2 text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none"
        />
      </div>
      <div className="overflow-x-auto rounded-xl border border-gray-800">
        <table className="w-full text-sm text-left">
          <thead className="bg-[#0F3D3E] text-gray-300 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">email</th>
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Status Action</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {paginatedUser.length > 0 ? (
              paginatedUser.map((user, index) => (
                <tr
                  key={user?._id || index}
                  className="border-b border-gray-800 hover:bg-gray-800/40 transition"
                >
                  <td className="px-4 py-3 font-medium text-white">
                    {user?.name || "N/A"}
                  </td>

                  <td className="px-4 py-3 text-gray-300">
                    {user?.email || "N/A"}
                  </td>

                  <td className="px-4 py-3 text-gray-300">
                    {user?.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : "N/A"}
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user?.status === "active"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-yellow-500/20 text-yellow-300"
                      }`}
                    >
                      {(user?.status || "user").charAt(0).toUpperCase() +
                        (user?.status || "user").slice(1) || "N/A"}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleUpdateStatus(user._id, "active")}
                        className="px-3 py-1 text-xs rounded-md bg-green-600 hover:bg-green-700 transition"
                      >
                        Active
                      </button>

                      <button
                        onClick={() => handleUpdateStatus(user._id, "blocked")}
                        className="px-3 py-1 text-xs rounded-md bg-red-600 hover:bg-red-700 transition"
                      >
                        Block
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <select
                      value={user.role}
                      onChange={(e) =>
                        handleRoleChange(user._id, e.target.value)
                      }
                      className="rounded-lg border border-slate-700 bg-[#173f40] px-4 py-2 text-sm font-medium text-white outline-none transition focus:border-blue-500"
                    >
                      <option value="user">User</option>
                      <option value="trainer">Trainer</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>

                  <td className="px-6 py-5 text-center">
                    <button
                      onClick={() => handleUpdateRole(user._id)}
                      className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700 active:scale-95"
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-10 text-gray-400">
                  No user found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="flex items-center justify-between border-t border-slate-800 px-6 py-4">
          <p className="text-sm text-slate-400">
            Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}–
            {Math.min(currentPage * ITEMS_PER_PAGE, filteredUsers.length)} of{" "}
            {filteredUsers.length}
          </p>

          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="rounded-md border border-slate-700 px-3 py-2 text-sm text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`h-9 w-9 rounded-md text-sm font-medium ${
                  currentPage === i + 1
                    ? "bg-blue-600 text-white"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="rounded-md border border-slate-700 px-3 py-2 text-sm text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTable;
