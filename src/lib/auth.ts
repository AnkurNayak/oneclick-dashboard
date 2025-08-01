import { SignJWT, jwtVerify } from "jose";
import { NextApiResponse } from "next";

//.env is not working for JWT_SECRET but works with variable like DATABASE_URL=MY_SECRET
// const jwtSecret = process.env.ACCESS_TOKEN_SECRET;
const jwtSecret = "MY_WEBSITE_SECRET";

const encodeKey = new TextEncoder().encode(jwtSecret);

type SessionProps = {
  id: string;
  email: string;
  password: string;
  role: string;
  name: string;
  expiresAt: Date;
};

export async function generateJWT(payload: SessionProps) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(encodeKey);
}

export async function verifyJWT(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodeKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (err) {
    console.error("Failed to verify session", err);
  }
}

// Set cookie
export function setAuthCookie(
  res: NextApiResponse,
  session: string,
  expiresAt: Date
) {
  res.setHeader(
    "Set-Cookie",
    `session=${session}; Path=/; HttpOnly; Secure; SameSite=Lax; Expires=${expiresAt.toUTCString()}`
  );
}

// clear cookie
export function clearAuthCookie(res: NextApiResponse) {
  res.setHeader(
    "Set-Cookie",
    "session=; Path=/; HttpOnly; Secure; SameSite=Lax; Expires=Thu, Max-Age=0"
  );
}
