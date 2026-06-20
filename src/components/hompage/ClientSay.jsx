"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Sarah Ahmed",
    role: "Member",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    review:
      "The trainers are amazing! I gained strength and confidence within weeks.",
  },
  {
    id: 2,
    name: "John Smith",
    role: "Member",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    review:
      "Best gym platform I’ve ever used. Booking classes is super smooth.",
  },
  {
    id: 3,
    name: "Nusrat Jahan",
    role: "Member",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    review: "Love the structured workout plans. Everything feels professional.",
  },
  {
    id: 4,
    name: "Michael Brown",
    role: "Member",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    review: "Clean UI, easy booking, and excellent class variety.",
  },
  {
    id: 5,
    name: "Fatema Noor",
    role: "Member",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
    review: "I finally stay consistent with workouts thanks to this platform.",
  },
  {
    id: 6,
    name: "David Wilson",
    role: "Member",
    image: "https://randomuser.me/api/portraits/men/55.jpg",
    review: "Highly recommend this gym system. Everything is modern and fast.",
  },
];

const ClientSay = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setStartIndex((prev) => (prev + 1) % reviews.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const visibleReviews = [
    reviews[startIndex % reviews.length],
    reviews[(startIndex + 1) % reviews.length],
    reviews[(startIndex + 2) % reviews.length],
  ];

  return (
    <section className="py-24 bg-gradient-to-r from-[#071E22] to-[#0F3D3E] overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-5 py-2 rounded-full bg-[#15A1BF]/10 text-[#15A1BF] font-semibold mb-4">
            Testimonials
          </span>

          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-300 mb-5">
            What Our Members Say
          </h2>

          <p className="text-gray-500 text-lg">
            Real experiences from gym members who transformed their fitness
            journey with us.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {visibleReviews.map((review) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, x: 100, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -100, scale: 0.9 }}
                transition={{ duration: 0.7 }}
                whileHover={{ y: -10, scale: 1.03 }}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                className="bg-gradient-to-r from-[#071E22] to-[#0F3D3E] border border-[#15A1BF]/10 rounded-3xl p-7 shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
              >
                {/* Glow */}
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{
                    repeat: Infinity,
                    duration: 12,
                    ease: "linear",
                  }}
                  className="absolute -top-20 -right-20 w-40 h-40 bg-[#15A1BF]/10 rounded-full blur-3xl"
                />

                {/* User */}
                <div className="flex items-center gap-4 mb-5 relative z-10">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    src={review.image}
                    alt={review.name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-[#15A1BF]/20"
                  />

                  <div>
                    <h3 className="font-bold text-lg text-gray-300">
                      {review.name}
                    </h3>

                    <p className="text-[#15A1BF] text-sm font-medium">
                      {review.role}
                    </p>
                  </div>
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-4 relative z-10">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.div key={star} whileHover={{ scale: 1.3 }}>
                      <Star
                        size={18}
                        className="fill-yellow-400 text-yellow-400"
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Review */}
                <p className="text-gray-400 leading-relaxed relative z-10">
                  {review.review}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ClientSay;
