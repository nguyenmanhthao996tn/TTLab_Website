'use client';

import { useThemeLanguage } from '@/context/theme-language-context';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

export function Hero() {
  const { t } = useThemeLanguage();

  const handleScroll = () => {
    const element = document.querySelector('#about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-200 dark:from-neutral-950 dark:to-neutral-900 flex items-center justify-center px-4 py-12">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold bg-gradient-to-r from-neutral-900 to-neutral-500 dark:from-white dark:to-neutral-400 bg-clip-text text-transparent mb-6 leading-tight">
          {t.hero.title}
        </h1>
        <p className="text-xl sm:text-2xl font-semibold text-neutral-700 dark:text-neutral-300 mb-4">
          {t.hero.subtitle}
        </p>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto mb-8">
          {t.hero.description}
        </p>
        <Button size="lg" className="mb-12" onClick={handleScroll}>
          {t.hero.cta}
        </Button>
        <div className="animate-bounce">
          <ArrowDown className="mx-auto text-neutral-700 dark:text-neutral-300" size={32} />
        </div>
      </div>
    </section>
  );
}
