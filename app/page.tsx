import { Navbar } from '@/components/sections/navbar';
import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { ResearchAreas } from '@/components/sections/research-areas';
import { Team } from '@/components/sections/team';
import { Projects } from '@/components/sections/projects';
import { Publications } from '@/components/sections/publications';
import { Facilities } from '@/components/sections/facilities';
import { News } from '@/components/sections/news';
import { Contact } from '@/components/sections/contact';
import { Footer } from '@/components/sections/footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Navbar />
      <Hero />
      <About />
      <ResearchAreas />
      <Team />
      <Projects />
      <Publications />
      <Facilities />
      <News />
      <Contact />
      <Footer />
    </div>
  );
}
