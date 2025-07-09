import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

//.env is not working for JWT_SECRET but works with variable like DATABASE_URL=MY_SECRET
// const jwtSecret = process.env.ACCESS_TOKEN_SECRET;
const jwtSecret = "MY_WEBSITE_SECRET";

const encodeKey = new TextEncoder().encode(jwtSecret);

type SessionProps = {
  userId: string;
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
  } catch (error) {
    console.log("Failed to verify session");
  }
}

// create session
export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);
  const session = await generateJWT({ userId, expiresAt });
  (await cookies()).set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
  });
}

// Clear Session
export async function removeSession() {
  (await cookies()).delete("session");
}
