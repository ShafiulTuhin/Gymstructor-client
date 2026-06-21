import ForumDetails from "@/components/forums/ForumDetails";
import { getSingleForum } from "@/lib/actions/forums";
import React from "react";
import Error from "./error";

const ForumDetailsPage = async ({ params }) => {
  const { id } = await params;
  const forum = await getSingleForum(id);

  if (forum.error) {
    return <Error error={forum.error} />;
  }
  return (
    <div>
      <ForumDetails forum={forum} />
    </div>
  );
};

export default ForumDetailsPage;
