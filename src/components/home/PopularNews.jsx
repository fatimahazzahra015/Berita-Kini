export function PopularNews({ news, onDetail }) {
  if (!news || news.length === 0) return null;

  const getCategory = (link) => {
    if (!link) return "Berita";
    const parts = link.split('/');
    return parts[3] || "Berita";
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <section className="max-w-7l mx-auto px-6 lg:px-20 py-10">
      <div className="flex items-center gap-3 mb-10">
        <div className="w-[5px] h-10 bg-[#0090FF]"></div>
        <h2 className="text-[26px] font-nunito font-black text-[#2D333F]">
          Berita Terpopuler
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10">
        {news.slice(0, 3).map((item, index) => (
          <div 
            key={item.link || index} 
            onClick={() => onDetail(item)} 
            className="flex items-start gap-5 group cursor-pointer relative"
          >
            {/* Thumbnail Section */}
            <div className="relative shrink-0">
              <div className="absolute -top-3 -left-3 bg-[#2D333F] text-white w-9 h-9 rounded-full flex items-center justify-center text-[14px] font-black z-10 border-[3px] border-white shadow-sm">
                {index + 1}
              </div>
              
              <div className="w-[110px] h-[110px] rounded-[20px] overflow-hidden shadow-sm">
                <img 
                  src={item.image?.small || item.image?.large} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  alt={item.title} 
                />
              </div>
            </div>

            {/* Info Section */}
            <div className="flex flex-col justify-between py-1">
              <h3 className="font-nunito font-black text-[15px] leading-[1.4] text-[#2D333F] group-hover:text-[#0090FF] transition-colors line-clamp-3">
                {item.title}
              </h3>
              
              <div className="flex items-center gap-2 mt-3 font-nunito text-[11px] font-bold">
                <span className="text-[#0090FF] uppercase tracking-tight">
                  {getCategory(item.link)}
                </span>
                
                <span className="text-slate-300">•</span>
                
                <span className="text-slate-400 font-medium">
                  {formatDate(item.isoDate)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}