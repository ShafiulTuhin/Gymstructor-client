import PendingApplicantList from "@/components/dashboard/admin/PendingApplicantList";
import { getAllTrainerApplication } from "@/lib/actions/user";
import React from "react";

const TrainerApplicationPage = async () => {
  const applications = await getAllTrainerApplication();
  const pendingApplication = applications.filter(
    (app) => app.status === "pending",
  );

  return (
    <div>
      <PendingApplicantList applications={pendingApplication} />
    </div>
  );
};

export default TrainerApplicationPage;
