import Profile from "@/components/dashboard/Profile";
import { getTrainerClasses } from "@/lib/actions/classes";
import { getBookingsOfTrainerClasses } from "@/lib/actions/user";
import { getUserSession } from "@/lib/core/session";

const TrainerHomepage = async () => {
  const user = await getUserSession();
  const classes = await getTrainerClasses(user.id);
  const classIds = classes.map((cls) => cls._id);
  const bookings = await getBookingsOfTrainerClasses(classIds);
  console.log(bookings);

  const totalClasses = classes?.length || 0;
  const totalBookings = bookings?.length || 0;

  return (
    <div className="space-y-8">
      <Profile user={user} />

      <div className="container mx-auto rounded-2xl overflow-hidden border border-[#173f40] shadow-2xl mb-10">
        {/* Header */}
        <div className="bg-[#0B2C2E] px-6 py-4 border-b border-[#173f40]">
          <h2 className="text-2xl font-bold text-white">
            Trainer Dashboard Summary
          </h2>
        </div>

        {/* Body */}
        <div className="bg-[#0F3D3E] p-6 space-y-6">
          {/* Summary Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Classes */}
            <div className="rounded-2xl bg-gradient-to-br from-[#00C2FF]/10 to-[#132A2C] border border-[#00C2FF]/20 p-6 transition hover:scale-[1.02] duration-300">
              <p className="text-gray-300 text-sm">My Classes</p>
              <h3 className="text-xl font-semibold text-white mt-1">
                Total Classes
              </h3>

              <h2 className="text-5xl font-bold text-[#00C2FF] mt-8">
                {totalClasses}
              </h2>
            </div>

            {/* Bookings */}
            <div className="rounded-2xl bg-gradient-to-br from-purple-500/10 to-[#132A2C] border border-purple-500/20 p-6 transition hover:scale-[1.02] duration-300">
              <p className="text-gray-300 text-sm">My Bookings</p>
              <h3 className="text-xl font-semibold text-white mt-1">
                Total Booked Classes
              </h3>

              <h2 className="text-5xl font-bold text-purple-400 mt-8">
                {totalBookings}
              </h2>
            </div>
          </div>

          {/* Interactive Table */}
          <div className="rounded-2xl border border-[#173f40] overflow-hidden">
            <div className="bg-[#0B2C2E] px-6 py-4 border-b border-[#173f40]">
              <h3 className="text-white font-semibold">Quick Overview Table</h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-[#0F3D3E] text-gray-300 text-sm">
                  <tr>
                    <th className="p-4">Type</th>
                    <th className="p-4">Count</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>

                <tbody className="text-white">
                  <tr className="border-t border-[#173f40] hover:bg-[#0B2C2E]/40 transition">
                    <td className="p-4">Classes</td>
                    <td className="p-4 font-bold text-[#00C2FF]">
                      {totalClasses}
                    </td>
                    <td className="p-4">
                      {totalClasses > 0 ? (
                        <span className="text-green-400">Active</span>
                      ) : (
                        <span className="text-red-400">No Classes</span>
                      )}
                    </td>
                  </tr>

                  <tr className="border-t border-[#173f40] hover:bg-[#0B2C2E]/40 transition">
                    <td className="p-4">Bookings</td>
                    <td className="p-4 font-bold text-purple-400">
                      {totalBookings}
                    </td>
                    <td className="p-4">
                      {totalBookings > 0 ? (
                        <span className="text-green-400">Active</span>
                      ) : (
                        <span className="text-red-400">No Bookings</span>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerHomepage;
