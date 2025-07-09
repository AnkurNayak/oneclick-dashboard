// Api calls we can store here
type LoginProps = {
  email: string;
  password: string;
};
export const login = async ({ email, password }: LoginProps) => {
  // Try / catch for double verification : if we don't get valid response : not required here though
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
