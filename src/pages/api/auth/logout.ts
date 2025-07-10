import { clearAuthCookie } from "@/lib/auth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }
  try {
    // Add 1 sec delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // Remove session : cookie "session"
    clearAuthCookie(res);
    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (err) {
    console.error("Logout error:", err);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
}
