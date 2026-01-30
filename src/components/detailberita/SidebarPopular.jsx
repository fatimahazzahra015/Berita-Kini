export const SidebarPopular = ({ news, onDetail, getCategory, formatDate }) => (
  <div className="lg:col-span-4">
    <div className="sticky top-10 space-y-12">
      <section>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1.5 h-8 bg-[#007BFF]"></div>
          <h2 className="text-xl font-black text-slate-900 uppercase">Terpopuler</h2>
        </div>
        <div className="space-y-8">
          {news.map((item, i) => (
            <div key={i} onClick={() => onDetail(item)} className="flex gap-4 group cursor-pointer">
              <div className="relative shrink-0">
                <span className="absolute -top-2 -left-2 bg-[#1E293B] text-white w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold z-10 border-2 border-white">{i + 1}</span>
                <img src={item.image?.small} className="w-20 h-20 rounded-[1.25rem] object-cover shadow-sm group-hover:brightness-90 transition-all" alt="Pop" />
              </div>
              <div className="flex flex-col justify-center gap-1">
                <h4 className="font-bold text-[13px] leading-snug text-slate-800 group-hover:text-[#007BFF] line-clamp-3 transition-colors">{item.title}</h4>
                <div className="flex items-center gap-2 text-[10px] font-bold">
                  <span className="text-[#007BFF] uppercase">{getCategory(item.link)}</span>
                  <span className="text-slate-400">• {formatDate(item.isoDate)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  </div>
);