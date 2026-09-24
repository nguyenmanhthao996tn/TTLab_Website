import type { Metadata } from "next";
import Link from "next/link";
import { listPublishedNews, postDate } from "@/lib/news";

// Đọc data/posts.json mỗi request — không prerender lúc build
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Tin tức | TTLab",
  description: "Tin tức và hoạt động của TTLab (The Things Lab) — FCE, UIT, VNU-HCM.",
};

export default async function NewsPage() {
  const posts = await listPublishedNews();

  return (
    <main className="max-w-6xl mx-auto px-4 py-12 sm:py-16">
      <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-3">Tin tức</h1>
      <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-10">Hoạt động và thành tích mới nhất của TTLab.</p>

      {posts.length === 0 ? (
        <p className="text-neutral-500 dark:text-neutral-400">Chưa có bài viết nào.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((p) => {
            const date = postDate(p);
            return (
              <Link
                key={p.id}
                href={`/news/${p.slug}`}
                className="group flex flex-col rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="aspect-video bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
                  {p.coverImage ? (
                    // <img> thường: ảnh từ uit.edu.vn, next.config không khai báo remotePatterns
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.coverImage}
                      alt=""
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-sm text-neutral-400 dark:text-neutral-500">
                      Không có ảnh
                    </div>
                  )}
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <time dateTime={date.iso} className="text-xs text-neutral-500 dark:text-neutral-400">
                    {date.label}
                  </time>
                  <h2 className="mt-2 font-bold text-neutral-900 dark:text-white line-clamp-2 group-hover:underline underline-offset-2">
                    {p.title}
                  </h2>
                  {p.excerpt && (
                    <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-3">
                      {p.excerpt}
                    </p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </main>
  );
}
