import Profile from "@/components/dashboard/Profile";
import { getUserSession } from "@/lib/core/session";
import React from "react";

const AdminHomepage = async () => {
  const user = await getUserSession();
  return (
    <div>
      <Profile user={user} />
    </div>
  );
};

export default AdminHomepage;
