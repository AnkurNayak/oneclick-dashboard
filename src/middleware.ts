import { NextResponse, NextRequest } from "next/server";
import { verifyJWT } from "./lib/auth";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  // get token from cookie
  const session = request.cookies.get("session")?.value;

  const publicRoutes = ["/admin/login", "/"];
  // handle public routes

  // If no session return /

  // If already logged in then navigate to dashboard
  if (path === "/admin/login" && session) {
    // verfiy token
    const verifyToken = await verifyJWT(session);
    // console.log("verify token", verifyToken);
    if (verifyToken?.userId) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
  }

  // If path dashboard and no session
  if (path === "/admin/dashboard" && !session) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
}
