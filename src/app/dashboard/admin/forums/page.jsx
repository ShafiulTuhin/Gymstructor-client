import ForumsTable from "@/components/dashboard/admin/ForumsTable";
import { getAllForums } from "@/lib/actions/forums";
import { getUserSession } from "@/lib/core/session";

import React from "react";

const AdminForumPage = async () => {
  const forums = await getAllForums();
  const user = await getUserSession();

  return (
    <div>
      <ForumsTable forums={forums} user={user} />
    </div>
  );
};

export default AdminForumPage;
