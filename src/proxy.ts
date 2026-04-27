import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED  = ["/dashboard", "/onboarding", "/calibrating"];

export default function proxy(request: NextRequest) {
  const token = request.cookies.get("dunno_token")?.value;
  const user = request.cookies.get("dunno_user")?.value;
  const { pathname } = request.nextUrl;

  if ((!token || !user) && PROTECTED.some((p) => pathname.startsWith(p))) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/onboarding/:path*", "/calibrating/:path*", "/login"],
};
