import Profile from "@/components/dashboard/Profile";
import { getUserSession } from "@/lib/core/session";

const TrainerHomepage = async () => {
  const user = await getUserSession();
  return (
    <div>
      <Profile user={user} />
    </div>
  );
};

export default TrainerHomepage;
