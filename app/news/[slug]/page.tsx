import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";
import { repo } from "@/lib/posts-repo";
import { postDate } from "@/lib/news";
import { sanitizePostHtml } from "@/lib/sanitize-post";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

// Chỉ trả bài đã đăng — draft coi như không tồn tại. cache() để metadata và page dùng chung 1 lần đọc.
const getPublished = cache(async (slug: string) => {
  const post = await repo.findBySlug(slug);
  return post?.status === "published" ? post : null;
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPublished((await params).slug);
  if (!post) return { title: "Không tìm thấy | TTLab" };
  const description = post.excerpt ?? undefined;
  return {
    title: `${post.title} | TTLab`,
    description,
    openGraph: {
      type: "article",
      title: post.title,
      description,
      publishedTime: postDate(post).iso,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const post = await getPublished((await params).slug);
  if (!post) notFound();
  const date = postDate(post);

  return (
    <main className="max-w-3xl mx-auto px-4 py-10 sm:py-14">
      <Link href="/news" className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white">
        ← Tất cả tin tức
      </Link>

      <article className="mt-6">
        <time dateTime={date.iso} className="text-sm text-neutral-500 dark:text-neutral-400">
          {date.label}
        </time>
        <h1 className="mt-2 text-3xl md:text-4xl font-bold leading-tight text-neutral-900 dark:text-white">{post.title}</h1>

        {post.coverImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.coverImage}
            alt=""
            className="mt-8 w-full rounded-lg border border-neutral-200 dark:border-neutral-800"
          />
        )}

        {post.content ? (
          <div
            className="news-content mt-8"
            // sanitize lại khi render (phòng khi content đến từ nguồn khác sau này)
            dangerouslySetInnerHTML={{ __html: sanitizePostHtml(post.content, post.sourceUrl ?? undefined) }}
          />
        ) : (
          post.excerpt && (
            <p className="mt-8 text-lg leading-relaxed text-neutral-700 dark:text-neutral-300">{post.excerpt}</p>
          )
        )}

        {post.source === "uit" && post.sourceUrl && (
          <div className="mt-10 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-5">
            <p className="text-sm text-neutral-600 dark:text-neutral-400">Nguồn: Trường Đại học Công nghệ Thông tin (UIT)</p>
            <a
              href={post.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-block font-medium text-neutral-900 dark:text-white underline underline-offset-4 hover:no-underline"
            >
              Xem bài gốc tại uit.edu.vn →
            </a>
          </div>
        )}
      </article>
    </main>
  );
}
