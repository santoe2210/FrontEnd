import { NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(req) {
  if (
    req.nextUrl.pathname.startsWith("/_next") ||
    req.nextUrl.pathname.includes("/api/") ||
    PUBLIC_FILE.test(req.nextUrl.pathname)
  ) {
    return;
  }

  if (req.nextUrl.pathname === "/login") {
    return NextResponse.next();
  }

  const token = req.cookies.get("token")?.value;
  if (token) {
    NextResponse.redirect(new URL("/", req.url));
  } else {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}
