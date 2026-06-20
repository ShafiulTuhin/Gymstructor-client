import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export async function proxy(request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  if (user) {
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL("/auth/login", request.url));
}

export const config = {
  matcher: ["/classes/:id", "/forums/:id"],
};
