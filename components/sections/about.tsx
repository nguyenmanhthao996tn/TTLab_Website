'use client';

import { useThemeLanguage } from '@/context/theme-language-context';
import { StatBadge } from '@/components/stat-badge';
import { RainbowDivider } from '@/components/rainbow-divider';

export function About() {
  const { t } = useThemeLanguage();

  return (
    <section id="about" className="py-20 px-4 bg-white dark:bg-slate-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {t.about.title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {t.about.content}
          </p>
        </div>

        <RainbowDivider />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {t.about.stats.map((stat, index) => (
            <StatBadge key={index} value={stat.value} label={stat.label} />
          ))}
        </div>
      </div>
    </section>
  );
}
