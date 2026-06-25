import Profile from "@/components/dashboard/Profile";
import { getAdminClasses } from "@/lib/actions/classes";
import { getAllBookings, getAllUser } from "@/lib/actions/user";
import { getUserSession } from "@/lib/core/session";
import { FaUsers, FaDumbbell, FaCalendarCheck } from "react-icons/fa";
export const metadata = {
  title: "Gymstructor | Admin Dashboard",
  description: "Application management page",
};

const AdminHomepage = async () => {
  const user = await getUserSession();
  const users = await getAllUser();
  const adminClasses = await getAdminClasses();
  const classes = adminClasses.classes;
  const bookedClasses = await getAllBookings();
  // console.log(bookedClasses);

  return (
    <div className="space-y-8">
      <Profile user={user} />

      <div className="container mx-auto rounded-2xl overflow-hidden border border-[#173f40] shadow-2xl">
        {/* Header */}
        <div className="bg-[#0B2C2E] px-6 py-4 border-b border-[#173f40]">
          <h2 className="text-2xl font-bold text-white">Dashboard Summary</h2>
        </div>

        {/* Body */}
        <div className="bg-[#0F3D3E] p-6">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Users */}
            <div className="rounded-2xl bg-gradient-to-br from-[#4EA618]/20 to-[#132A2C] border border-[#4EA618]/30 p-6 transition hover:scale-[1.02] duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Registered Users</p>
                  <h3 className="text-xl font-semibold text-white mt-1">
                    Total Users
                  </h3>
                </div>

                <div className="w-14 h-14 rounded-xl bg-[#4EA618]/20 flex items-center justify-center">
                  <FaUsers className="text-[#4EA618] text-2xl" />
                </div>
              </div>

              <h2 className="text-5xl font-bold text-[#4EA618] mt-8">
                {users?.length || 0}
              </h2>
            </div>

            {/* Classes */}
            <div className="rounded-2xl bg-gradient-to-br from-[#00C2FF]/10 to-[#132A2C] border border-[#00C2FF]/20 p-6 transition hover:scale-[1.02] duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Available Classes</p>
                  <h3 className="text-xl font-semibold text-white mt-1">
                    Total Classes
                  </h3>
                </div>

                <div className="w-14 h-14 rounded-xl bg-[#00C2FF]/15 flex items-center justify-center">
                  <FaDumbbell className="text-[#00C2FF] text-2xl" />
                </div>
              </div>

              <h2 className="text-5xl font-bold text-[#00C2FF] mt-8">
                {classes?.length || 0}
              </h2>
            </div>

            {/* Bookings */}
            <div className="rounded-2xl bg-gradient-to-br from-purple-500/10 to-[#132A2C] border border-purple-500/20 p-6 transition hover:scale-[1.02] duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Class Bookings</p>
                  <h3 className="text-xl font-semibold text-white mt-1">
                    Total Bookings
                  </h3>
                </div>

                <div className="w-14 h-14 rounded-xl bg-purple-500/15 flex items-center justify-center">
                  <FaCalendarCheck className="text-purple-400 text-2xl" />
                </div>
              </div>

              <h2 className="text-5xl font-bold text-purple-400 mt-8">
                {bookedClasses?.length || 0}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHomepage;
