export default function RelatedNewsSection({ news, currentTitle, category, onDetail, changeCategory, getCategory, formatDate }) {
  const related = news ? news.filter((item) => item.title !== currentTitle).slice(0, 3) : [];

  return (
    <section className="mt-16 border-t border-slate-50">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-8 bg-[#007BFF]"></div>
          <h2 className="text-2xl font-black text-slate-900 uppercase">Berita Terkait</h2>
        </div>
        <button 
          onClick={() => changeCategory(category)}
          className="bg-blue-50 text-[#007BFF] px-6 py-2.5 rounded-xl text-xs font-extrabold hover:bg-blue-100 transition-all border border-blue-100"
        >
          Lihat Semua
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {related.map((item, index) => (
          <div key={index} onClick={() => onDetail(item)} className="group cursor-pointer">
            <div className="overflow-hidden rounded-[2rem] mb-4 aspect-[4/3] shadow-sm">
              <img src={item.image?.small} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Related" />
            </div>
            <h4 className="font-bold text-[15px] leading-snug text-slate-800 group-hover:text-[#007BFF] transition-colors line-clamp-2 mb-3">
              {item.title}
            </h4>
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase">
              <span className="text-[#007BFF]">{getCategory(item.link)}</span>
              <span>• {formatDate(item.isoDate)}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}