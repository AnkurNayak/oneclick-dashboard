// Api calls we can store here

import { verifyJWT } from "./auth";
import { Car } from "./data/CarDB";

/* ----------------------------------------------------------------------------------------------------- */
/*  @ Authentication
/* ----------------------------------------------------------------------------------------------------- */
type LoginProps = {
  email: string;
  password: string;
};
export const login = async ({ email, password }: LoginProps) => {
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error in login api", err);
  }
};

// Logout
export const logOut = async () => {
  try {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error in login api", err);
  }
};

/* ----------------------------------------------------------------------------------------------------- */
/*  @ Api calls for user
/* ----------------------------------------------------------------------------------------------------- */
export const getUser = async (token: string | undefined) => {
  try {
    const verifiedUserData = await verifyJWT();
    return verifiedUserData;
  } catch (err) {
    console.error("Error in user get api", err);
  }
};

/* ----------------------------------------------------------------------------------------------------- */
/*  @ Api calls for cars
/* ----------------------------------------------------------------------------------------------------- */
export const getCarLists = async ({
  currPage = 1,
  statusFilter,
}: {
  currPage?: number | string;
  statusFilter?: string;
} = {}) => {
  try {
    const response = await fetch(`http://localhost:3000/api/cars`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ currPage: currPage, statusFilter: statusFilter }),
    });

    const data = await response.json();

    if (data.success) {
      return data.data;
    }
    throw new Error("Failed to fetch cars", data.error);
  } catch (err) {
    console.error("Error fetching cars:", err);
  }
};

export const updateCar = async ({ carData }: { carData: Car }) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/cars/${carData.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(carData),
      }
    );
    const updatedCar = await response.json();
    return updatedCar;
  } catch (error) {
    console.error("Error updating car:", error);
  }
};
