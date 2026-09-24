import { NextResponse } from "next/server";
import { createHash, timingSafeEqual } from "crypto";
import { createSession } from "@/lib/session";

const h = (s: string) => createHash("sha256").update(s).digest();

export async function POST(req: Request) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return NextResponse.json({ error: "Chưa cấu hình ADMIN_PASSWORD" }, { status: 500 });
  const { password } = await req.json().catch(() => ({}));
  const ok = typeof password === "string" && timingSafeEqual(h(password), h(expected));
  if (!ok) return NextResponse.json({ error: "Sai mật khẩu" }, { status: 401 });
  await createSession();
  return NextResponse.json({ ok: true });
}
