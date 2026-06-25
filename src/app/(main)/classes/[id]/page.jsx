import ClassDetails from "@/components/dashboard/trainer/classes/ClassDetails";
import AddToFavorite from "@/components/user/AddToFavorite";
import { getSingleClass } from "@/lib/actions/classes";
import { getBookingDetails } from "@/lib/actions/user";
import { getUserSession } from "@/lib/core/session";

import React from "react";
import Error from "./error";
import { toast } from "react-toastify";
import BookNowButton from "@/components/user/BookNowButton";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const myClass = await getSingleClass(id);
  return {
    title: `Gymstructor | Class-${myClass.className}`,
    description: myClass.description,
  };
}

const DetailsClassPage = async ({ params }) => {
  const { id } = await params;
  const myClass = await getSingleClass(id);
  const user = await getUserSession();
  const bookings = await getBookingDetails(user?.id);

  const myBookings = bookings.data || [];
  // console.log(myBookings);

  const isBooked = myBookings.find(
    (b) => b.userId === user?.id && b.classId === myClass._id,
  );

  if (myClass.error) {
    return <Error error={myClass.error} />;
  }

  return (
    <div className="min-h-screen bg-[#071E22] px-5 py-10">
      <ClassDetails myClass={myClass} />

      {/* ACTION BUTTONS */}
      <div className="max-w-6xl mx-auto flex justify-center">
        <div className="flex gap-4">
          {/* BOOK BUTTON */}

          {/* {isBooked ? (
            <Button
              disabled
              className="bg-gray-600 text-white px-10 py-5 rounded-lg font-semibold cursor-not-allowed"
            >
              Already Booked
            </Button>
          ) : (
            <Link href={`/payment/${myClass._id}`}>
              <Button className="bg-[#4EA618] text-white px-10 py-5 rounded-lg font-semibold hover:bg-green-600 transition">
                Book Class
              </Button>
            </Link>
          )} */}
          <BookNowButton user={user} myClass={myClass} isBooked={isBooked} />

          {/* FAVORITE BUTTON */}
          <AddToFavorite user={user} myClass={myClass} />
        </div>
      </div>
    </div>
  );
};

export default DetailsClassPage;
