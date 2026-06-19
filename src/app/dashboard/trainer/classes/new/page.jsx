import CreateClass from "@/components/dashboard/trainer/classes/CreateClass";
import { getUserSession } from "@/lib/core/session";
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
