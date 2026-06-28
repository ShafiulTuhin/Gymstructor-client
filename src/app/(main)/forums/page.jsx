import AllForums from "@/components/forumsAll/AllForums";
import { getAllForums } from "@/lib/actions/forums";
import Link from "next/link";

export const metadata = {
  title: "Gymstructor | Community Forums",
  description: "All articles that posted by author",
};

const AllForumsPage = async ({ searchParams }) => {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;

  const forums = await getAllForums(currentPage);

  return (
    <div className="bg-[#071E22]">
      <div className="container mx-auto py-[100px]">
        <h2 className="text-white text-3xl mb-5">
          Community Posts : {forums.total}
        </h2>

        {/* Forums Grid */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 lg:px-0 px-4">
          {forums.forums.map((forum) => (
            <AllForums key={forum._id} forum={forum} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-10">
          {/* Prev */}
          {currentPage > 1 ? (
            <Link
              href={`/forums?page=${currentPage - 1}`}
              className="px-4 py-2 rounded bg-gray-700 text-white hover:bg-gray-600"
            >
              Prev
            </Link>
          ) : (
            <span className="px-4 py-2 rounded bg-gray-800 text-gray-500 cursor-not-allowed">
              Prev
            </span>
          )}

          {/* Page Numbers */}
          {Array.from({ length: forums.totalPages }, (_, index) => {
            const page = index + 1;

            return (
              <Link
                key={page}
                href={`/forums?page=${page}`}
                className={`px-4 py-2 rounded ${
                  currentPage === page
                    ? "bg-[#4EA618] text-white"
                    : "bg-gray-700 text-white hover:bg-gray-600"
                }`}
              >
                {page}
              </Link>
            );
          })}

          {/* Next */}
          {currentPage < forums.totalPages ? (
            <Link
              href={`/forums?page=${currentPage + 1}`}
              className="px-4 py-2 rounded bg-gray-700 text-white hover:bg-gray-600"
            >
              Next
            </Link>
          ) : (
            <span className="px-4 py-2 rounded bg-gray-800 text-gray-500 cursor-not-allowed">
              Next
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllForumsPage;
