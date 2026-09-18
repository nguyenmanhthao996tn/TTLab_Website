'use client';

import { useThemeLanguage } from '@/context/theme-language-context';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { RainbowDivider } from '@/components/rainbow-divider';

export function Contact() {
  const { t } = useThemeLanguage();

  return (
    <section id="contact" className="py-20 px-4 bg-neutral-100 dark:bg-neutral-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
            {t.contact.title}
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400">{t.contact.description}</p>
        </div>

        <RainbowDivider />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <Mail className="text-neutral-700 dark:text-neutral-300 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-bold text-neutral-900 dark:text-white mb-1">{t.contact.labels.email}</h3>
                <a
                  href={`mailto:${t.contact.email}`}
                  className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                >
                  {t.contact.email}
                </a>
              </div>
            </div>

            {t.contact.phone && (
              <div className="flex gap-4 items-start">
                <Phone className="text-neutral-700 dark:text-neutral-300 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-bold text-neutral-900 dark:text-white mb-1">{t.contact.labels.phone}</h3>
                  <p className="text-neutral-600 dark:text-neutral-400">{t.contact.phone}</p>
                </div>
              </div>
            )}

            <div className="flex gap-4 items-start">
              <MapPin className="text-neutral-700 dark:text-neutral-300 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-bold text-neutral-900 dark:text-white mb-1">{t.contact.labels.address}</h3>
                <p className="text-neutral-600 dark:text-neutral-400">{t.contact.address}</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <Clock className="text-neutral-700 dark:text-neutral-300 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-bold text-neutral-900 dark:text-white mb-1">{t.contact.labels.office}</h3>
                <p className="text-neutral-600 dark:text-neutral-400">{t.contact.office}</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-neutral-950 p-8 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-800">
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  {t.contact.form.name}
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:ring-2 focus:ring-neutral-500 focus:border-transparent"
                  placeholder={t.contact.form.namePlaceholder}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  {t.contact.form.email}
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:ring-2 focus:ring-neutral-500 focus:border-transparent"
                  placeholder={t.contact.form.emailPlaceholder}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  {t.contact.form.message}
                </label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:ring-2 focus:ring-neutral-500 focus:border-transparent resize-none"
                  placeholder={t.contact.form.messagePlaceholder}
                />
              </div>

              <Button className="w-full">{t.contact.form.send}</Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
