import PendingApplicantList from "@/components/dashboard/admin/PendingApplicantList";
import { getAllTrainerApplication } from "@/lib/actions/user";
import React from "react";

export const metadata = {
  title: "Gymstructor | Admin - Trainer Application Management",
  description: "Manage users applications become a trainer ",
};

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
