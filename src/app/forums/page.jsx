import AllForums from "@/components/forumsAll/AllForums";
import { getAllForums } from "@/lib/actions/forums";
import { getUserSession } from "@/lib/core/session";
import React from "react";

const AllForumsPage = async () => {
  const forums = await getAllForums();

  return (
    <div className="bg-[#071E22]">
      <div className="container mx-auto  py-[100px]">
        <h2 className="text-white text-3xl mb-5">
          Community Posts : {forums.length}
        </h2>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 justify-between items-center gap-4 lg:px-0 px-4">
          {forums.map((forum) => (
            <AllForums key={forum._id} forum={forum} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllForumsPage;
