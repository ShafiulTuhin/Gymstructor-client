// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { FiEye, FiSearch } from "react-icons/fi";

// const AllClasses = ({ classes }) => {
//   const [data, setData] = useState(classes || []);

//   const [search, setSearch] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [currentPage, setCurrentPage] = useState(1);

//   const [totalPages, setTotalPages] = useState(0);
//   const [loading, setLoading] = useState(false);

//   const categories = [
//     "all",
//     ...new Set(
//       (classes || [])
//         .map((item) => item.category)
//         .filter((cat) => cat && cat.trim() !== ""),
//     ),
//   ];

//   // ================= FETCH FROM SERVER =================
//   const fetchClasses = async () => {
//     try {
//       setLoading(true);

//       const params = new URLSearchParams({
//         search: search || "",
//         category: selectedCategory || "all",
//         page: currentPage,
//         limit: 9,
//       });

//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_BASE_URL}/api/classes?${params.toString()}`,
//       );

//       const result = await res.json();

//       setData(result.classes || []);
//       setTotalPages(result.totalPages || 0);
//     } catch (error) {
//       console.error(error);
//       setData([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ================= AUTO FETCH =================
//   useEffect(() => {
//     fetchClasses();
//   }, [search, selectedCategory, currentPage]);

//   return (
//     <div className="bg-[#071E22]">
//       <div className="mx-auto container px-5 py-10">
//         {/* ================= SEARCH ================= */}
//         <div className="mb-10 md:flex justify-between items-center">
//           <h2 className="text-white lg:ml-[380px] text-center md:text-left font-bold text-3xl md:mb-0 mb-5">
//             All Classes
//           </h2>

//           <div className="flex w-full max-w-md overflow-hidden rounded-xl border border-gray-700 bg-[#0F3D3E]">
//             <input
//               type="text"
//               placeholder="Search class..."
//               value={search}
//               onChange={(e) => {
//                 setSearch(e.target.value);
//                 setCurrentPage(1);
//               }}
//               className="flex-1 bg-transparent px-4 py-3 text-white outline-none placeholder:text-gray-400"
//             />

//             <button className="flex items-center gap-2 bg-[#4EA618] px-5 font-medium text-white transition hover:bg-green-700">
//               <FiSearch />
//               Search
//             </button>
//           </div>
//         </div>

//         <div className="grid gap-8 lg:grid-cols-4">
//           {/* ================= CATEGORY ================= */}
//           <aside className="rounded-2xl bg-[#0F3D3E] p-6 shadow-lg h-fit">
//             <h2 className="mb-5 text-xl font-semibold text-white">
//               Categories
//             </h2>

//             <div className="space-y-3">
//               {categories.map((category) => (
//                 <button
//                   key={category}
//                   onClick={() => {
//                     setSelectedCategory(category);
//                     setCurrentPage(1);
//                   }}
//                   className={`w-full rounded-lg px-4 py-2 text-left transition ${
//                     selectedCategory === category
//                       ? "bg-[#4EA618] text-white"
//                       : "bg-[#173f40] text-gray-300"
//                   }`}
//                 >
//                   {category === "all"
//                     ? "All Classes"
//                     : category.charAt(0).toUpperCase() + category.slice(1)}
//                 </button>
//               ))}
//             </div>
//             {/* ================= Gym Feature Card ================= */}
//             <div className="sm:block hidden mt-12 rounded-2xl border border-[#173f40] bg-gradient-to-b from-[#0F3D3E] to-[#071E22]  p-5 shadow-lg">
//               <h3 className="text-white text-lg font-semibold mb-3">
//                 💪 Daily Fitness Tip
//               </h3>

//               <p className="text-gray-300 text-sm leading-6">
//                 “Consistency beats intensity. Train a little every day and your
//                 body will transform over time.”
//               </p>

//               <div className="mt-4 h-2 w-full rounded-full bg-[#173f40] overflow-hidden">
//                 <div className="h-full w-2/3 bg-[#4EA618] rounded-full animate-pulse"></div>
//               </div>

//               <p className="mt-3 text-xs text-gray-400">
//                 Weekly progress motivation
//               </p>
//             </div>
//             <div className="sm:block hidden mt-8 rounded-2xl border border-[#173f40] bg-gradient-to-b from-[#0F3D3E] to-[#071E22] p-5 shadow-lg overflow-hidden">
//               <h3 className="text-white text-lg font-semibold mb-2">
//                 🏋️ Training Mode
//               </h3>

//               <p className="text-gray-300 text-sm mb-4">
//                 Stay consistent. Every rep makes you stronger.
//               </p>

//               {/* ANIMATION */}
//               <div className="flex justify-center items-center h-32 mt-5 sm:block hidden">
//                 <div className="relative w-20 h-20">
//                   {/* body */}
//                   <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-12 bg-[#4EA618] rounded-md animate-bounce"></div>

