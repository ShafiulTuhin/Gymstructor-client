import TrainerClassesTable from "@/components/dashboard/trainer/classes/TrainerClassesTable";
import { getTrainerClasses } from "@/lib/actions/classes";
import { getUserSession } from "@/lib/core/session";
import React from "react";
export const metadata = {
  title: "Gymstructor | Trainer - Classes",
  description: "Trainers own classes that created by himself",
};
const TrainerClassPage = async () => {
  const user = await getUserSession();
  const classes = await getTrainerClasses(user.id);

  return (
    <div>
      <TrainerClassesTable classes={classes} />
    </div>
  );
};

export default TrainerClassPage;
