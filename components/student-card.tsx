'use client';

import Image from 'next/image';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

export function StudentCard({
  name,
  role,
  bio,
  image,
  joinDate,
  leaveDate,
}: {
  name: string;
  role: string;
  bio: string;
  image: string;
  joinDate: string;
  leaveDate?: string;
}) {
  const ref = useScrollAnimation();

  return (
    <div
      ref={ref}
      className="opacity-0 translate-y-4 transition-all duration-500 bg-white dark:bg-neutral-900 rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex gap-4 p-4">
        <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-neutral-300 to-neutral-600 dark:from-neutral-600 dark:to-neutral-900 p-1 shadow-lg flex-shrink-0">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover rounded-full"
            sizes="80px"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-base font-bold text-neutral-900 dark:text-white">{name}</h3>
          <p className="text-neutral-600 dark:text-neutral-400 font-semibold text-xs mb-2">{role}</p>
          <p className="text-neutral-600 dark:text-neutral-400 text-xs leading-relaxed mb-2">{bio}</p>

          {/* Timeline */}
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-neutral-200 dark:border-neutral-700">
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">{joinDate}</span>
                {leaveDate && (
                  <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">{leaveDate}</span>
                )}
              </div>
              <div className="h-1.5 bg-gradient-to-r from-neutral-400 to-neutral-700 dark:from-neutral-600 dark:to-neutral-300 rounded-full"></div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                {leaveDate ? `${parseInt(leaveDate) - parseInt(joinDate)} years` : 'Current'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
