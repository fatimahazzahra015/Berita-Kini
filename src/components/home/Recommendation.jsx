import { useState } from 'react';
import cari from '../../assets/cari.png';

const getCategory = (link) => {
  if (!link) return "Nasional";
  return link.split('/')[3] || "Nasional";
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('id-ID', { 
    day: 'numeric', 
    month: 'short', 
    year: 'numeric' 
  });
};

export function Recommendation({ news = [], onDetail }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8;

  // Filtering
  const filteredNews = news.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination & Offset
  const offset = searchTerm === '' ? 3 : 0;
  const availableNews = filteredNews.slice(offset);
  const totalFiltered = availableNews.length;
  const totalPages = Math.ceil(totalFiltered / postsPerPage);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = availableNews.slice(indexOfFirstPost, indexOfLastPost);

  //Handlers
  const handlePaginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    const section = document.getElementById('recommendation-section');
    if (section) {
      window.scrollTo({ top: section.offsetTop - 80, behavior: 'smooth' });
    }
  };

  const pageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
        pages.push(i);
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        pages.push('...');
      }
    }
    return [...new Set(pages)];
  };

  return (
    <section id="recommendation-section" className="max-w-7l mx-auto px-6 lg:px-20 py-12">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div className="flex items-center gap-3">
          <div className="w-[5px] h-10 bg-[#0090FF]"></div>
          <h2 className="text-[26px] font-nunito font-black text-[#2D333F]">
            Rekomendasi Untuk Anda
          </h2>
        </div>
        
        <div className="relative w-full md:w-[350px]">
          <input 
            type="text" 
            placeholder="Cari disini..." 
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-5 pr-12 py-3 bg-white border border-slate-200 rounded-xl font-nunito text-sm focus:outline-none focus:border-[#0090FF] transition-colors" 
          />
          <img src={cari} alt="search" className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" />
        </div>
      </div>

      {/* Content Grid */}
      {currentPosts.length === 0 ? (
        <EmptyState searchTerm={searchTerm} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 min-h-[500px]">
          {currentPosts.map((item, idx) => (
            <NewsCard key={idx} item={item} onDetail={onDetail} />
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          totalFiltered={totalFiltered}
          indexOfFirstPost={indexOfFirstPost}
          indexOfLastPost={indexOfLastPost}
          handlePaginate={handlePaginate}
          pageNumbers={pageNumbers()}
        />
      )}
    </section>
  );
}

const NewsCard = ({ item, onDetail }) => (
  <div onClick={() => onDetail(item)} className="flex flex-col gap-4 group cursor-pointer animate-in fade-in duration-500">
    <div className="aspect-[16/10] rounded-[24px] overflow-hidden shadow-sm bg-slate-100">
      <img 
        src={item.image?.small || item.image?.large} 
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
        alt="news" 
      />
    </div>
    <div className="space-y-3">
      <h3 className="font-nunito font-bold text-[15px] leading-snug text-[#2D333F] group-hover:text-[#0090FF] line-clamp-2">
        {item.title}
      </h3>
      <div className="flex items-center gap-2 font-nunito text-[11px] font-bold">
        <span className="text-[#0090FF] uppercase">{getCategory(item.link)}</span>
        <span className="text-slate-300">•</span>
        <span className="text-slate-400 font-medium">{formatDate(item.isoDate)}</span>
      </div>
    </div>
  </div>
);

const EmptyState = ({ searchTerm }) => (
  <div className="py-20 text-center">
    <p className="text-slate-400 font-nunito">
      Tidak ada berita ditemukan dengan kata kunci "{searchTerm}"
    </p>
  </div>
);

const Pagination = ({ currentPage, totalPages, totalFiltered, indexOfFirstPost, indexOfLastPost, handlePaginate, pageNumbers }) => (
  <div className="flex flex-col md:flex-row items-center justify-between mt-16 pt-8 border-t border-slate-50">
    <p className="text-slate-400 text-[13px] font-nunito">
      Showing {indexOfFirstPost + 1} to {Math.min(indexOfLastPost, totalFiltered)} of {totalFiltered} results
    </p>
    
    <div className="flex items-center gap-2 mt-4 md:mt-0 font-nunito text-[13px]">
      <button 
        disabled={currentPage === 1}
        onClick={() => handlePaginate(currentPage - 1)}
        className={`px-3 py-1 transition-colors ${currentPage === 1 ? 'text-slate-200 cursor-not-allowed' : 'text-slate-400 hover:text-[#0090FF]'}`}
      >
        Previous
      </button>

      {pageNumbers.map((page, index) => (
        page === '...' ? (
          <span key={`dots-${index}`} className="px-1 text-slate-300">...</span>
        ) : (
          <button
            key={page}
            onClick={() => handlePaginate(page)}
            className={`w-8 h-8 flex items-center justify-center rounded-lg font-bold transition-all ${
              currentPage === page 
              ? 'bg-[#0090FF] text-white shadow-md shadow-blue-100' 
              : 'text-slate-400 hover:bg-slate-50'
            }`}
          >
            {page}
          </button>
        )
      ))}

      <button 
        disabled={currentPage === totalPages}
        onClick={() => handlePaginate(currentPage + 1)}
        className={`px-3 py-1 transition-colors ${currentPage === totalPages ? 'text-slate-200 cursor-not-allowed' : 'text-slate-400 hover:text-[#0090FF]'}`}
      >
        Next
      </button>
    </div>
  </div>
);