import ClassesTable from "@/components/dashboard/admin/ClassesTable";
import { getAdminClasses } from "@/lib/actions/classes";
import React from "react";

export const metadata = {
  title: "Gymstructor |Admin - Classes Management",
  description: "Manage classes from trainers",
};

const AdminClassesPage = async () => {
  const data = await getAdminClasses();
  const classes = data.classes;

  return (
    <div>
      <ClassesTable classes={classes} />
    </div>
  );
};

export default AdminClassesPage;
