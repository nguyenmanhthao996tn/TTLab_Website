'use client';

import Link from 'next/link';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import type { NewsItem } from '@/lib/news';

export function NewsCard({ item, noImageLabel }: { item: NewsItem; noImageLabel: string }) {
  const ref = useScrollAnimation();

  return (
    <div ref={ref} className="opacity-0 translate-y-4 transition-all duration-500">
      <Link
        href={`/news/${item.slug}`}
        className="group flex flex-col h-full bg-white dark:bg-neutral-900 rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-md transition-shadow"
      >
        <div className="aspect-video bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
          {item.coverImage ? (
            // <img> thường: ảnh từ uit.edu.vn, next.config không khai báo remotePatterns
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.coverImage}
              alt=""
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-sm text-neutral-400 dark:text-neutral-500">
              {noImageLabel}
            </div>
          )}
        </div>
        <div className="p-6 flex flex-col flex-1">
          <time dateTime={item.date.iso} className="text-xs text-neutral-500 dark:text-neutral-400">
            {item.date.label}
          </time>
          <h3 className="mt-2 text-lg font-bold text-neutral-900 dark:text-white line-clamp-2 group-hover:underline underline-offset-2">
            {item.title}
          </h3>
          {item.excerpt && (
            <p className="mt-2 text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed line-clamp-3">{item.excerpt}</p>
          )}
        </div>
      </Link>
    </div>
  );
}
