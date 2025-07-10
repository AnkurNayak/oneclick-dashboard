// pages/api/user.ts
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }

  const token = req.cookies.session;

  // Verify token and get user data
  try {
    // Your actual user verification logic here
    const userData = {
      id: "123",
      name: "John Doe",
      isAdmin: true,
    };

    return res.status(200).json({
      success: true,
      user: userData,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: "Unauthorized",
    });
  }
}
