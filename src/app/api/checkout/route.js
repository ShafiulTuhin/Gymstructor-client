import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { getSingleClass } from "@/lib/actions/classes";
import { auth } from "@/lib/auth";

export async function POST(req) {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");
    const PRICE_ID = "price_1TkItpFj0iy4Yi9ahmXSdfzR";
    const userSession = await auth.api.getSession({
      headers: await headers(),
    });
    const user = userSession?.user;
    const { classId } = await req.json();
    console.log(classId);
    const myClass = await getSingleClass(classId);
    const amount = Number(myClass.price);

    console.log("FINAL AMOUNT:", amount);
    console.log("IS NAN:", isNaN(amount));
    console.log("Type:", typeof amount);
    // console.log("PRICE RAW:", myClass?.price);
    // console.log("PRICE TYPE:", typeof myClass?.price);
    // Create Checkout Sessions from body params.
    // const session = await stripe.checkout.sessions.create({
    //   //   member_email: user?.email,
    //   metadata: {
    //     userId: user?.id,
    //     email: user?.email,
    //     userName: user?.name,
    //     // classId: myClass._id.toString(),
    //     // className: myClass.title,
    //     // price: myClass.price,
    //   },
    //   line_items: [
    //     // {
    //     //   // Provide the exact Price ID (for example, price_1234) of the product you want to sell
    //     //   price: amount,
    //     //   quantity: 1,
    //     // },
    //     {
    //       price_data: {
    //         currency: "usd",
    //         product_data: {
    //           name: myClass.className || "Class",
    //         },
    //         unit_amount: Number(myClass.price),
    //       },
    //       quantity: 1,
    //     },
    //   ],
    //   mode: "payment",
    //   success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    // });
    const session = await stripe.checkout.sessions.create({
      mode: "payment",

      metadata: {
        userId: user?.id,
        email: user?.email,
        classId: myClass._id?.toString(),
        className: myClass.className,
        price: String(myClass.price),
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
    return NextResponse.json({ url: session.url });
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 },
    );
  }
}
