import MyForumsPost from "@/components/dashboard/trainer/forums/MyForumsPost";
import { getAuthorForums } from "@/lib/actions/forums";
import { getUserSession } from "@/lib/core/session";
import React from "react";

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
