'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useThemeLanguage } from '@/context/theme-language-context';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Sun, Moon, ExternalLink } from 'lucide-react';
import { quickLinks } from '@/lib/data/quick-links';

export function Navbar() {
  const { language, setLanguage, theme, setTheme, t } = useThemeLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isQuickLinksOpen, setIsQuickLinksOpen] = useState(false);

  const navItems = [
    { label: t.nav.about, href: '#about' },
    { label: t.nav.research, href: '#research' },
    { label: t.nav.team, href: '#team' },
    { label: t.nav.projects, href: '#projects' },
    { label: t.nav.publications, href: '#publications' },
    { label: t.nav.facilities, href: '#facilities' },
    { label: t.nav.news, href: '#news' },
    { label: t.nav.contact, href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-neutral-950/80 border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left: Quick Links + Logo */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Quick Links Panel */}
            <Sheet open={isQuickLinksOpen} onOpenChange={setIsQuickLinksOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="rounded-full">
                  <Menu size={20} />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72">
                <SheetHeader>
                  <SheetTitle>{t.quickLinks.title}</SheetTitle>
                </SheetHeader>
                <div className="px-4 flex flex-col gap-1">
                  {quickLinks.map((link) => (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsQuickLinksOpen(false)}
                      className="flex items-center justify-between gap-2 px-3 py-3 rounded-lg text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white transition-colors"
                    >
                      {language === 'vi' ? link.labelVi : link.labelEn}
                      <ExternalLink size={14} className="flex-shrink-0 opacity-60" />
                    </a>
                  ))}
                </div>
              </SheetContent>
            </Sheet>

            <a href="#" className="flex items-center gap-2 text-2xl font-bold text-neutral-900 dark:text-white">
              <Image src="/logo.png" alt="TTLab" width={32} height={32} className="rounded-sm" />
              TTLab
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="px-3 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="rounded-full"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </Button>

            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === 'en' ? 'vi' : 'en')}
              className="text-sm font-semibold"
            >
              {language === 'en' ? 'VI' : 'EN'}
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden rounded-full">
                  <Menu size={20} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <div className="mt-8 flex flex-col gap-4">
                  {navItems.map((item) => (
                    <button
                      key={item.href}
                      onClick={() => handleNavClick(item.href)}
                      className="text-left px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
