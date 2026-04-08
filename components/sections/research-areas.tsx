'use client';

import { useThemeLanguage } from '@/context/theme-language-context';
import { RainbowDivider } from '@/components/rainbow-divider';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

function ResearchAreaCard({ name, description, index }: { name: string; description: string; index: number }) {
  const ref = useScrollAnimation();

  const bgGradients = [
    "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800",
    "bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800",
    "bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800",
    "bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900 dark:to-pink-800",
    "bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900 dark:to-orange-800",
    "bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-cyan-900 dark:to-cyan-800",
  ];

  const borderAccents = [
    "border-l-4 border-blue-500",
    "border-l-4 border-purple-500",
    "border-l-4 border-green-500",
    "border-l-4 border-pink-500",
    "border-l-4 border-orange-500",
    "border-l-4 border-cyan-500",
  ];

  return (
    <div
      ref={ref}
      className={`opacity-0 translate-y-4 transition-all duration-500 ${bgGradients[index % 6]} ${borderAccents[index % 6]} p-8 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300`}
    >
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{name}</h3>
      <p className="text-gray-700 dark:text-gray-300">{description}</p>
    </div>
  );
}

export function ResearchAreas() {
  const { t } = useThemeLanguage();

  return (
    <section id="research" className="py-20 px-4 bg-gray-50 dark:bg-slate-800">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
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

