import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  if (path === "/admin/login") {
    return NextResponse.next();
  }
}

export const config = {};
