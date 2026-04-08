'use client';

import { useThemeLanguage } from '@/context/theme-language-context';
import { ProjectCard } from '@/components/project-card';
import { projects } from '@/lib/data/projects';
import { RainbowDivider } from '@/components/rainbow-divider';

export function Projects() {
  const { t } = useThemeLanguage();

  return (
    <section id="projects" className="py-20 px-4 bg-gray-50 dark:bg-slate-800">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t.projects.title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">{t.projects.description}</p>
        </div>

        <RainbowDivider />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              status={project.status}
              year={project.year}
              image={project.image}
              tags={project.tags}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
