import { NextApiRequest, NextApiResponse } from "next";
import { getCars } from "@/lib/data/db";

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
    // Parse the request body
    const { currPage } =
      typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    if (typeof currPage !== "number" || currPage < 1) {
      return res.status(400).json({
        success: false,
        error: "Invalid currPage parameter",
      });
    }

    const AllCars = await getCars();

    // Add 1 sec delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const startingPage = (currPage - 1) * 15;
    const endingPage = startingPage + 15;
    const displayedCars = AllCars.slice(startingPage, endingPage);
    const totalCars = AllCars.length;
    const totalPages = Math.ceil(totalCars / 15);

    return res.status(200).json({
      success: true,
      data: {
        cars: displayedCars,
        pagination: {
          currentPage: currPage,
          totalCars,
          totalPages,
          hasNext: currPage < totalPages,
          hasPrevious: currPage > 1,
        },
      },
    });
  } catch (error) {
    console.error("Error in /api/cars:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
}