//                   {/* left weight */}
//                   <div className="absolute top-2 left-0 w-4 h-4 bg-[#00C2FF] rounded-full animate-pulse"></div>

//                   {/* right weight */}
//                   <div className="absolute top-2 right-0 w-4 h-4 bg-[#00C2FF] rounded-full animate-pulse"></div>

//                   {/* bar */}
//                   <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-1 bg-gray-400"></div>
//                 </div>
//               </div>

//               <p className="text-center text-xs text-gray-400 mt-2">
//                 Keep pushing 💪
//               </p>
//             </div>
//           </aside>

//           {/* ================= CLASSES ================= */}
//           <section className="lg:col-span-3">
//             {loading ? (
//               <p className="text-white">Loading...</p>
//             ) : (
//               <>
//                 <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
//                   {/* {data?.map((item) => (
//                     <div
//                       key={item._id}
//                       className="flex h-full flex-col overflow-hidden rounded-2xl bg-[#0F3D3E] shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl"
//                     >
//                       <div className="relative h-52 w-full">
//                         <Image
//                           src={item.image}
//                           alt={item.className}
//                           fill
//                           className="object-cover"
//                         />
//                       </div>

//                       <div className="flex flex-1 flex-col p-5">
//                         <h2 className="line-clamp-1 text-xl font-semibold text-white">
//                           {item.className}
//                         </h2>

//                         <span className="block text-gray-300 mt-2">
//                           By {item.trainerName}
//                         </span>

//                         <div className="mt-3 flex justify-between text-sm text-gray-400">
//                           <span>
//                             {item.category?.charAt(0).toUpperCase() +
//                               item.category?.slice(1)}
//                           </span>

//                           <span>
//                             {item.difficulty?.charAt(0).toUpperCase() +
//                               item.difficulty?.slice(1)}
//                           </span>
//                         </div>

//                         <p className="mt-4 line-clamp-3 flex-1 text-sm leading-6 text-gray-400">
//                           {item.description}
//                         </p>

//                         <div className="mt-6 flex items-center justify-between">
//                           <span className="text-lg font-bold text-[#4EA618]">
//                             ${item.price}
//                           </span>

//                           <Link
//                             href={`/classes/${item._id}`}
//                             className="flex items-center gap-2 rounded-lg bg-[#4EA618] px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
//                           >
//                             <FiEye />
//                             Details
//                           </Link>
//                         </div>
//                       </div>
//                     </div>
//                   ))} */}

//                   {data
//                     ?.filter(
//                       (item) => item.status?.toLowerCase() === "approved",
//                     )
//                     .map((item) => (
//                       <div
//                         key={item._id}
//                         className="flex h-full flex-col overflow-hidden rounded-2xl bg-[#0F3D3E] shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl"
//                       >
//                         <div className="relative h-52 w-full">
//                           <Image
//                             src={item.image}
//                             alt={item.className}
//                             fill
//                             className="object-cover"
//                           />
//                         </div>

//                         <div className="flex flex-1 flex-col p-5">
//                           <h2 className="line-clamp-1 text-xl font-semibold text-white">
//                             {item.className}
//                           </h2>

//                           <span className="block text-gray-300 mt-2">
//                             By {item.trainerName}
//                           </span>

//                           <div className="mt-3 flex justify-between text-sm text-gray-400">
//                             <span>
//                               {item.category?.charAt(0).toUpperCase() +
//                                 item.category?.slice(1)}
//                             </span>

//                             <span>
//                               {item.difficulty?.charAt(0).toUpperCase() +
//                                 item.difficulty?.slice(1)}
//                             </span>
//                           </div>

//                           <p className="mt-4 line-clamp-3 flex-1 text-sm leading-6 text-gray-400">
//                             {item.description}
//                           </p>

//                           <div className="mt-6 flex items-center justify-between">
//                             <span className="text-lg font-bold text-[#4EA618]">
//                               ${item.price}
//                             </span>

//                             <Link
//                               href={`/classes/${item._id}`}
//                               className="flex items-center gap-2 rounded-lg bg-[#4EA618] px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
//                             >
//                               <FiEye />
//                               Details
//                             </Link>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                 </div>

//                 {/* ================= PAGINATION ================= */}
//                 {totalPages > 1 && (
//                   <div className="mt-10 flex justify-center gap-2 flex-wrap">
//                     <button
//                       onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
//                       disabled={currentPage === 1}
//                       className="px-4 py-2 rounded-lg bg-[#173f40] text-white disabled:opacity-40"
//                     >
//                       Prev
//                     </button>

