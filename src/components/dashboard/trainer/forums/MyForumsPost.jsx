import Image from "next/image";
import Link from "next/link";
import { FiEdit, FiEye, FiTrash2 } from "react-icons/fi";
import DeleteForum from "./DeleteForum";
import EditForum from "./EditForum";

const MyForumsPost = ({ forums, user }) => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:p-5">
      {forums?.map((forum) => (
        <div
          key={forum._id}
          className="overflow-hidden rounded-2xl border bg-[#0F3D3E] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-primary"
        >
          {/* Image */}
          <div className="relative h-52 w-full overflow-hidden">
            <Image
              src={forum.image}
              alt={forum.title}
              fill
              className="object-cover transition duration-500 hover:scale-105"
            />
          </div>

          {/* Content */}
          <div className="space-y-3 p-5">
            <h2 className="line-clamp-1 text-xl font-semibold text-white">
              {forum.title}
            </h2>

            <p className="line-clamp-3 text-sm leading-6 text-gray-400">
              {forum.description}
            </p>

            {/* Buttons */}
            <div className="flex items-center justify-between gap-3 pt-3">
              <Link
                href={`/dashboard/trainer/forums/${forum._id}`}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-green-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-primary hover:text-black"
              >
                <FiEye />
                Details
              </Link>

              {/* <button className="flex items-center justify-center rounded-lg bg-amber-500 p-2 text-white transition hover:bg-amber-600">
                <FiEdit size={18} />
              </button> */}
              <EditForum myForum={forum} user={user} />

              {/* <button className="flex items-center justify-center rounded-lg bg-red-500 p-2 text-white transition hover:bg-red-600">
                <FiTrash2 size={18} />
              </button> */}
              <DeleteForum myForum={forum} user={user} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyForumsPost;
