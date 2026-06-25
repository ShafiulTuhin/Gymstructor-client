import MyForumsPost from "@/components/forums/MyForumsPost";
import { getAuthorForums } from "@/lib/actions/forums";
import { getUserSession } from "@/lib/core/session";
import React from "react";
export const metadata = {
  title: "Gymstructor | Trainer-Forums",
  description: "Manage trainers own forum posts",
};
const MyForumsPage = async () => {
  const user = await getUserSession();
  const myForums = await getAuthorForums(user?.id);
  return (
    <div>
      <MyForumsPost forums={myForums} user={user} />
    </div>
  );
};

export default MyForumsPage;