//                     {Array.from({ length: totalPages }, (_, i) => (
//                       <button
//                         key={i}
//                         onClick={() => setCurrentPage(i + 1)}
//                         className={`w-10 h-10 rounded-lg ${
//                           currentPage === i + 1
//                             ? "bg-[#4EA618] text-white"
//                             : "bg-[#173f40] text-gray-300"
//                         }`}
//                       >
//                         {i + 1}
//                       </button>
//                     ))}

//                     <button
//                       onClick={() =>
//                         setCurrentPage((p) => Math.min(p + 1, totalPages))
//                       }
//                       disabled={currentPage === totalPages}
//                       className="px-4 py-2 rounded-lg bg-[#173f40] text-white disabled:opacity-40"
//                     >
//                       Next
//                     </button>
//                   </div>
//                 )}

//                 {/* EMPTY STATE */}
//                 {data?.length === 0 && (
//                   <div className="flex h-72 items-center justify-center rounded-2xl border border-dashed border-gray-700">
//                     <p className="text-lg text-gray-400">No classes found.</p>
//                   </div>
//                 )}
//               </>
//             )}
//           </section>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AllClasses;
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiEye, FiSearch } from "react-icons/fi";

const AllClasses = ({ classes }) => {
  const [data, setData] = useState(classes || []);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const categories = [
    "all",
    ...new Set(
      (classes || [])
        .map((item) => item.category)
        .filter((cat) => cat && cat.trim() !== ""),
    ),
  ];

  // ================= FETCH =================
  const fetchClasses = async () => {
    try {
      setLoading(true);

      const params = new URLSearchParams({
        search: search || "",
        category: selectedCategory || "all",
        page: currentPage,
        limit: 9,
      });

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/classes?${params.toString()}`,
      );

      const result = await res.json();

      // ✅ FIX: apply approval filter BEFORE setting state
      const approvedOnly = (result.classes || []).filter(
        (item) => item.status?.toLowerCase() === "approved",
      );

      setData(approvedOnly);
      setTotalPages(result.totalPages || 0);
    } catch (error) {
      console.error(error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  // ================= AUTO FETCH =================
  useEffect(() => {
    fetchClasses();
  }, [search, selectedCategory, currentPage]);

  return (
    <div className="bg-[#071E22]">
      <div className="mx-auto container px-5 py-10">
        {/* ================= SEARCH ================= */}
        <div className="mb-10 md:flex justify-between items-center">
          <h2 className="text-white lg:ml-[380px] text-center md:text-left font-bold text-3xl md:mb-0 mb-5">
            All Classes
          </h2>

          <div className="flex w-full max-w-md overflow-hidden rounded-xl border border-gray-700 bg-[#0F3D3E]">
            <input
              type="text"
              placeholder="Search class..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="flex-1 bg-transparent px-4 py-3 text-white outline-none placeholder:text-gray-400"
            />

            <button className="flex items-center gap-2 bg-[#4EA618] px-5 font-medium text-white transition hover:bg-green-700">
              <FiSearch />
              Search
            </button>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-4">
          {/* ================= CATEGORY ================= */}
          <aside className="rounded-2xl bg-[#0F3D3E] p-6 shadow-lg h-fit">
            <h2 className="mb-5 text-xl font-semibold text-white">
              Categories
            </h2>

            <div className="space-y-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setCurrentPage(1);
                  }}
                  className={`w-full rounded-lg px-4 py-2 text-left transition ${
                    selectedCategory === category
                      ? "bg-[#4EA618] text-white"
                      : "bg-[#173f40] text-gray-300"
                  }`}
                >
                  {category === "all"
                    ? "All Classes"
                    : category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </aside>

          {/* ================= CLASSES ================= */}
          <section className="lg:col-span-3">
            {loading ? (
              <p className="text-white">Loading...</p>
            ) : (
              <>
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 items-stretch">
                  {data?.map((item) => (
                    <div
                      key={item._id}
                      className="h-full flex flex-col overflow-hidden rounded-2xl bg-[#0F3D3E] shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                    >
                      <div className="relative h-52 w-full flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.className}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex flex-col flex-1 p-5">
                        <h2 className="line-clamp-1 text-xl font-semibold text-white">
                          {item.className}
                        </h2>

                        <span className="block text-gray-300 mt-2">
                          By {item.trainerName}
                        </span>

                        <div className="mt-3 flex justify-between text-sm text-gray-400">
                          <span>
                            {item.category?.charAt(0).toUpperCase() +
                              item.category?.slice(1)}
                          </span>

                          <span>
                            {item.difficulty?.charAt(0).toUpperCase() +
                              item.difficulty?.slice(1)}
                          </span>
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

                {/* EMPTY STATE */}
                {data?.length === 0 && (
                  <div className="flex h-72 items-center justify-center rounded-2xl border border-dashed border-gray-700 mt-10">
                    <p className="text-lg text-gray-400">
                      No approved classes found.
                    </p>
                  </div>
                )}
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default AllClasses;
