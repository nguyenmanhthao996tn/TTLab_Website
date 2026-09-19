'use client';

import { useState } from 'react';
import { useThemeLanguage } from '@/context/theme-language-context';
import { PublicationEntry } from '@/components/publication-entry';
import { publications } from '@/lib/data/publications';
import { RainbowDivider } from '@/components/rainbow-divider';
import { Button } from '@/components/ui/button';

const INITIAL_YEARS = 3;

export function Publications() {
  const { t, language } = useThemeLanguage();
  const [showAll, setShowAll] = useState(false);

  const years = Array.from(new Set(publications.map((p) => p.year))).sort((a, b) => b - a);
  const displayedYears = showAll ? years : years.slice(0, INITIAL_YEARS);

  return (
    <section id="publications" className="py-20 px-4 bg-white dark:bg-neutral-950">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
            {t.publications.title}
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400">{t.publications.description}</p>
        </div>

        <RainbowDivider />

        <div className="mt-12 space-y-12">
          {displayedYears.map((year) => (
            <div key={year}>
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6 flex items-center gap-4">
                {year}
                <span className="flex-1 h-px bg-neutral-200 dark:bg-neutral-800" />
              </h3>
              <div className="space-y-6">
                {publications
                  .filter((pub) => pub.year === year)
                  .map((pub) => (
                    <PublicationEntry
                      key={pub.id}
                      title={pub.title}
                      authors={pub.authors}
                      journal={pub.journal}
                      doi={pub.doi}
                      url={pub.url}
                      typeLabel={t.publications.types[pub.type as 'conference' | 'journal']}
                    />
                  ))}
              </div>
            </div>
          ))}
        </div>

        {years.length > INITIAL_YEARS && (
          <div className="flex justify-center mt-12">
            <Button onClick={() => setShowAll(!showAll)} variant="outline" className="px-8">
              {showAll
                ? language === 'vi'
                  ? 'Thu Gọn'
                  : 'Show Less'
                : language === 'vi'
                  ? `Xem Thêm (${publications.length - publications.filter((p) => displayedYears.includes(p.year)).length} bài báo)`
                  : `See More (${publications.length - publications.filter((p) => displayedYears.includes(p.year)).length} more papers)`}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
