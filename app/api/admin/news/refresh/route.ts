import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/session";
import { repo } from "@/lib/posts-repo";
import { fetchUitMeta } from "@/lib/uit-fetch";

// Fetch lại bài UIT đã import: cập nhật toàn văn, ngày đăng, ảnh bìa, excerpt.
// Giữ nguyên slug, status, title (admin có thể đã publish/chia sẻ link).
export async function POST(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { ids } = (await req.json().catch(() => ({}))) as { ids?: unknown };
  if (
    !Array.isArray(ids) || ids.length === 0 || ids.length > 20 ||
    !ids.every((u): u is string => typeof u === "string")
  ) {
    return NextResponse.json({ error: "Gửi 1–20 id" }, { status: 400 });
  }

  const results: { id: string; status: "updated" | "error"; title?: string; error?: string }[] = [];
  for (const id of ids) { // tuần tự, tránh dồn request vào UIT
    const post = await repo.findById(id);
    if (!post?.sourceUrl || post.source !== "uit") {
      results.push({ id, status: "error", error: "Không phải bài import từ UIT" });
      continue;
    }
    try {
      const m = await fetchUitMeta(post.sourceUrl);
      await repo.update(id, {
        excerpt: m.excerpt ?? post.excerpt,
        content: m.content ?? post.content,
        coverImage: m.coverImage ?? post.coverImage,
        publishedAt: m.publishedAt ?? post.publishedAt,
      });
      results.push({ id, status: m.content ? "updated" : "error", title: post.title, error: m.content ? undefined : "Không trích được nội dung" });
    } catch (e) {
      results.push({ id, status: "error", title: post.title, error: (e as Error).message });
    }
  }
  return NextResponse.json({ results });
}
