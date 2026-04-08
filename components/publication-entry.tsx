'use client';

import { Badge } from '@/components/ui/badge';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

export function PublicationEntry({
  title,
  authors,
  journal,
  year,
  doi,
}: {
  title: string;
  authors: string;
  journal: string;
  year: number;
  doi: string;
}) {
  const ref = useScrollAnimation();

  return (
    <div
      ref={ref}
      className="opacity-0 translate-y-4 transition-all duration-500 border-l-4 border-blue-500 pl-6 py-4 bg-white dark:bg-slate-900 rounded-r-lg shadow-sm hover:shadow-md transition-shadow"
    >
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
        <span className="font-semibold">Authors:</span> {authors}
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
        <span className="font-semibold">{journal}</span> ({year})
      </p>
      <div className="flex flex-wrap gap-2 items-center">
        <Badge variant="outline" className="text-xs">
          DOI: {doi}
        </Badge>
      </div>
    </div>
  );
}

