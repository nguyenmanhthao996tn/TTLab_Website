import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

export const SESSION_COOKIE = "admin_session";
const MAX_AGE = 60 * 60 * 8; // 8h

function key() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error("Chưa cấu hình SESSION_SECRET");
  return new TextEncoder().encode(secret);
}

export async function createSession() {
  const token = await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(key());
  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: MAX_AGE,
  });
}

export async function destroySession() {
  (await cookies()).delete(SESSION_COOKIE);
}

// Dùng chung cho proxy.ts (đọc cookie từ request) và server component/route
export async function verifyToken(token: string | undefined) {
  if (!token) return false;
  try {
    const { payload } = await jwtVerify(token, key(), { algorithms: ["HS256"] });
    return payload.role === "admin";
  } catch {
    return false;
  }
}

export async function isAdmin() {
  return verifyToken((await cookies()).get(SESSION_COOKIE)?.value);
}
