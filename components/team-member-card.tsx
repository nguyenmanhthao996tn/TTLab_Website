'use client';

import Image from 'next/image';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

export function TeamMemberCard({
  name,
  role,
  bio,
  image,
}: {
  name: string;
  role: string;
  bio: string;
  image: string;
}) {
  const ref = useScrollAnimation();

  return (
    <div
      ref={ref}
      className="opacity-0 translate-y-4 transition-all duration-500 bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
    >
      <div className="flex justify-center pt-6">
        <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-purple-500 p-1 shadow-lg">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover rounded-full"
            sizes="128px"
          />
        </div>
      </div>
      <div className="p-6 text-center">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{name}</h3>
        <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm mb-3">{role}</p>
        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{bio}</p>
      </div>
    </div>
  );
}

