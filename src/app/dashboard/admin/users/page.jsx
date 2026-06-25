import UserTable from "@/components/dashboard/admin/UserTable";
import { getAllUser } from "@/lib/actions/user";

export const metadata = {
  title: "Gymstructor |Admin - User Management",
  description: "Manage trainers own forum posts",
};

const UserPage = async () => {
  const users = await getAllUser();

  return <UserTable users={users} />;
};

export default UserPage;
