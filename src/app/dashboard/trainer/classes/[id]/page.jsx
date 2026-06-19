import ClassDetails from "@/components/dashboard/trainer/ClassDetails";
import { getSingleClass } from "@/lib/actions/classes";
import React from "react";

const ClassDetailsPage = async ({ params }) => {
  const { id } = await params;
  const myClass = await getSingleClass(id);
  //   console.log(myClass);

  return (
    <div>
      <ClassDetails myClass={myClass} />
    </div>
  );
};

export default ClassDetailsPage;
