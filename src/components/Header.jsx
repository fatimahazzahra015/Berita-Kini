import { useState, useEffect } from 'react';
import logoBlue from '../assets/logo.png';
import logoWhite from '../assets/logo putih.png';

export default function Header({ activeTab, setActiveTab, categories }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`sticky top-0 z-50 transition-all duration-500 px-6 lg:px-20 py-5 ${
        isScrolled 
          ? 'bg-[#0090FF]'
          : 'bg-white'
      }`}
    >
      <div className="max-w-7l mx-auto flex items-center justify-between">
        {/* LOGO SECTION */}
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => {
            setActiveTab('Terbaru');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <img 
            src={isScrolled ? logoWhite : logoBlue} 
            alt="logo" 
            className="h-8 w-auto transition-opacity duration-300"
          />
          <span 
            className={`font-poppins text-[20px] font-semibold transition-colors duration-300 ${
              isScrolled ? 'text-white' : 'text-black'
            }`}
          >
            Berita Kini
          </span>
        </div>

        {/* CATEGORIES SECTION */}
        <div className="hidden lg:flex gap-8">
          {categories.map((item) => (
            <button 
              key={item} 
              onClick={() => setActiveTab(item)} 
              className={`font-inter text-[16px] font-medium transition-all duration-300 ${
                isScrolled
                  ? activeTab === item 
                    ? 'text-white' 
                    : 'text-blue-100 hover:text-white'
                  : activeTab === item 
                    ? 'text-[#0090FF]' 
                    : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}