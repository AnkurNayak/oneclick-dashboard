import fs from "fs";
import path from "path";
import { Car, CarDatabase } from "./CarDB";

const dataDir = path.join(process.cwd(), "database");
const filePath = path.join(dataDir, "db.json");

// Initialize db file
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, JSON.stringify({ cars: CarDatabase }, null, 2));
  console.log("Created new db.json");
}

export const getCars = async (): Promise<Car[]> => {
  try {
    const rawData = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(rawData);
    return data.cars || [];
  } catch (error) {
    console.error("Error reading db.json:", error);
    return [];
  }
};

// update cars
export const updateCarById = async (updatedCar: Car): Promise<void> => {
  try {
    const currentCars = await getCars();
    const newCarsArray = currentCars.map((car) =>
      car.id === updatedCar.id ? updatedCar : car
    );

    fs.writeFileSync(filePath, JSON.stringify({ cars: newCarsArray }, null, 2));
  } catch (error) {
    console.error("Error writing to db.json:", error);
    throw error;
  }
};
