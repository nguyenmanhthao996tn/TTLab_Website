'use client';

import { useThemeLanguage } from '@/context/theme-language-context';
import { NewsCard } from '@/components/news-card';
import { news } from '@/lib/data/news';
import { RainbowDivider } from '@/components/rainbow-divider';

export function News() {
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {news.map((item) => (
            <NewsCard
              key={item.id}
              title={item.title}
              excerpt={item.excerpt}
              date={item.date}
              category={item.category}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
