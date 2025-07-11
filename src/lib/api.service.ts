// Api calls we can store here

import { verifyJWT } from "./auth";
import { Car } from "./data/CarDB";

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL ||
  "https://oneclick-dashboard-two.vercel.app" ||
  "https://oneclick-dashboard-2xmzw93pn-ankurnayaks-projects.vercel.app";
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
export const getUser = async () => {
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
  console.log(baseUrl);
  try {
    const response = await fetch(`${baseUrl}/api/cars`, {
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
    const response = await fetch(`${baseUrl}/api/cars/${carData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(carData),
    });
    const updatedCar = await response.json();
    return updatedCar;
  } catch (error) {
    console.error("Error updating car:", error);
  }
};
