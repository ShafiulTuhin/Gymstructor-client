import TrainerClassesTable from "@/components/dashboard/trainer/TrainerClassesTable";
import { getTrainerClasses } from "@/lib/actions/classes";
import { getUserSession } from "@/lib/core/session";
import React from "react";

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
