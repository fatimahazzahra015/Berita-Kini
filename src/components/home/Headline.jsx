import { useState } from 'react';
import kalender from '../../assets/kalender.png';

export function Headline({ news = [], onDetail }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const headlineItems = news.slice(0, 5);
  const totalHeadlines = headlineItems.length;

  if (totalHeadlines === 0) return null;

  const currentData = headlineItems[currentIndex];

  // Handlers
  const handlePrev = () => setCurrentIndex(prev => (prev === 0 ? totalHeadlines - 1 : prev - 1));
  const handleNext = () => setCurrentIndex(prev => (prev === totalHeadlines - 1 ? 0 : prev + 1));

  // Formatter Date
  const formattedDate = new Date(currentData.isoDate).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <section className="max-w-7l mx-auto px-6 lg:px-20 py-10 lg:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* LEFT COLUMN: Content */}
        <div className="space-y-4 order-2 lg:order-1">
          <p className="text-slate-500 text-m font-bold uppercase tracking-wider">Headline</p>
          
          <h1 
            onClick={() => onDetail(currentData)}
            className="font-nunito text-[32px] lg:text-[39px] font-black text-[#2D333F] leading-[1.15] cursor-pointer hover:text-[#0090FF] transition-colors"
          >
            {currentData.title}
          </h1>
          
          <p className="text-slate-500 text-base leading-relaxed line-clamp-3">
            {currentData.contentSnippet}
          </p>
          
          <div className="text-slate-400 text-sm font-medium flex items-center gap-2">
            <img src={kalender} alt="kalender" className="w-4 h-4 opacity-60" /> 
            {formattedDate}
          </div>
          
          <button 
            onClick={() => onDetail(currentData)}
            className="text-[#0090FF] font-extrabold text-[15px] flex items-center gap-1 group pt-2 transition-all hover:gap-2"
          >
            Baca Selengkapnya 
            <span className="text-xl group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
          </button>
        </div>

        {/* RIGHT COLUMN: Image */}
        <div className="order-1 lg:order-2">
          <div 
            onClick={() => onDetail(currentData)}
            className="rounded-[40px] overflow-hidden aspect-[18/10] shadow-sm bg-slate-100 cursor-pointer group"
          >
            <img 
              key={currentData.title}
              src={currentData.image?.large || currentData.image?.small} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              alt="headline" 
            />
          </div>
        </div>
      </div>

      {/* NAVIGATION CONTROLS */}
      <div className="flex justify-center items-center gap-6 mt-16 lg:mt-20">
        <NavButton icon="‹" onClick={handlePrev} />
        
        <div className="flex items-center gap-2 font-nunito text-sm font-bold select-none">
          <span className="text-slate-800">{currentIndex + 1}</span>
          <span className="text-slate-300 font-normal px-1">dari</span>
          <span className="text-slate-400">{totalHeadlines}</span>
        </div>

        <NavButton icon="›" onClick={handleNext} />
      </div>
    </section>
  );
}

// Sub-komponen kecil untuk tombol navigasi agar kode utama lebih ramping
const NavButton = ({ icon, onClick }) => (
  <button 
    onClick={onClick}
    className="text-slate-300 hover:text-[#0090FF] text-4xl transition-colors pb-1 leading-none h-10 w-10 flex items-center justify-center rounded-full hover:bg-blue-50"
  >
    {icon}
  </button>
);