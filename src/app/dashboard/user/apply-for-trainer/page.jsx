import NewTrainerApplicationForm from "@/components/user/NewTrainerForm";
import { getUserSession } from "@/lib/core/session";
import React from "react";

const ApplyForTrainerPage = async () => {
  const user = await getUserSession();
  return (
    <div>
      <NewTrainerApplicationForm user={user} />
    </div>
  );
};

export default ApplyForTrainerPage;
