import Profile from "@/components/dashboard/Profile";
import { getUserSession } from "@/lib/core/session";

const UserHomePage = async () => {
  const user = await getUserSession();

  console.log(user);

  return (
    <div>
      <Profile user={user} />
    </div>
  );
};

export default UserHomePage;
