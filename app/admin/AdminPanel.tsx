"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Post } from "@/lib/posts-repo";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type Result = { url: string; status: "created" | "duplicate" | "error"; title?: string; error?: string };

const MAX_URLS = 20;

const RESULT_STYLE: Record<Result["status"], { label: string; className: string }> = {
  created: {
    label: "Đã tạo",
    className: "border-green-200 bg-green-50 text-green-800 dark:border-green-900 dark:bg-green-950/40 dark:text-green-300",
  },
  duplicate: {
    label: "Đã có",
    className: "border-yellow-200 bg-yellow-50 text-yellow-800 dark:border-yellow-900 dark:bg-yellow-950/40 dark:text-yellow-300",
  },
  error: {
    label: "Lỗi",
    className: "border-red-200 bg-red-50 text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300",
  },
};

const card = "rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 sm:p-6 shadow-sm";

function parseUrls(text: string) {
  return text.split("\n").map((s) => s.trim()).filter(Boolean);
}

export default function AdminPanel({ posts }: { posts: Post[] }) {
  const router = useRouter();
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [results, setResults] = useState<Result[]>([]);
  const [msg, setMsg] = useState("");
  const [pending, setPending] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState<{ done: number; total: number } | null>(null);
  const [refreshNote, setRefreshNote] = useState("");

  const urlCount = parseUrls(text).length;
  const tooMany = urlCount > MAX_URLS;

  async function importUrls() {
    const urls = parseUrls(text);
    if (!urls.length || urls.length > MAX_URLS) return;
    setBusy(true);
    setMsg("");
    setResults([]);
    try {
      const res = await fetch("/api/admin/news/import", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ urls }),
      });
      if (res.status === 401) return router.replace("/admin/login");
      const data = await res.json();
      if (!res.ok) return setMsg(data.error ?? "Lỗi");
      setResults(data.results);
      // Giữ lại các URL lỗi trong ô nhập để thử lại
      setText((data.results as Result[]).filter((r) => r.status === "error").map((r) => r.url).join("\n"));
      router.refresh();
    } catch {
      setMsg("Không kết nối được máy chủ");
    } finally {
      setBusy(false);
    }
  }

  async function setStatus(id: string, status: Post["status"]) {
    setPending(id);
    try {
      const res = await fetch(`/api/admin/news/${id}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.status === 401) return router.replace("/admin/login");
      router.refresh();
    } finally {
      setPending(null);
    }
  }

  // Bài UIT import trước khi có tính năng lấy toàn văn → content null
  const missingContent = posts.filter((p) => p.source === "uit" && p.sourceUrl && !p.content);

  async function refreshContent() {
    const ids = missingContent.map((p) => p.id);
    if (!ids.length) return;
    let failed = 0;
    setRefreshNote("");
    setRefreshing({ done: 0, total: ids.length });
    try {
      for (let i = 0; i < ids.length; i += MAX_URLS) {
        const res = await fetch("/api/admin/news/refresh", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ ids: ids.slice(i, i + MAX_URLS) }),
        });
        if (res.status === 401) return router.replace("/admin/login");
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Lỗi");
        failed += (data.results as { status: string }[]).filter((r) => r.status === "error").length;
        setRefreshing({ done: Math.min(i + MAX_URLS, ids.length), total: ids.length });
        router.refresh();
      }
      setRefreshNote(`Đã cập nhật ${ids.length - failed}/${ids.length} bài${failed ? ` — ${failed} bài lỗi, thử lại sau` : ""}.`);
    } catch (e) {
      setRefreshNote((e as Error).message);
    } finally {
      setRefreshing(null);
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
  }

  const published = posts.filter((p) => p.status === "published").length;

  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <header className="flex items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-neutral-900 dark:text-white">Quản lý tin tức</h1>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              {posts.length} bài · {published} đã đăng ·{" "}
              <a href="/news" target="_blank" className="underline underline-offset-2 hover:text-neutral-900 dark:hover:text-white">
                Xem /news
              </a>
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={logout}>Đăng xuất</Button>
        </header>

        <section className={cn(card, "mb-6")}>
          <h2 className="font-semibold text-neutral-900 dark:text-white">Import từ uit.edu.vn</h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1 mb-4">
            Dán URL bài viết (mỗi dòng một URL, tối đa {MAX_URLS}). Bài được tạo ở trạng thái nháp.
          </p>
          <Textarea
            rows={6}
            className="font-mono text-xs min-h-32 max-h-80"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="https://www.uit.edu.vn/bai-viet/..."
            disabled={busy}
            aria-invalid={tooMany}
          />
          <div className="flex flex-wrap items-center justify-between gap-3 mt-3">
            <span className={cn("text-sm", tooMany ? "text-red-600 dark:text-red-400" : "text-neutral-500 dark:text-neutral-400")}>
              {urlCount} URL{tooMany && ` — vượt quá ${MAX_URLS}, hãy bớt ${urlCount - MAX_URLS} dòng`}
            </span>
            <Button onClick={importUrls} disabled={busy || urlCount === 0 || tooMany}>
              {busy ? "Đang fetch..." : "Fetch & tạo draft"}
            </Button>
          </div>

          {msg && <p className="text-sm text-red-600 dark:text-red-400 mt-3">{msg}</p>}

          {results.length > 0 && (
            <ul className="mt-4 space-y-2">
              {results.map((r, i) => {
                const s = RESULT_STYLE[r.status];
                return (
                  <li key={`${r.url}-${i}`} className={cn("rounded-lg border px-3 py-2 text-sm", s.className)}>
                    <span className="font-medium">{s.label}:</span> {r.title ?? r.url}
                    {r.error && <div className="text-xs mt-0.5 opacity-90">{r.error}</div>}
                    {r.title && <div className="text-xs mt-0.5 opacity-70 break-all">{r.url}</div>}
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        <section className={card}>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <h2 className="font-semibold text-neutral-900 dark:text-white">Bài viết ({posts.length})</h2>
            {(missingContent.length > 0 || refreshing) && (
              <Button size="sm" variant="outline" onClick={refreshContent} disabled={!!refreshing}>
                {refreshing
                  ? `Đang lấy toàn văn ${refreshing.done}/${refreshing.total}...`
                  : `Lấy toàn văn từ UIT (${missingContent.length} bài)`}
              </Button>
            )}
          </div>
          {refreshNote && <p className="text-sm text-neutral-600 dark:text-neutral-400 -mt-2 mb-4">{refreshNote}</p>}
          {posts.length === 0 ? (
            <p className="text-sm text-neutral-500 dark:text-neutral-400">Chưa có bài nào. Import ở khối phía trên.</p>
          ) : (
            <ul className="divide-y divide-neutral-200 dark:divide-neutral-800">
              {posts.map((p) => {
                const isPub = p.status === "published";
                return (
                  <li key={p.id} className="flex items-start gap-3 py-3">
                    <span
                      className={cn(
                        "shrink-0 mt-0.5 rounded-md px-2 py-0.5 text-xs font-medium",
                        isPub
                          ? "bg-green-100 text-green-800 dark:bg-green-950/60 dark:text-green-300"
                          : "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300",
                      )}
                    >
                      {isPub ? "Đã đăng" : "Nháp"}
                    </span>
                    <div className="min-w-0 flex-1">
                      {isPub ? (
                        <a href={`/news/${p.slug}`} target="_blank" className="text-sm font-medium text-neutral-900 dark:text-white hover:underline line-clamp-2">
                          {p.title}
                        </a>
                      ) : (
                        <p className="text-sm font-medium text-neutral-900 dark:text-white line-clamp-2">{p.title}</p>
                      )}
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 truncate">
                        {p.publishedAt && `${new Date(p.publishedAt).toLocaleDateString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" })} · `}
                        {p.source === "uit" ? "uit.edu.vn" : "Nội bộ"}
                        {p.source === "uit" && !p.content && " · chưa có toàn văn"}
                        {p.sourceUrl && (
                          <>
                            {" · "}
                            <a href={p.sourceUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                              bài gốc
                            </a>
                          </>
                        )}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant={isPub ? "outline" : "default"}
                      className="shrink-0"
                      disabled={pending === p.id}
                      onClick={() => setStatus(p.id, isPub ? "draft" : "published")}
                    >
                      {isPub ? "Unpublish" : "Publish"}
                    </Button>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
