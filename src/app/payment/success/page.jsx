import { getHeader } from "@/lib/core/server";
import { stripe } from "@/lib/stripe";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FaArrowRight, FaCheckCircle, FaDumbbell } from "react-icons/fa";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id)
    throw new Error("Please provide a valid session_id (`cs_test_...`)");

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["payment_intent"],
  });

  const { status, metadata } = session;
  const paymentIntent = session.payment_intent;

  if (status === "open") {
    return redirect("/");
  }

  await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/payment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(await getHeader()),
    },
    body: JSON.stringify({
      sessionId: session.id,
      paymentIntentId: paymentIntent.id,
      userId: session.metadata.userId,
      userName: session.metadata.userName,
      classId: session.metadata.classId,
      trainerId: session.metadata.trainerId,
      trainerName: session.metadata.trainerName,
      className: session.metadata.className,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      paymentStatus: paymentIntent.status,
    }),
  });
  if (status === "complete") {
    return (
      <section className="min-h-screen bg-[#071E22] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-3xl">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0F3D3E] shadow-2xl">
            {/* Background Glow */}
            <div className="absolute -top-24 -right-20 w-64 h-64 bg-[#00C2FF]/20 blur-3xl rounded-full" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#4EA618]/20 blur-3xl rounded-full" />

            <div className="relative z-10 px-8 md:px-14 py-14 text-center">
              {/* Success Icon */}
              <div className="flex justify-center">
                <div className="w-24 h-24 rounded-full bg-[#4EA618]/20 border border-[#4EA618]/40 flex items-center justify-center">
                  <FaCheckCircle className="text-6xl text-[#4EA618]" />
                </div>
              </div>

              <h1 className="mt-8 text-4xl md:text-5xl font-bold text-white">
                Payment Successful
              </h1>

              <p className="mt-5 text-lg text-gray-300 leading-8 max-w-xl mx-auto">
                Congratulations! Your payment has been completed successfully
                and your class has been booked. Get ready to start your fitness
                journey with your instructor.
              </p>

              {/* Status Card */}
              <div className="mt-10 rounded-2xl bg-white/5 border border-white/10 p-6">
                <div className="flex justify-center">
                  <div className="bg-[#4EA618]/20 p-4 rounded-full">
                    <FaDumbbell className="text-[#4EA618] text-3xl" />
                  </div>
                </div>

                <h3 className="mt-4 text-2xl font-semibold text-white">
                  Booking Confirmed
                </h3>

                <p className="mt-3 text-gray-400">
                  Your booking is now confirmed. You can view all your booked
                  classes from your dashboard at any time.
                </p>
              </div>

              {/* Buttons */}
              <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  href="/dashboard/user/classes"
                  className="bg-[#4EA618] hover:bg-[#5ab61d] transition-all duration-300 px-8 py-3 rounded-xl text-white font-semibold flex items-center justify-center gap-2"
                >
                  View My Bookings
                  <FaArrowRight />
                </Link>

                <Link
                  href="/classes"
                  className="border border-white/20 hover:border-[#00C2FF] hover:text-[#00C2FF] transition-all duration-300 px-8 py-3 rounded-xl text-white font-semibold"
                >
                  Browse More Classes
                </Link>
              </div>

              <p className="mt-10 text-sm text-gray-500">
                Thank you for choosing{" "}
                <span className="text-[#4EA618] font-semibold">
                  Gymstructor
                </span>
                . Keep training, stay healthy, and achieve your goals.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
