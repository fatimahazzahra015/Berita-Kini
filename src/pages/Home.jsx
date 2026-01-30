// src/pages/Home.jsx
import { Headline } from '../components/home/Headline';
import { PopularNews } from '../components/home/PopularNews';
import { Recommendation } from '../components/home/Recommendation';
import { PromoBanner } from '../components/home/PromoBanner';

export default function Home({ news, onDetail }) {
  if (!news || news.length === 0) return null;

  return (
    <div className="animate-in fade-in duration-700">
      <Headline news={news} onDetail={onDetail} />
      <PopularNews news={news} onDetail={onDetail} />
      <Recommendation news={news} onDetail={onDetail} />
      <PromoBanner />
    </div>
  );
}