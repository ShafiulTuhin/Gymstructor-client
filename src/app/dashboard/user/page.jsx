import Profile from "@/components/dashboard/Profile";
import ApplicationStatus from "@/components/user/ApplicationStatus";
import Statistics from "@/components/user/Statistics";
import { getMyFavoriteClass } from "@/lib/actions/favorite";
import { getNewTrainerApplication } from "@/lib/actions/user";
import { getUserSession } from "@/lib/core/session";

const UserHomePage = async () => {
  const user = await getUserSession();
  const favClass = await getMyFavoriteClass(user?.id);
  const myApplication = await getNewTrainerApplication(user?.id);
  // console.log(myApplication || "Not yet");

  return (
    <div className="bg-[#071E22] min-h-screen">
      <Profile user={user} />
      <div className="lg:flex justify-between items-center max-w-5xl mx-auto lg:px-0 px-4">
        <Statistics myClass={favClass} />
        <ApplicationStatus myApplication={myApplication} />
      </div>
    </div>
  );
};

export default UserHomePage;
