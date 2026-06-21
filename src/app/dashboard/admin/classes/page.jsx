import ClassesTable from "@/components/dashboard/admin/ClassesTable";
import { getAdminClasses } from "@/lib/actions/classes";
import React from "react";

const AdminClassesPage = async () => {
  const classes = await getAdminClasses();
  console.log(classes);

  return (
    <div>
      <ClassesTable classes={classes} />
    </div>
  );
};

export default AdminClassesPage;
