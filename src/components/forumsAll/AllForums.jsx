import Image from "next/image";
import Link from "next/link";

const AllForums = ({ forum }) => {
  const { _id, title, image, authorName, description } = forum;

  return (
    <div className="h-full flex flex-col rounded-lg bg-[#0F3D3E] border border-gray-700 overflow-hidden hover:border-[#4EA618] transition">
      {/* SMALLER IMAGE FOR 4 GRID */}
      <div className="h-[300px] w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          width={300}
          height={300}
          className="h-full w-full object-cover"
        />
      </div>

      {/* CONTENT */}
      <div className="flex flex-col flex-1 p-3 text-white">
        {/* TITLE */}
        <h2 className="text-sm font-semibold line-clamp-1">{title}</h2>

        {/* AUTHOR */}
        <p className="text-[11px] text-gray-400 mt-1">By {authorName}</p>

        {/* DESCRIPTION */}
        <p className="text-xs text-gray-300 mt-4 line-clamp-3 leading-4">
          {description}
        </p>

        {/* BUTTON */}
        <div className="mt-10 pt-3">
          <Link
            href={`/forums/${_id}`}
            className="block w-full text-center rounded-md bg-[#4EA618] px-2 text-xs font-medium text-white hover:bg-[#071E22] hover:text-white transition py-3"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AllForums;
