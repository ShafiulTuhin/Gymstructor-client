// import React from "react";

// const Statistics = ({ myClass, myBookings }) => {
//   return (
//     <div className="mt-10 ">
//       <h2 className="text-2xl font-bold text-white mb-6">Statistics</h2>

//       <div className="grid grid-cols-2 gap-6">
//         {/* Left - Favorites */}
//         <div className="bg-gradient-to-b from-[#4EA618] to-[#192425] border border-white/10 rounded-2xl p-8 shadow-2xl flex flex-col justify-between min-h-[180px]">
//           <h3 className="text-white text-xl font-semibold">Favorite</h3>

//           <p className="text-gray-300 mt-2">Total</p>

//           <div className="mt-6 text-5xl font-bold text-[#00C2FF]">
//             {myClass?.length || 0}
//           </div>
//         </div>

//         {/* Right - Bookings */}
//         <div className="bg-gradient-to-b from-[#192425] to-[#0b1220] border border-white/10 rounded-2xl p-8 shadow-2xl flex flex-col justify-between min-h-[180px]">
//           <h3 className="text-white text-xl font-semibold">Booking</h3>

//           <p className="text-gray-300 mt-2">Total</p>

//           <div className="mt-6 text-5xl font-bold text-[#00C2FF]">
//             {myBookings?.length || 0}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Statistics;
import React from "react";
import { FaHeart, FaCalendarCheck } from "react-icons/fa";

const Statistics = ({ myClass, myBookings }) => {
  return (
    <div className="w-full max-w-3xl mt-10 rounded-2xl overflow-hidden border border-[#173f40] shadow-2xl">
      {/* Header */}
      <div className="bg-[#0B2C2E] px-6 py-4 border-b border-[#173f40]">
        <h2 className="text-2xl font-bold text-white">Statistics</h2>
      </div>

      {/* Body */}
      <div className="bg-[#0F3D3E] p-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Favorite */}
          <div className="rounded-2xl bg-gradient-to-br from-[#4EA618]/20 to-[#132A2C] border border-[#4EA618]/30 p-6 transition hover:scale-[1.02] duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Favorite Classes</p>
                <h3 className="text-xl font-semibold text-white mt-1">
                  Total Favorites
                </h3>
              </div>

              <div className="w-14 h-14 rounded-xl bg-[#4EA618]/20 flex items-center justify-center">
                <FaHeart className="text-[#4EA618] text-2xl" />
              </div>
            </div>

            <h2 className="text-5xl font-bold text-[#00C2FF] mt-8">
              {myClass?.length || 0}
            </h2>
          </div>

          {/* Booking */}
          <div className="rounded-2xl bg-gradient-to-br from-[#00C2FF]/10 to-[#132A2C] border border-[#00C2FF]/20 p-6 transition hover:scale-[1.02] duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Booked Classes</p>
                <h3 className="text-xl font-semibold text-white mt-1">
                  Total Bookings
                </h3>
              </div>

              <div className="w-14 h-14 rounded-xl bg-[#00C2FF]/15 flex items-center justify-center">
                <FaCalendarCheck className="text-[#00C2FF] text-2xl" />
              </div>
            </div>

            <h2 className="text-5xl font-bold text-[#00C2FF] mt-8">
              {myBookings?.length || 0}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
