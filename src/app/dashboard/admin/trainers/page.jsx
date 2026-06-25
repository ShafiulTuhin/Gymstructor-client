import Trainers from "@/components/dashboard/admin/Trainers";
import { getAllUser } from "@/lib/actions/user";
import React from "react";

export const metadata = {
  title: "Gymstructor |Admin - Trainer Management",
  description: "Manage trainers activities from admin dashboard",
};

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
