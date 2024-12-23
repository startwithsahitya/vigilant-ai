import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = new URL(request.url);

  if (url.pathname === "/dashboard/student/Taketest") {
    const referrer = request.headers.get("referer");

    if (!referrer || !referrer.includes("/dashboard/student")) {
      return NextResponse.redirect(new URL("/unauthorized", url.origin));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/student/Taketest"],
};
