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
    <section id="hero" className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center px-4 py-12">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-6 leading-tight">
          {t.hero.title}
        </h1>
        <p className="text-xl sm:text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
          {t.hero.subtitle}
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
          {t.hero.description}
        </p>
        <Button
          size="lg"
          className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white mb-12"
          onClick={handleScroll}
        >
          {t.hero.cta}
        </Button>
        <div className="animate-bounce">
          <ArrowDown className="mx-auto text-blue-600 dark:text-blue-400" size={32} />
        </div>
      </div>
    </section>
  );
}
