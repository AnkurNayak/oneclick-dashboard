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

  const AllCars = await getCars();

  // filter logic
  let filteredCars = AllCars;

  try {
    // Add 1 sec delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const { currPage, statusFilter } = req.body;

    // filter logic
    if (
      statusFilter &&
      ["approved", "pending", "rejected"].includes(statusFilter)
    ) {
      filteredCars = AllCars.filter((car) => car.status === statusFilter);
    }

    console.log("filtere cars", filteredCars);

    // console.log("req body console", req.body);
    const startingPage = (currPage - 1) * 15;
    const endingPage = startingPage + 15;
    const displayedCars = filteredCars.slice(startingPage, endingPage);
    const totalCars = filteredCars.length;
    const totalPages = Math.ceil(totalCars / 15);

    // console.log(displayedCars);

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
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
}
