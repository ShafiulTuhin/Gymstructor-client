import { getBookingDetails } from "@/lib/actions/user";
import { getUserSession } from "@/lib/core/session";
import React from "react";
import Link from "next/link";

const MyBookingsClasses = async () => {
  const user = await getUserSession();
  const result = await getBookingDetails(user?.id);
  console.log(result);

  const myBookings = result.data || [];

  return (
    <div className="min-h-screen p-6 bg-[#071E22] text-white">
      <h1 className="text-2xl font-semibold mb-6">My Booked Classes</h1>

      <div className="overflow-x-auto rounded-xl border border-gray-800">
        <table className="w-full text-sm text-left">
          <thead className="bg-[#0F3D3E] text-gray-300 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Class</th>
              <th className="px-4 py-3">Trainer</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Payment Status</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {myBookings.length > 0 ? (
              myBookings.map((booking, index) => (
                <tr
                  key={booking?._id || index}
                  className="border-b border-gray-800 hover:bg-gray-800/40 transition"
                >
                  <td className="px-4 py-3 font-medium text-white">
                    {booking?.className || "N/A"}
                  </td>

                  <td className="px-4 py-3 text-gray-300">
                    {booking?.trainerName || "N/A"}
                  </td>

                  <td className="px-4 py-3 text-gray-300">
                    {booking?.createdAt
                      ? new Date(booking.createdAt).toLocaleDateString()
                      : "N/A"}
                  </td>

                  <td className="px-4 py-3 text-gray-300">
                    ${booking?.price / 100 || 0}.00
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        booking?.bookingStatus === "confirmed"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-yellow-500/20 text-yellow-300"
                      }`}
                    >
                      {booking?.bookingStatus || "pending"}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/classes/${booking?.classId}`}
                      className="px-3 py-1 text-xs rounded-md bg-blue-600 hover:bg-blue-700 transition"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-10 text-gray-400">
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBookingsClasses;
