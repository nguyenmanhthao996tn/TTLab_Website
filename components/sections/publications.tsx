'use client';

import { useState } from 'react';
import { useThemeLanguage } from '@/context/theme-language-context';
import { PublicationEntry } from '@/components/publication-entry';
import { publications } from '@/lib/data/publications';
import { RainbowDivider } from '@/components/rainbow-divider';
import { Button } from '@/components/ui/button';

export function Publications() {
  const { t } = useThemeLanguage();
  const [showAll, setShowAll] = useState(false);
  const displayedPublications = showAll ? publications : publications.slice(0, 3);

  return (
    <section id="publications" className="py-20 px-4 bg-white dark:bg-slate-900">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t.publications.title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">{t.publications.description}</p>
        </div>

        <RainbowDivider />

        <div className="space-y-6 mt-12">
          {displayedPublications.map((pub) => (
            <PublicationEntry
              key={pub.id}
              title={pub.title}
              authors={pub.authors}
              journal={pub.journal}
              year={pub.year}
              doi={pub.doi}
            />
          ))}
        </div>

        {publications.length > 3 && (
          <div className="flex justify-center mt-12">
            <Button
              onClick={() => setShowAll(!showAll)}
              variant="outline"
              className="px-8"
            >
              {showAll ? 'Show Less' : 'See More Publications'}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

