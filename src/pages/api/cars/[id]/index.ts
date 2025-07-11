import { NextApiRequest, NextApiResponse } from "next";
import { getCars, updateCarById } from "@/lib/data/db";
import { Car } from "@/lib/data/CarDB";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method !== "PUT") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }

  //   console.log("id", id);

  const AllCars = await getCars();

  try {
    const selectedCar = AllCars.find((car: Car) => car.id === id);

    console.log(selectedCar);

    if (!selectedCar) {
      return res.status(404).json({
        success: false,
        error: "Car not found",
      });
    }
    // Update data
    const updatedCar = {
      ...selectedCar,
      ...req.body,
      lastUpdated: new Date().toISOString(),
    };

    await updateCarById(updatedCar);

    // 1 sec delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return res.status(200).json({
      success: true,
      data: updatedCar,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: { message: "Internal server error", details: error },
    });
  }
}
