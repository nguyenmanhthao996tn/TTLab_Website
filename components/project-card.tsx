'use client';

import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

export function ProjectCard({
  title,
  description,
  status,
  year,
  image,
  tags,
}: {
  title: string;
  description: string;
  status: string;
  year: number;
  image: string;
  tags: string[];
}) {
  const ref = useScrollAnimation();

  const statusColor =
    status === 'Ongoing'
      ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
      : status === 'Completed'
        ? 'bg-neutral-200 text-neutral-900 dark:bg-neutral-700 dark:text-neutral-100'
        : 'border border-neutral-400 text-neutral-700 dark:border-neutral-500 dark:text-neutral-300 bg-transparent';

  return (
    <div
      ref={ref}
      className="opacity-0 translate-y-4 transition-all duration-500 bg-white dark:bg-neutral-900 rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="relative w-full h-48 bg-neutral-200 dark:bg-neutral-800">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-bold text-neutral-900 dark:text-white flex-1">{title}</h3>
          <Badge className={statusColor}>{status}</Badge>
        </div>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-3">{description}</p>
        <p className="text-xs text-neutral-500 dark:text-neutral-500 mb-4">Year: {year}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}

