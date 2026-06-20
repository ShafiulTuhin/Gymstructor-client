import { getSingleClass, getTopClasses } from "@/lib/actions/classes";
import Image from "next/image";
import Link from "next/link";

const FeaturedClasses = async () => {
  const classes = await getTopClasses();

  return (
    <section className=" bg-gradient-to-r from-[#071E22] to-[#0F3D3E]">
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-white mb-8">
          🔥 Top 3 Popular Classes
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {classes.map((cls) => (
            <div
              key={cls.id}
              className="bg-gradient-to-r from-[#071E22] to-[#0F3D3E] border border-white/10 rounded-xl p-5 text-white hover:scale-[1.02] transition"
            >
              {/* Image */}
              <div className="relative h-52 w-full">
                <Image
                  src={cls.image}
                  alt={cls.className}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xl font-bold">{cls.className}</h3>

              <p className="text-gray-400 mt-1">Trainer: {cls.trainerName}</p>

              <span className="text-[#15A1BF]">
                Category:{" "}
                {cls.category.charAt(0).toUpperCase() + cls.category.slice(1)}
              </span>

              <p className="mt-2">
                💰 ${cls.price} / ⏱ {cls.duration}
              </p>

              <p className="mt-2 text-emerald-400 font-semibold">
                🔥 Bookings: {cls.bookingCount}
              </p>

              <Link href={`/classes/${cls.id}`}>
                <button className="mt-4 w-full bg-[#4EA618] hover:bg-green-600 transition  py-2 rounded-lg font-semibold cursor-pointer">
                  Details
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedClasses;
