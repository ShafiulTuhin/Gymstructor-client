import CreateClass from "@/components/dashboard/trainer/classes/CreateClass";
import { getUserSession } from "@/lib/core/session";

export const metadata = {
  title: "Gymstructor | Trainer - Create Class",
  description: "Craete new class for user",
};
import React from "react";

const CreateNewClassPage = async () => {
  const user = await getUserSession();
  return (
    <div>
      <CreateClass user={user} />
    </div>
  );
};

export default CreateNewClassPage;
