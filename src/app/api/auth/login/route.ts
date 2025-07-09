import { createSession } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

const admin = {
  id: "f47ac10b58cc4372a5670e02b2c3d479",
  email: "admin@oneclickmail.com",
  password: "admin@123",
  role: "admin",
  name: "Ankur Nayak",
};
export async function POST(request: NextRequest) {
  try {
    // Add 1 sec delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const { email, password } = await request.json();

    // console.log('email', email, password)
    // match email and pass
    if (email !== admin.email || password !== admin.password) {
      return NextResponse.json({
        success: false,
        error: "Invalid email or password",
        status: 401,
      });
    }
    // if correct credentials
    await createSession(admin.id);
    return NextResponse.json({
      success: true,
      message: "Login successful",
      user: admin,
      status: 200,
    });
  } catch (err) {
    console.error("Failed to login", err);
    return NextResponse.json({
      success: false,
      error: "Internal server error",
      status: 500,
    });
  }
}
