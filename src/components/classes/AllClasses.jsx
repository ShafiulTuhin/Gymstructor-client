"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiEye, FiSearch } from "react-icons/fi";

const AllClasses = ({ classes }) => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const categories = [
    "all",
    ...new Set(
      classes
        ?.map((item) => item.category)
        .filter((cat) => cat && cat.trim() !== ""),
    ),
  ];

  //   const filteredClasses = classes?.filter((item) => {
  //     const matchSearch = item.className
  //       ?.toLowerCase()
  //       .includes(search.toLowerCase());

  //     const matchCategory =
  //       selectedCategory === "all" || item.category === selectedCategory;

  //     return matchSearch && matchCategory;
  //   });
  const filteredClasses = classes?.filter((item) => {
    const matchSearch = item.className
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      selectedCategory === "all" || item.category === selectedCategory;

    return matchSearch && matchCategory;
  });
  return (
    <div className="mx-auto bg-[#071E22] px-5 py-10">
      {/* ================= Search ================= */}
      <div className="mb-10 flex justify-end">
        <div className="flex w-full max-w-md overflow-hidden rounded-xl border border-gray-700 bg-[#0F3D3E]">
          <input
            type="text"
            placeholder="Search class..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent px-4 py-3 text-white outline-none placeholder:text-gray-400"
          />

          <button className="flex items-center gap-2 bg-[#4EA618] px-5 font-medium text-white transition hover:bg-green-700">
            <FiSearch />
            Search
          </button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-4">
        {/* ================= Category ================= */}
        <aside className="rounded-2xl bg-[#0F3D3E] p-6 shadow-lg h-fit">
          <h2 className="mb-5 text-xl font-semibold text-white">Categories</h2>

          <div className="space-y-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`w-full rounded-lg px-4 py-2 text-left transition ${
                  selectedCategory === category
                    ? "bg-[#4EA618] text-white"
                    : "bg-[#173f40] text-gray-300"
                }`}
              >
                {category === "all" ? "All Classes" : category}
              </button>
            ))}
          </div>
        </aside>

        {/* ================= Classes ================= */}

        <section className="lg:col-span-3">
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filteredClasses?.map((item) => (
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
      </div>
    </div>
  );
};

export default AllClasses;
