import * as cheerio from "cheerio";
import { sanitizePostHtml } from "@/lib/sanitize-post";

const MAX_BYTES = 2_000_000;
const MAX_REDIRECTS = 3;
const TIMEOUT_MS = 8000;

export type UitMeta = {
  sourceUrl: string;
  title: string;
  excerpt: string | null;
  content: string | null; // HTML toàn văn đã sanitize, null nếu không trích được
  coverImage: string | null;
  publishedAt: string | null; // ISO — ngày UIT đăng bài
};

type UitArticle = { body: string | null; createdAt: string | null };

// uit.edu.vn là app Next.js: toàn văn bài KHÔNG có trong HTML render sẵn mà nằm trong
// payload RSC (self.__next_f.push). Bài viết là object {slug, createdAt, body: "$<id>"},
// trong đó "$<id>" trỏ tới text row "<id>:T<độ dài byte hex>,<html>".
function extractUitArticle($: cheerio.CheerioAPI, slug: string): UitArticle | null {
  let flight = "";
  $("script").each((_, el) => {
    const m = $(el).text().match(/^self\.__next_f\.push\(\[1,("(?:[^"\\]|\\.)*")\]\)$/);
    if (m) {
      try {
        flight += JSON.parse(m[1]);
      } catch {}
    }
  });
  if (!flight) return null;

  const find = (node: unknown): Record<string, unknown> | null => {
    if (!node || typeof node !== "object") return null;
    const o = node as Record<string, unknown>;
    if (o.slug === slug && typeof o.body === "string") return o;
    for (const v of Object.values(o)) {
      const hit = find(v);
      if (hit) return hit;
    }
    return null;
  };

  // Tìm row JSON chứa đúng slug của bài (trang còn có các tin liên quan với slug khác)
  let article: Record<string, unknown> | null = null;
  const needle = `"slug":${JSON.stringify(slug)}`;
  for (let pos = flight.indexOf(needle); pos >= 0 && !article; pos = flight.indexOf(needle, pos + 1)) {
    const start = flight.lastIndexOf("\n", pos) + 1;
    const end = flight.indexOf("\n", pos);
    const line = flight.slice(start, end < 0 ? undefined : end);
    for (const m of line.matchAll(/([0-9a-f]+):(?=[[{])/g)) {
      try {
        article = find(JSON.parse(line.slice(m.index + m[0].length)));
        break;
      } catch {}
    }
  }
  if (!article) return null;

  let body = article.body as string;
  const ref = body.match(/^\$([0-9a-f]+)$/);
  if (ref) {
    const row = new RegExp(`(?:^|\\n)${ref[1]}:T([0-9a-f]+),`).exec(flight);
    body = row
      ? Buffer.from(flight.slice(row.index + row[0].length)).subarray(0, parseInt(row[1], 16)).toString("utf-8")
      : "";
  } else if (body.startsWith("$$")) {
    body = body.slice(1); // RSC escape cho chuỗi bắt đầu bằng "$"
  }

  return {
    body: body || null,
    createdAt: typeof article.createdAt === "string" ? article.createdAt : null,
  };
}

function toIso(raw: string | null | undefined) {
  const d = raw ? new Date(raw) : null;
  return d && !isNaN(d.getTime()) ? d.toISOString() : null;
}

function assertAllowed(raw: string): URL {
  const u = new URL(raw); // throw nếu URL sai
  const h = u.hostname.toLowerCase();
  const ok = h === "uit.edu.vn" || h.endsWith(".uit.edu.vn");
  if (u.protocol !== "https:" || !ok) {
    throw new Error("URL không thuộc uit.edu.vn (chỉ chấp nhận https)");
  }
  return u;
}

async function readLimited(res: Response): Promise<string> {
  const reader = res.body?.getReader();
  if (!reader) return "";
  const chunks: Uint8Array[] = [];
  let total = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > MAX_BYTES) {
      await reader.cancel();
      throw new Error("Trang quá lớn");
    }
    chunks.push(value);
  }
  return Buffer.concat(chunks).toString("utf-8");
}

async function safeGet(startUrl: string): Promise<{ html: string; finalUrl: string }> {
  let url = assertAllowed(startUrl);
  for (let i = 0; i <= MAX_REDIRECTS; i++) {
    const res = await fetch(url, {
      redirect: "manual", // tự kiểm tra từng bước redirect
      signal: AbortSignal.timeout(TIMEOUT_MS),
      headers: { "user-agent": "TTLabBot/1.0 (+https://ttlab.uit.edu.vn)" },
    });
    if (res.status >= 300 && res.status < 400) {
      const loc = res.headers.get("location");
      if (!loc) throw new Error("Redirect không có location");
      url = assertAllowed(new URL(loc, url).toString());
      continue;
    }
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return { html: await readLimited(res), finalUrl: url.toString() };
  }
  throw new Error("Quá nhiều redirect");
}

export async function fetchUitMeta(inputUrl: string): Promise<UitMeta> {
  const { html, finalUrl } = await safeGet(inputUrl);
  const $ = cheerio.load(html);
  const meta = (p: string) =>
    $(`meta[property="${p}"]`).attr("content")?.trim() ||
    $(`meta[name="${p}"]`).attr("content")?.trim() ||
    null;

  const title = meta("og:title") || $("title").first().text().trim();
  if (!title) throw new Error("Không tìm thấy tiêu đề");

  // og:url / og:image được render thành href/src — chỉ nhận URL hợp lệ
  const resolve = (raw: string | null) => {
    try {
      return raw ? new URL(raw, finalUrl) : null;
    } catch {
      return null;
    }
  };
  const ogUrl = resolve(meta("og:url"));
  let sourceUrl = finalUrl;
  if (ogUrl) {
    try {
      sourceUrl = assertAllowed(ogUrl.toString()).toString();
    } catch {
      // og:url trỏ ra ngoài uit.edu.vn → dùng URL thực tế đã fetch
    }
  }
  const img = resolve(meta("og:image"));

  // Toàn văn + ngày đăng: chỉ áp dụng cho URL dạng /bai-viet/<slug>
  let slug = "";
  try {
    slug = decodeURIComponent(new URL(sourceUrl).pathname.match(/^\/bai-viet\/([^/]+)\/?$/)?.[1] ?? "");
  } catch {}
  const article = slug ? extractUitArticle($, slug) : null;
  const content = article?.body ? sanitizePostHtml(article.body, finalUrl) : "";

  return {
    sourceUrl,
    title,
    excerpt: meta("og:description") || meta("description"),
    content: content.trim() || null,
    coverImage: img && /^https?:$/.test(img.protocol) ? img.toString() : null,
    // Ngày hiển thị trên uit.edu.vn là createdAt; publishedAt của họ là ngày migrate dữ liệu
    publishedAt: toIso(article?.createdAt) ?? toIso(meta("article:published_time")),
  };
}
