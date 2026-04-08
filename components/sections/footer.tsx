'use client';

import { useThemeLanguage } from '@/context/theme-language-context';
import { RainbowDivider } from '@/components/rainbow-divider';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

export function Footer() {
  const { t } = useThemeLanguage();

  return (
    <footer className="bg-gray-900 dark:bg-black text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <RainbowDivider />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-8">
          {/* Logo Section */}
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4">
              TTLab
            </h3>
            <p className="text-gray-400 text-sm">
              Pioneering research in innovation and technology transfer.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#about" className="hover:text-blue-400 transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#research" className="hover:text-blue-400 transition-colors">
                  Research
                </a>
              </li>
              <li>
                <a href="#team" className="hover:text-blue-400 transition-colors">
                  Team
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-blue-400 transition-colors">
                  Projects
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold text-white mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#publications" className="hover:text-blue-400 transition-colors">
                  Publications
                </a>
              </li>
              <li>
                <a href="#news" className="hover:text-blue-400 transition-colors">
                  News
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-blue-400 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-bold text-white mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
              >
                <Github size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>&copy; {t.footer.copyright}</p>
            <div className="flex gap-6">
              {t.footer.links.map((link, index) => (
                <a key={index} href="#" className="hover:text-blue-400 transition-colors">
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
