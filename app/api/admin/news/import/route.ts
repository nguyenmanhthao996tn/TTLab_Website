import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/session";
import { repo } from "@/lib/posts-repo";
import { fetchUitMeta } from "@/lib/uit-fetch";

export async function POST(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { urls } = (await req.json().catch(() => ({}))) as { urls?: unknown };
  if (
    !Array.isArray(urls) || urls.length === 0 || urls.length > 20 ||
    !urls.every((u): u is string => typeof u === "string")
  ) {
    return NextResponse.json({ error: "Gửi 1–20 URL" }, { status: 400 });
  }

  const results: { url: string; status: "created" | "duplicate" | "error"; title?: string; error?: string }[] = [];
  for (const url of urls) { // tuần tự, tránh dồn request vào UIT
    try {
      const m = await fetchUitMeta(url);
      if (await repo.findBySourceUrl(m.sourceUrl)) {
        results.push({ url, status: "duplicate" });
        continue;
      }
      const post = await repo.create({
        title: m.title,
        excerpt: m.excerpt,
        content: m.content,
        coverImage: m.coverImage,
        source: "uit",
        sourceUrl: m.sourceUrl,
        status: "draft",
        publishedAt: m.publishedAt,
      });
      results.push({ url, status: "created", title: post.title });
    } catch (e) {
      results.push({ url, status: "error", error: (e as Error).message });
    }
  }
  return NextResponse.json({ results });
}
