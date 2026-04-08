'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';
import { translations } from '@/lib/translations';

type Language = 'en' | 'vi';
type Theme = 'light' | 'dark';

interface ThemeLanguageContextType {
  language: Language;
  theme: Theme;
  setLanguage: (lang: Language) => void;
  setTheme: (theme: Theme) => void;
  t: (typeof translations)[Language];
}

const ThemeLanguageContext = createContext<ThemeLanguageContextType | undefined>(undefined);

export function ThemeLanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [theme, setTheme] = useState<Theme>('light');

  const value: ThemeLanguageContextType = {
    language,
    theme,
    setLanguage,
    setTheme,
    t: translations[language],
  };

  return (
    <ThemeLanguageContext.Provider value={value}>
      <div className={theme}>{children}</div>
    </ThemeLanguageContext.Provider>
  );
}

export function useThemeLanguage() {
  const context = useContext(ThemeLanguageContext);
  if (context === undefined) {
    throw new Error('useThemeLanguage must be used within ThemeLanguageProvider');
  }
  return context;
}
