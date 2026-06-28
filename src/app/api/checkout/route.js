import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { getSingleClass } from "@/lib/actions/classes";
import { auth } from "@/lib/auth";

export async function POST(req) {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");

    const userSession = await auth.api.getSession({
      headers: await headers(),
    });
    const user = userSession?.user;
    const { classId } = await req.json();

    const myClass = await getSingleClass(classId);
    const amount = Number(myClass.price);
    // console.log("myClass.price =", amount);
    // console.log("typeof =", typeof myClass.price);
    // console.log("unit_amount =", parseInt(myClass.price * 100, 10));
    const session = await stripe.checkout.sessions.create({
      customer_email: user?.email,
      mode: "payment",

      metadata: {
        userId: user?.id,
        email: user?.email,
        userName: user?.name,
        classId: myClass._id?.toString(),
        className: myClass?.className,
        schedule: JSON.stringify(myClass?.schedule),
        trainerId: myClass?.trainerId,
        trainerName: myClass?.trainerName,
        price: Number(myClass.price),
      },

      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: myClass.className,
            },
            unit_amount: parseInt(myClass.price * 100, 10),
          },
          quantity: 1,
        },
      ],

      success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancel`,
    });
    // console.log(session.metadata);
    return NextResponse.json({ url: session.url });
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 },
    );
  }
}
