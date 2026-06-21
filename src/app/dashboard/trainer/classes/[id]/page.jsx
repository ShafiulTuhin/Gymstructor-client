import ClassDetails from "@/components/dashboard/trainer/classes/ClassDetails";
import { getSingleClass } from "@/lib/actions/classes";
import { notFound } from "next/navigation"; // 1. Import notFound
import React from "react";
import Error from "./error";

const ClassDetailsPage = async ({ params }) => {
  const { id } = await params;
  const myClass = await getSingleClass(id);
  if (myClass.error) {
    return <Error error={myClass.error} />;
  }

  if (!myClass || Object.keys(myClass).length === 0) {
    notFound(); // This immediately stops rendering and shows your not-found.js page
  }

  return (
    <div>
      <ClassDetails myClass={myClass} />
    </div>
  );
};

export default ClassDetailsPage;
