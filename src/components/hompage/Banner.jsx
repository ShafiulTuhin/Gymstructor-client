"use client";

import { useEffect, useState } from "react";
import { Button } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Dumbbell, Flame, Activity } from "lucide-react";
import Image from "next/image";

const slides = [
  {
    id: 1,
    title: "Unlock Your Strongest Version Today",
    description:
      "Join expert-led fitness classes designed to build strength, endurance, and confidence.",
    image: "https://images.pexels.com/photos/7811531/pexels-photo-7811531.jpeg",
    icon: <Dumbbell size={24} />,
  },
  {
    id: 2,
    title: "Push Your Limits Every Session",
    description:
      "High-intensity workouts and structured training plans to transform your body faster.",
    image:
      "https://images.pexels.com/photos/29392546/pexels-photo-29392546.jpeg",
    icon: <Flame size={24} />,
  },
  {
    id: 3,
    title: "Train Smarter. Get Stronger. Live Better.",
    description:
      "Access modern gym programs, professional trainers, and guided fitness journeys.",
    image:
      "https://images.pexels.com/photos/29526371/pexels-photo-29526371.jpeg",
    icon: <Activity size={24} />,
  },
];

const GymHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const slider = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(slider);
  }, []);

  return (
    <section className="relative h-[90vh] overflow-hidden">
      {/* Background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[currentSlide].id}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <Image
            src={slides[currentSlide].image}
            alt="Gym Banner"
            fill
            priority
            className="object-cover"
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/60" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="max-w-3xl text-white">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2 rounded-full mb-6 border border-white/20"
            >
              {slides[currentSlide].icon}
              <span className="font-medium">Elite Gym & Fitness Platform</span>
            </motion.div>

            {/* Title */}
            <AnimatePresence mode="wait">
              <motion.h1
                key={slides[currentSlide].title}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.7 }}
                className="text-4xl md:text-6xl font-extrabold leading-tight mb-6"
              >
                {slides[currentSlide].title}
              </motion.h1>
            </AnimatePresence>

            {/* Description */}
            <AnimatePresence mode="wait">
              <motion.p
                key={slides[currentSlide].description}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl"
              >
                {slides[currentSlide].description}
              </motion.p>
            </AnimatePresence>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href={"/classes"}>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#15A1BF] to-emerald-500 text-white font-semibold px-8 rounded-lg"
                >
                  Explore Classes
                </Button>
              </Link>

              <Button
                size="lg"
                variant="bordered"
                className="border-white text-white font-semibold px-8"
              >
                Join Membership
              </Button>
            </motion.div>

            {/* Dots */}
            <div className="flex gap-3 mt-10">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    currentSlide === index
                      ? "w-10 bg-[#15A1BF]"
                      : "w-3 bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GymHero;
