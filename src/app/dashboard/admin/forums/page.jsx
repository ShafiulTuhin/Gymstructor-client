import ForumsTable from "@/components/dashboard/admin/ForumsTable";
import { getAdminForums, getAllForums } from "@/lib/actions/forums";
import { getUserSession } from "@/lib/core/session";

export const metadata = {
  title: "Gymstructor | Admin-Forum Management",
  description:
    "Manage community forum posts that created by admins and trainers",
};

const AdminForumPage = async () => {
  const forums = await getAdminForums();
  const user = await getUserSession();

  return (
    <div>
      <ForumsTable forums={forums} user={user} />
    </div>
  );
};

export default AdminForumPage;
