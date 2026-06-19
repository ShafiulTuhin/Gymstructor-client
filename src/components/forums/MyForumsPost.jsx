import Image from "next/image";
import Link from "next/link";
import { FiEye } from "react-icons/fi";
import DeleteForum from "./DeleteForum";
import EditForum from "./EditForum";

const MyForumsPost = ({ forums, user }) => {
  if (!forums || forums.length === 0) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="text-3xl text-gray-400">No forums found.</p>
      </div>
    );
  }

  return (
    <div className="px-5 py-10">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {forums.map((forum) => (
          <div
            key={forum._id}
            className="flex flex-col overflow-hidden rounded-2xl bg-[#0F3D3E] shadow-lg transition hover:-translate-y-1"
          >
            {/* IMAGE */}
            <div className="relative h-52 w-full">
              <Image
                src={forum.image}
                alt={forum.title}
                fill
                className="object-cover"
              />
            </div>

            {/* CONTENT */}
            <div className="flex flex-1 flex-col p-5 text-white">
              <h2 className="line-clamp-1 text-xl font-semibold">
                {forum.title}
              </h2>

              <p className="mt-2 line-clamp-3 text-sm text-gray-300">
                {forum.description}
              </p>

              {/* ACTIONS */}
              <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                <Link
                  href={`/dashboard/trainer/forums/${forum._id}`}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#173f40] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#4EA618]"
                >
                  <FiEye />
                  Details
                </Link>

                <EditForum myForum={forum} user={user} />
                <DeleteForum myForum={forum} user={user} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyForumsPost;
