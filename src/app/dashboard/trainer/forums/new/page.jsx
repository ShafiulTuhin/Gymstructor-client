import CreateForum from "@/components/forums/CreateForum";
import { getUserSession } from "@/lib/core/session";
import React from "react";
export const metadata = {
  title: "Gymstructor | Trainer - Create forum",
  description: "All type of classes that posted by trainers",
};

const CreateNewForumPage = async () => {
  const user = await getUserSession();
  return (
    <div>
      <CreateForum user={user} />
    </div>
  );
};

export default CreateNewForumPage;
