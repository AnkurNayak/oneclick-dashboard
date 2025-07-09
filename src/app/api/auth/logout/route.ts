import { removeSession } from "@/lib/auth";
import { NextResponse } from "next/server";
import { success } from "zod/v4-mini";

export async function POST() {
  try {
    // Add 1 sec delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // Remove session : cookie "session"
    await removeSession();

    return NextResponse.json({
      success: true,
      message: "Logout successful",
      status: 201,
    });
  } catch (err) {
    console.error("Logout error:", err);
    return NextResponse.json({
      succes: false,
      error: "Internal server error",
      status: 500,
    });
  }
}
