'use client';

import Image from 'next/image';
import { useThemeLanguage } from '@/context/theme-language-context';
import { facilities } from '@/lib/data/facilities';
import { RainbowDivider } from '@/components/rainbow-divider';

export function Facilities() {
  const { t } = useThemeLanguage();

  return (
    <section id="facilities" className="py-20 px-4 bg-gray-50 dark:bg-slate-800">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t.facilities.title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">{t.facilities.description}</p>
        </div>

        <RainbowDivider />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {facilities.map((facility) => (
            <div key={facility.id} className="bg-white dark:bg-slate-900 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="relative w-full h-48 bg-gray-200">
                <Image
                  src={facility.image}
                  alt={facility.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {facility.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {facility.description}
                </p>
                <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold">
                  {facility.specs}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
