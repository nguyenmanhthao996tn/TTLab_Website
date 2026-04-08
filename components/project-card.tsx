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
      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      : status === 'Completed'
        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';

  return (
    <div
      ref={ref}
      className="opacity-0 translate-y-4 transition-all duration-500 bg-white dark:bg-slate-900 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
    >
      <div className="relative w-full h-48 bg-gray-200">
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
          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex-1">{title}</h3>
          <Badge className={statusColor}>{status}</Badge>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{description}</p>
        <p className="text-xs text-gray-500 dark:text-gray-500 mb-4">Year: {year}</p>
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

