import { NextResponse } from "next/server";
import { routePaths } from "./app/utils/common";

const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(req) {
  const paths = routePaths();

  if (
    req.nextUrl.pathname.startsWith("/_next") ||
    req.nextUrl.pathname.includes("/api/") ||
    PUBLIC_FILE.test(req.nextUrl.pathname)
  ) {
    return;
  }

  if (paths.includes(req.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const token = req.cookies.get("token")?.value;
  if (token) {
    NextResponse.redirect(new URL("/", req.url));
  } else {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}
