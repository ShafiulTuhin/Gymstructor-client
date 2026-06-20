import { getSingleClass } from "@/lib/actions/classes";
import Image from "next/image";
import React from "react";
import { FaUserCircle, FaDumbbell } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";

const PaymentInformationPage = async ({ params }) => {
  const { id } = await params;
  const myClass = await getSingleClass(id);

  return (
    <section className="min-h-screen bg-[#0F3D3E] py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT SIDE */}
          <div className="lg:col-span-2">
            <article className="bg-gradient-to-b from-[#4EA618] to-[#192425] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              {/* IMAGE */}
              <div className="relative">
                <Image
                  src={myClass.image || "/placeholder.png"}
                  alt={myClass.className}
                  width={450}
                  height={260}
                  className="w-full h-[260px] md:h-[420px] object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-black/20 to-transparent" />
              </div>

              {/* CONTENT */}
              <div className="px-6 md:px-10 py-10">
                {/* className */}
                <h1 className="text-3xl md:text-5xl font-bold text-white">
                  {myClass.className}
                </h1>

                {/* META */}
                <div className="flex flex-wrap gap-6 mt-6 text-gray-300 border-b border-white/10 pb-6">
                  <div className="flex items-center gap-2">
                    <FaUserCircle className="text-[#00C2FF]" />
                    <span>{myClass.trainerName}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <FaDumbbell className="text-[#00C2FF]" />
                    <span>{myClass.category}</span>
                  </div>
                </div>

                {/* DESCRIPTION */}
                <p className="mt-8 text-gray-300 leading-8 text-lg">
                  {myClass.description}
                </p>
              </div>
            </article>
          </div>

          {/* RIGHT SIDE (PAYMENT CARD) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-gradient-to-b from-[#192425] to-[#0b1220] border border-white/10 rounded-3xl p-6 shadow-2xl">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <MdOutlinePayment className="text-[#00C2FF]" />
                Payment Summary
              </h2>

              <div className="mt-8 space-y-5 text-gray-300">
                <div className="flex justify-between">
                  <span>Class</span>
                  <span className="text-white font-semibold">
                    {myClass.className}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Trainer</span>
                  <span className="text-white font-semibold">
                    {myClass.trainerName}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span>Price</span>
                  <span className="text-3xl font-bold text-[#4EA618]">
                    ${myClass.price}
                  </span>
                </div>
              </div>

              {/* Stripe Button Placeholder */}
              <button
                // onClick={handlePayment}
                className="mt-8 w-full bg-[#4EA618] font-semibold py-3 rounded-xl hover:opacity-90 transition cursor-pointer text-white"
              >
                Proceed to Payment
              </button>

              <p className="text-gray-400 text-sm mt-3 text-center">
                Secure payment powered by Stripe
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentInformationPage;
