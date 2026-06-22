import CreateForum from "@/components/forums/CreateForum";
import { getUserSession } from "@/lib/core/session";
import React from "react";

const CreateForumPostForAdminPage = async () => {
  const user = await getUserSession();
  return (
    <div>
      <CreateForum user={user} />
    </div>
  );
};

export default CreateForumPostForAdminPage;
