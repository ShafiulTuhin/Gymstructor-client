import Image from "next/image";
import Link from "next/link";
import { FiEdit, FiEye, FiTrash2 } from "react-icons/fi";

const MyForumsPost = ({ forums }) => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {forums?.map((forum) => (
        <div
          key={forum._id}
          className="overflow-hidden rounded-2xl border border-gray-800 bg-gradient-to-b from-[#1B1B1B] via-gray-900 to-[#0b1220] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-primary"
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
                href={`/forums/${forum._id}`}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-primary px-4 py-2 text-sm font-medium text-primary transition hover:bg-primary hover:text-black"
              >
                <FiEye />
                Details
              </Link>

              <button className="flex items-center justify-center rounded-lg bg-amber-500 p-2 text-white transition hover:bg-amber-600">
                <FiEdit size={18} />
              </button>

              <button className="flex items-center justify-center rounded-lg bg-red-500 p-2 text-white transition hover:bg-red-600">
                <FiTrash2 size={18} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyForumsPost;
