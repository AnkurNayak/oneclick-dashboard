import { generateJWT, setAuthCookie } from "@/lib/auth";
import { NextApiRequest, NextApiResponse } from "next";

const admin = {
  id: "f47ac10b58cc4372a5670e02b2c3d479",
  email: "admin@oneclickmail.com",
  password: "admin@123",
  role: "admin",
  name: "Ankur Nayak",
};

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

    const { email, password } = req.body;

    // match email and pass
    if (email !== admin.email || password !== admin.password) {
      return res.status(401).json({
        success: false,
        error: "Invalid email or password",
      });
    }

    // if correct credentials
    // Create session && set cookie
    const expiresAt = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);
    const session = await generateJWT({ ...admin, expiresAt });
    setAuthCookie(res, session, expiresAt);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: admin,
    });
  } catch (err) {
    console.error("Failed to login", err);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
}
