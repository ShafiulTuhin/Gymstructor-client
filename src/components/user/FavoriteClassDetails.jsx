import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FiEye } from "react-icons/fi";

const FavoriteClassDetails = ({ classes }) => {
  return (
    <section className="lg:col-span-3">
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {classes?.map((item) => (
          <div
            key={item._id}
            className="flex h-full flex-col overflow-hidden rounded-2xl bg-[#0F3D3E] shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            {/* Image */}
            <div className="relative h-52 w-full">
              <Image
                src={item.image}
                alt={item.className}
                fill
                className="object-cover"
              />
            </div>

            {/* Body */}
            <div className="flex flex-1 flex-col p-5">
              <h2 className="line-clamp-1 text-xl font-semibold text-white">
                {item.className}
              </h2>

              <div className="mt-3 flex justify-between text-sm text-gray-400">
                <span>{item.category}</span>
                <span>{item.difficulty}</span>
              </div>

              <p className="mt-4 line-clamp-3 flex-1 text-sm leading-6 text-gray-400">
                {item.description}
              </p>

              <div className="mt-6 flex items-center justify-between">
                <span className="text-lg font-bold text-[#4EA618]">
                  ${item.price}
                </span>

                <Link
                  href={`/classes/${item._id}`}
                  className="flex items-center gap-2 rounded-lg bg-[#4EA618] px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
                >
                  <FiEye />
                  Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {classes?.length === 0 && (
        <div className="flex h-72 items-center justify-center rounded-2xl border border-dashed border-gray-700">
          <p className="text-lg text-gray-400">No classes available.</p>
        </div>
      )}
    </section>
  );
};

export default FavoriteClassDetails;
