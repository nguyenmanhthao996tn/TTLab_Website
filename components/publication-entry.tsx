'use client';

import { Badge } from '@/components/ui/badge';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

export function PublicationEntry({
  title,
  authors,
  journal,
  doi,
  url,
  typeLabel,
}: {
  title: string;
  authors: string;
  journal: string;
  doi: string;
  url?: string;
  typeLabel?: string;
}) {
  const ref = useScrollAnimation();

  return (
    <div
      ref={ref}
      className="opacity-0 translate-y-4 transition-all duration-500 border-l-4 border-neutral-900 dark:border-neutral-300 pl-6 py-4 bg-white dark:bg-neutral-900 rounded-r-lg shadow-sm hover:shadow-md transition-shadow"
    >
      {url && url !== '#' ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg font-bold text-neutral-900 dark:text-white mb-2 block hover:underline underline-offset-2"
        >
          {title}
        </a>
      ) : (
        <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">{title}</h3>
      )}
      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
        <span className="font-semibold">Authors:</span> {authors}
      </p>
      {journal && (
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
          <span className="font-semibold">{journal}</span>
        </p>
      )}
      <div className="flex flex-wrap gap-2 items-center">
        {typeLabel && (
          <Badge className="text-xs bg-neutral-200 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800">
            {typeLabel}
          </Badge>
        )}
        {doi &&
          (url && url !== '#' ? (
            <a href={url} target="_blank" rel="noopener noreferrer">
              <Badge
                variant="outline"
                className="text-xs hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-neutral-900 transition-colors cursor-pointer"
              >
                DOI: {doi}
              </Badge>
            </a>
          ) : (
            <Badge variant="outline" className="text-xs">
              DOI: {doi}
            </Badge>
          ))}
      </div>
    </div>
  );
}

