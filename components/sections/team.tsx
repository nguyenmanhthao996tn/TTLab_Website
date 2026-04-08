'use client';

import { useThemeLanguage } from '@/context/theme-language-context';
import { TeamMemberCard } from '@/components/team-member-card';
import { StudentTimeline } from '@/components/student-timeline';
import { teamMembers } from '@/lib/data/team';
import { RainbowDivider } from '@/components/rainbow-divider';

export function Team() {
  const { t } = useThemeLanguage();

  const longTermMembers = teamMembers.filter((m) => m.type === 'long-term');
  const students = teamMembers.filter((m) => m.type === 'student');

  return (
    <section id="team" className="py-20 px-4 bg-white dark:bg-slate-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t.team.title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">{t.team.description}</p>
        </div>

        <RainbowDivider />

        {/* Long-term Members Section */}
        <div className="mt-16 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {longTermMembers.map((member) => (
              <TeamMemberCard
                key={member.id}
                name={member.name}
                role={member.role}
                bio={member.bio}
                image={member.image}
              />
            ))}
          </div>
        </div>

        <RainbowDivider />

        {/* Students Timeline Section */}
        <div className="mt-16">
          <StudentTimeline students={students} />
        </div>
      </div>
    </section>
  );
}
