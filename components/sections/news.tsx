'use client';

import Link from 'next/link';
import { useThemeLanguage } from '@/context/theme-language-context';
import { NewsCard } from '@/components/news-card';
import { RainbowDivider } from '@/components/rainbow-divider';
import type { NewsItem } from '@/lib/news';

export function News({ items }: { items: NewsItem[] }) {
  const { t } = useThemeLanguage();

  return (
    <section id="news" className="py-20 px-4 bg-white dark:bg-slate-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t.news.title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">{t.news.description}</p>
        </div>

        <RainbowDivider />

        {items.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 mt-12">{t.news.empty}</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {items.map((item) => (
                <NewsCard key={item.id} item={item} noImageLabel={t.news.noImage} />
              ))}
            </div>
            <div className="text-center mt-10">
              <Link
                href="/news"
                className="inline-block rounded-md border border-neutral-300 dark:border-neutral-700 px-5 py-2.5 text-sm font-medium text-neutral-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                {t.news.viewAll} →
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
