"use client";

import FavoriteClassDetails from "./FavoriteClassDetails";

const FavoriteClass = ({ favClasses = [] }) => {
  console.log(favClasses);

  if (!favClasses.length) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="text-gray-400 text-lg">No favorite classes found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#071E22] px-5 py-10">
      <FavoriteClassDetails classes={favClasses} />
    </div>
  );
};

export default FavoriteClass;
