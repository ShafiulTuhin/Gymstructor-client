import Profile from "@/components/dashboard/Profile";
import ApplicationStatus from "@/components/user/ApplicationStatus";
import Statistics from "@/components/user/Statistics";
import { getMyFavoriteClass } from "@/lib/actions/favorite";
import {
  getBookingDetails,
  getNewTrainerApplication,
} from "@/lib/actions/user";
import { getUserSession } from "@/lib/core/session";

export const metadata = {
  title: "Gymstructor | user Dashboard",
  description: "User activities are listed here",
};

const UserHomePage = async () => {
  let user = null;
  let favClass = [];
  let myApplication = null;

  // 1. Check Session
  try {
    user = await getUserSession();
    console.log("DEBUG: User session successfully loaded", user?.id);
  } catch (err) {
    console.error("💥 CRASH inside getUserSession():", err.message);
  }

  // 2. Check Favorite Class
  if (user?.id) {
    try {
      favClass = await getMyFavoriteClass(user.id);
      console.log("DEBUG: Favorite classes loaded", favClass);
    } catch (err) {
      console.error("💥 CRASH inside getMyFavoriteClass():", err.message);
    }
  }

  // 3. Check Trainer Application
  if (user?.id) {
    try {
      myApplication = await getNewTrainerApplication(user.id);
      console.log("DEBUG: Trainer application loaded", myApplication);
    } catch (err) {
      console.error("💥 CRASH inside getNewTrainerApplication():", err.message);
    }
  }
  const bookings = await getBookingDetails(user?.id);
  const myBookings = bookings.data;
  console.log(myBookings);

  if (!user) {
    return (
      <div className="bg-[#071E22] min-h-screen flex items-center justify-center text-white">
        <p>Failed to clear user session or no user logged in.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#071E22] min-h-screen">
      <Profile user={user} />
      <div className="lg:flex justify-between items-center container mx-auto lg:px-0 px-4 gap-6">
        <Statistics myClass={favClass} myBookings={myBookings} />
        <ApplicationStatus myApplication={myApplication} />
      </div>
    </div>
  );
};

export default UserHomePage;
