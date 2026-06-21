import Trainers from "@/components/dashboard/admin/Trainers";
import { getAllUser } from "@/lib/actions/user";
import React from "react";

const TrainerPage = async () => {
  const users = await getAllUser();
  const trainers = users.filter((trainer) => trainer.role === "trainer");

  return (
    <div>
      <Trainers trainers={trainers} />
    </div>
  );
};

export default TrainerPage;
