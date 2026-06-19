import ForumDetails from "@/components/forums/ForumDetails";

import LikeUnLike from "@/components/forumsAll/LikeUnLike";
import { getSingleForum } from "@/lib/actions/forums";
import { getUserSession } from "@/lib/core/session";

const ForumDetailsPage = async ({ params }) => {
  const { id } = await params;

  const forum = await getSingleForum(id);
  const user = await getUserSession();

  return (
    <div className="min-h-screen bg-[#071E22] px-5 py-10">
      <div className="mx-auto lg:flex max-w-7xl items-start gap-6">
        {/* LEFT */}
        <div className="flex-1">
          <ForumDetails forum={forum} />
        </div>

        {/* RIGHT */}
        <div className="sticky top-24 flex flex-col gap-4">
          <LikeUnLike forum={forum} user={user} />
        </div>
      </div>
    </div>
  );
};

export default ForumDetailsPage;
