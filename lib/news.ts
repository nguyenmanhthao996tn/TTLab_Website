import { repo, type Post } from "@/lib/posts-repo";

export function postDate(p: Post) {
  const d = new Date(p.publishedAt ?? p.createdAt);
  return {
    iso: d.toISOString(),
    label: d.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric", timeZone: "Asia/Ho_Chi_Minh" }),
  };
}

// Bài đã đăng, mới nhất trước (repo.list đã sắp theo ngày đăng)
export async function listPublishedNews(limit?: number) {
  const posts = await repo.list("published");
  return limit ? posts.slice(0, limit) : posts;
}

// Dữ liệu gọn, serializable để truyền xuống client component
export type NewsItem = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  coverImage: string | null;
  date: { iso: string; label: string };
};

export function toNewsItem(p: Post): NewsItem {
  return { id: p.id, slug: p.slug, title: p.title, excerpt: p.excerpt, coverImage: p.coverImage, date: postDate(p) };
}
