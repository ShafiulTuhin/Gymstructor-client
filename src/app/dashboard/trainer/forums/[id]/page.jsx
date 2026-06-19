import ForumDetails from "@/components/forums/ForumDetails";
import { getSingleForum } from "@/lib/actions/forums";
import React from "react";

const ForumDetailsPage = async ({ params }) => {
  const { id } = await params;
  const forum = await getSingleForum(id);

  return (
    <div>
      <ForumDetails forum={forum} />
    </div>
  );
};

export default ForumDetailsPage;
