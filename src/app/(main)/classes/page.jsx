import AllClasses from "@/components/classes/AllClasses";
import { getAllClasses } from "@/lib/actions/classes";
import React from "react";

const AllClassesPage = async () => {
  const data = await getAllClasses();
  const classes = data.classes;

  return (
    <div>
      <AllClasses classes={classes} />
    </div>
  );
};

export default AllClassesPage;
