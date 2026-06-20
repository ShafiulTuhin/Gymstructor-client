import { getLatestClasses } from "@/lib/actions/classes";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const LatestClasses = async () => {
  const classes = await getLatestClasses();

  return (
    <div>
      <section className="bg-gradient-to-r from-[#0F3D3E] to-[#071E22]">
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-300 text-center mb-5 py-8">
            🔥 Top 3 Latest Classes
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {classes.map((cls) => (
              <div
                key={cls.id}
                className="bg-gradient-to-r from-[#071E22] to-[#0F3D3E] border border-white/10 rounded-xl space-y-6 p-5 text-white hover:scale-[1.02] transition"
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
    </div>
  );
};

export default LatestClasses;
