import sanitizeHtml from "sanitize-html";

// Whitelist cho HTML bài viết lấy từ nguồn ngoài (uit.edu.vn) — bỏ toàn bộ style/class/script,
// chỉ giữ cấu trúc nội dung. baseUrl dùng để chuyển link/ảnh tương đối thành tuyệt đối.
export function sanitizePostHtml(html: string, baseUrl?: string): string {
  const abs = (raw: string | undefined) => {
    if (!raw) return undefined;
    try {
      const u = new URL(raw, baseUrl);
      return /^https?:$/.test(u.protocol) || u.protocol === "mailto:" ? u.toString() : undefined;
    } catch {
      return undefined;
    }
  };

  return sanitizeHtml(html, {
    allowedTags: [
      "p", "div", "br", "hr", "strong", "b", "em", "i", "u", "s", "sub", "sup", "span",
      "a", "ul", "ol", "li", "blockquote", "h2", "h3", "h4", "h5", "h6",
      "img", "figure", "figcaption",
      "table", "thead", "tbody", "tfoot", "tr", "th", "td", "caption",
    ],
    allowedAttributes: {
      // target/rel/loading do transformTags gắn vào (attribute được lọc sau transform)
      a: ["href", "target", "rel"],
      img: ["src", "alt", "loading"],
      td: ["colspan", "rowspan"],
      th: ["colspan", "rowspan"],
    },
    allowedSchemes: ["http", "https", "mailto"],
    allowProtocolRelative: false,
    transformTags: {
      h1: "h2", // tiêu đề trang đã là h1
      a: (tagName, attribs) => ({
        tagName,
        attribs: { href: abs(attribs.href) ?? "#", target: "_blank", rel: "noopener noreferrer nofollow" },
      }),
      img: (tagName, attribs) => ({
        tagName,
        attribs: { src: abs(attribs.src) ?? "", alt: attribs.alt ?? "", loading: "lazy" },
      }),
    },
    exclusiveFilter: (frame) =>
      // bỏ ảnh không có src hợp lệ và đoạn rỗng (&nbsp;) mà trang UIT chèn rất nhiều
      (frame.tag === "img" && !frame.attribs.src) ||
      (frame.tag === "p" && !frame.mediaChildren.length && !frame.text.replace(/&nbsp;|\u00a0/g, "").trim()),
  });
}
