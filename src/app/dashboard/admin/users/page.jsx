import UserTable from "@/components/dashboard/admin/UserTable";
import { getAllUser } from "@/lib/actions/user";

const UserPage = async () => {
  const users = await getAllUser();

  return <UserTable users={users} />;
};

export default UserPage;
