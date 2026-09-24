import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/session";
import { repo } from "@/lib/posts-repo";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const { status } = await req.json().catch(() => ({}));
  if (status !== "draft" && status !== "published") {
    return NextResponse.json({ error: "status không hợp lệ" }, { status: 400 });
  }
  const post = await repo.setStatus(id, status);
  return post ? NextResponse.json({ post }) : NextResponse.json({ error: "Not found" }, { status: 404 });
}
