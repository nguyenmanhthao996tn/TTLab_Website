import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";

export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  coverImage: string | null;
  source: "uit" | "internal";
  sourceUrl: string | null;
  status: "draft" | "published";
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

type NewPost = Omit<Post, "id" | "slug" | "createdAt" | "updatedAt">;

const FILE = path.join(process.cwd(), "data", "posts.json");

async function readAll(): Promise<Post[]> {
  try {
    return JSON.parse(await fs.readFile(FILE, "utf-8"));
  } catch {
    return [];
  }
}

async function writeAll(posts: Post[]) {
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  const tmp = FILE + ".tmp";
  await fs.writeFile(tmp, JSON.stringify(posts, null, 2));
  await fs.rename(tmp, FILE);
}

function slugify(s: string) {
  return s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

export const repo = {
  async list(status?: Post["status"]) {
    const all = await readAll();
    return all
      .filter((p) => !status || p.status === status)
      // mới nhất trước theo ngày đăng (bài UIT: ngày UIT đăng), chưa có thì theo ngày tạo
      .sort((a, b) => (b.publishedAt ?? b.createdAt).localeCompare(a.publishedAt ?? a.createdAt));
  },

  async findBySourceUrl(url: string) {
    return (await readAll()).find((p) => p.sourceUrl === url) ?? null;
  },

  async findById(id: string) {
    return (await readAll()).find((p) => p.id === id) ?? null;
  },

  async findBySlug(slug: string) {
    return (await readAll()).find((p) => p.slug === slug) ?? null;
  },

  async create(input: NewPost) {
    const all = await readAll();
    const id = randomUUID();
    const now = new Date().toISOString();
    const post: Post = {
      ...input,
      id,
      slug: `${slugify(input.title) || "post"}-${id.slice(0, 6)}`,
      createdAt: now,
      updatedAt: now,
    };
    await writeAll([post, ...all]);
    return post;
  },

  async update(id: string, patch: Partial<Omit<Post, "id" | "slug" | "createdAt" | "updatedAt">>) {
    const all = await readAll();
    const p = all.find((x) => x.id === id);
    if (!p) return null;
    Object.assign(p, patch, { updatedAt: new Date().toISOString() });
    await writeAll(all);
    return p;
  },

  async setStatus(id: string, status: Post["status"]) {
    const all = await readAll();
    const p = all.find((x) => x.id === id);
    if (!p) return null;
    p.status = status;
    p.updatedAt = new Date().toISOString();
    if (status === "published" && !p.publishedAt) p.publishedAt = p.updatedAt;
    await writeAll(all);
    return p;
  },
};
