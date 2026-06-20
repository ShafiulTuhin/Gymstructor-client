import Image from "next/image";
import Link from "next/link";
import React from "react";

const targets = [
  {
    id: 1,
    title: "Expert Fitness Instructors",
    desc: "Learn from certified trainers who guide and motivate you throughout your fitness journey.",
    image: "https://images.pexels.com/photos/9545914/pexels-photo-9545914.jpeg",
  },
  {
    id: 2,
    title: "Book Classes Instantly",
    desc: "Find and join fitness classes that match your goals with a seamless booking experience.",
    image:
      "https://images.pexels.com/photos/11800270/pexels-photo-11800270.jpeg",
  },
  {
    id: 3,
    title: "Achieve Your Fitness Goals",
    desc: "From strength training to yoga, discover programs designed to transform your lifestyle.",
    image:
      "https://images.pexels.com/photos/13451744/pexels-photo-13451744.jpeg",
  },
];

const OurMission = () => {
  return (
    <section className="py-20 px-4 md:px-10 bg-gradient-to-r from-[#0F3D3E] to-[#071E22]">
      <div className="container mx-auto">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-300 mb-5">
            💪 Why Choose Gymstructor
          </h2>

          <p className="text-gray-500 mt-3">
            Connecting fitness enthusiasts with expert instructors and
            high-quality training programs.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {targets.map((item) => (
            <div
              key={item.id}
              className="group relative bg-gradient-to-r from-[#071E22] to-[#0F3D3E] rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#15A1BF]/20 to-transparent opacity-0 group-hover:opacity-100 transition" />

              {/* Content */}
              <div className="p-6 space-y-2">
                <h3 className="text-xl font-semibold text-gray-200">
                  {item.title}
                </h3>

                <p className="text-gray-300 text-sm">{item.desc}</p>
              </div>

              {/* Animated Dot */}
              <div className="absolute top-4 right-4 w-3 h-3 bg-[#15A1BF] rounded-full animate-pulse"></div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <Link href="/classes">
            <button className="px-8 py-3 cursor-pointer bg-[#4EA618] hover:bg-green-600 transition text-white rounded-xl shadow-md hover:scale-105 transition-transform duration-300">
              Explore Classes
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OurMission;
