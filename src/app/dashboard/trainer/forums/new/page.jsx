import CreateForum from "@/components/dashboard/trainer/forums/CreateForum";
import { getUserSession } from "@/lib/core/session";
import React from "react";

const CreateNewForumPage = async () => {
  const user = await getUserSession();
  return (
    <div>
      <CreateForum user={user} />
    </div>
  );
};

export default CreateNewForumPage;
