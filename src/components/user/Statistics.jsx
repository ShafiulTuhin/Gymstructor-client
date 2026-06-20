import React from "react";

const Statistics = ({ myClass, myBookings }) => {
  return (
    <div className="mt-10 ">
      <h2 className="text-2xl font-bold text-white mb-6">Statistics</h2>

      <div className="grid grid-cols-2 gap-6">
        {/* Left - Favorites */}
        <div className="bg-gradient-to-b from-[#4EA618] to-[#192425] border border-white/10 rounded-2xl p-8 shadow-2xl flex flex-col justify-between min-h-[180px]">
          <h3 className="text-white text-xl font-semibold">Favorite</h3>

          <p className="text-gray-300 mt-2">Total</p>

          <div className="mt-6 text-5xl font-bold text-[#00C2FF]">
            {myClass?.length || 0}
          </div>
        </div>

        {/* Right - Bookings */}
        <div className="bg-gradient-to-b from-[#192425] to-[#0b1220] border border-white/10 rounded-2xl p-8 shadow-2xl flex flex-col justify-between min-h-[180px]">
          <h3 className="text-white text-xl font-semibold">Booking</h3>

          <p className="text-gray-300 mt-2">Total</p>

          <div className="mt-6 text-5xl font-bold text-[#00C2FF]">
            {myBookings?.length || 0}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
