'use client';

import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

export function NewsCard({
  title,
  excerpt,
  date,
  category,
  image,
}: {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
}) {
  const ref = useScrollAnimation();

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

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
          <Badge>{category}</Badge>
          <span className="text-xs text-neutral-500 dark:text-neutral-400">{formatDate(date)}</span>
        </div>
        <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">{title}</h3>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">{excerpt}</p>
      </div>
    </div>
  );
}

