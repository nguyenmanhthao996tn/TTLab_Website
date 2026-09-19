'use client';

import { useThemeLanguage } from '@/context/theme-language-context';
import { TeamMemberCard } from '@/components/team-member-card';
import { teamMembers } from '@/lib/data/team';
import { RainbowDivider } from '@/components/rainbow-divider';

export function Team() {
  const { t } = useThemeLanguage();

  const topRow = teamMembers.slice(0, 3);
  const bottomRow = teamMembers.slice(3);

  return (
    <section id="team" className="py-20 px-4 bg-white dark:bg-neutral-950">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
            {t.team.title}
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400">{t.team.description}</p>
        </div>

        <RainbowDivider />

        <div className="mt-16 flex flex-col items-center gap-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-4xl">
            {topRow.map((member) => (
              <TeamMemberCard
                key={member.id}
                nameVi={member.nameVi}
                nameEn={member.nameEn}
                titleEn={member.titleEn}
                titleVi={member.titleVi}
                roleEn={member.roleEn}
                roleVi={member.roleVi}
                affiliation={member.affiliation}
                hIndex={member.hIndex}
                image={member.image}
                scholarUrl={member.scholarUrl}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-2xl">
            {bottomRow.map((member) => (
              <TeamMemberCard
                key={member.id}
                nameVi={member.nameVi}
                nameEn={member.nameEn}
                titleEn={member.titleEn}
                titleVi={member.titleVi}
                roleEn={member.roleEn}
                roleVi={member.roleVi}
                affiliation={member.affiliation}
                hIndex={member.hIndex}
                image={member.image}
                scholarUrl={member.scholarUrl}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
