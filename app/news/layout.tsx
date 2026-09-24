import Link from "next/link";
import Image from "next/image";
import { Footer } from "@/components/sections/footer";

export default function NewsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-neutral-950">
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-neutral-950/80 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-neutral-900 dark:text-white">
            <Image src="/logo.png" alt="TTLab" width={32} height={32} className="rounded-sm" />
            TTLab
          </Link>
          <Link href="/news" className="text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white">
            Tin tức
          </Link>
        </div>
      </nav>
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}
