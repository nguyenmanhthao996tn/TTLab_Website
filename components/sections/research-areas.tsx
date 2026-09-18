'use client';

import { useThemeLanguage } from '@/context/theme-language-context';
import { RainbowDivider } from '@/components/rainbow-divider';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

function ResearchAreaCard({ name, description, index }: { name: string; description: string; index: number }) {
  const ref = useScrollAnimation();

  const bgShades = [
    "bg-neutral-50 dark:bg-neutral-900",
    "bg-neutral-100 dark:bg-neutral-900",
    "bg-neutral-50 dark:bg-neutral-900",
    "bg-neutral-100 dark:bg-neutral-900",
    "bg-neutral-50 dark:bg-neutral-900",
    "bg-neutral-100 dark:bg-neutral-900",
  ];

  const borderAccents = [
    "border-l-4 border-neutral-900 dark:border-neutral-100",
    "border-l-4 border-neutral-700 dark:border-neutral-300",
    "border-l-4 border-neutral-500 dark:border-neutral-500",
    "border-l-4 border-neutral-900 dark:border-neutral-100",
    "border-l-4 border-neutral-700 dark:border-neutral-300",
    "border-l-4 border-neutral-500 dark:border-neutral-500",
  ];

  return (
    <div
      ref={ref}
      className={`opacity-0 translate-y-4 transition-all duration-500 ${bgShades[index % 6]} ${borderAccents[index % 6]} p-8 rounded-lg shadow-sm hover:shadow-md hover:scale-105 transform transition-all duration-300`}
    >
      <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">{name}</h3>
      <p className="text-neutral-700 dark:text-neutral-300">{description}</p>
    </div>
  );
}

export function ResearchAreas() {
  const { t } = useThemeLanguage();

  return (
    <section id="research" className="py-20 px-4 bg-neutral-100 dark:bg-neutral-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
            {t.research.title}
          </h2>
        </div>

        <RainbowDivider />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {t.research.areas.map((area, index) => (
            <ResearchAreaCard key={index} name={area.name} description={area.description} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

