import { Navbar } from '@/components/sections/navbar';
import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { ResearchAreas } from '@/components/sections/research-areas';
import { Team } from '@/components/sections/team';
// Tạm ẩn: Dự Án Nổi Bật, Cơ Sở & Thiết Bị — bỏ comment để hiện lại (cả navbar + footer)
// import { Projects } from '@/components/sections/projects';
import { Publications } from '@/components/sections/publications';
// import { Facilities } from '@/components/sections/facilities';
import { News } from '@/components/sections/news';
import { Contact } from '@/components/sections/contact';
import { Footer } from '@/components/sections/footer';
import { listPublishedNews, toNewsItem } from '@/lib/news';

// Section Tin tức đọc data/posts.json mỗi request — publish xong là thấy ngay
export const dynamic = 'force-dynamic';

export default async function Home() {
  const news = (await listPublishedNews(6)).map(toNewsItem);

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      <Navbar />
      <Hero />
      <About />
      <ResearchAreas />
      <Team />
      {/* <Projects /> */}
      <Publications />
      {/* <Facilities /> */}
      <News items={news} />
      <Contact />
      <Footer />
    </div>
  );
}
