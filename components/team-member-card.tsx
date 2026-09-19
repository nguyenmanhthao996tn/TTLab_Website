'use client';

import Image from 'next/image';
import { useThemeLanguage } from '@/context/theme-language-context';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

export function TeamMemberCard({
  nameVi,
  nameEn,
  titleEn,
  titleVi,
  roleEn,
  roleVi,
  affiliation,
  hIndex,
  image,
  scholarUrl,
}: {
  nameVi: string;
  nameEn: string;
  titleEn?: string;
  titleVi?: string;
  roleEn?: string;
  roleVi?: string;
  affiliation: string;
  hIndex?: number;
  image: string;
  scholarUrl?: string;
}) {
  const ref = useScrollAnimation();
  const { language } = useThemeLanguage();
  const name = language === 'vi' ? nameVi : nameEn;
  const title = language === 'vi' ? titleVi : titleEn;
  const role = language === 'vi' ? roleVi : roleEn;
  const prefix = title || role;

  const cardContent = (
    <div className="p-6 text-center">
      <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-1">
        {prefix ? `${prefix} ` : ''}
        {name}
      </h3>
      <p className="text-neutral-600 dark:text-neutral-400 font-semibold text-sm mb-1">
        {affiliation}
      </p>
      {hIndex !== undefined && (
        <p className="text-neutral-500 dark:text-neutral-500 text-xs">h-index: {hIndex}</p>
      )}
    </div>
  );

  return (
    <div
      ref={ref}
      className="opacity-0 translate-y-4 transition-all duration-500 bg-white dark:bg-neutral-900 rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex justify-center pt-6">
        <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-neutral-300 to-neutral-600 dark:from-neutral-600 dark:to-neutral-900 p-1 shadow-lg">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover rounded-full"
            sizes="128px"
          />
        </div>
      </div>
      {scholarUrl ? (
        <a
          href={scholarUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block hover:bg-neutral-50 dark:hover:bg-neutral-800/60 transition-colors"
          title={language === 'vi' ? 'Xem hồ sơ Google Scholar' : 'View Google Scholar profile'}
        >
          {cardContent}
        </a>
      ) : (
        cardContent
      )}
    </div>
  );
}
