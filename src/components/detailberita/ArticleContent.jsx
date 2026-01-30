export const ArticleContent = ({ title, category, date, image, paragraphs }) => (
  <div className="lg:col-span-8">
    <h1 className="text-3xl lg:text-[40px] font-black leading-tight text-slate-900 mb-4">{title}</h1>
    
    <div className="flex items-center gap-3 mb-6">
      <span className="text-[#007BFF] font-bold text-sm uppercase tracking-wider">{category}</span>
      <span className="text-slate-300">•</span>
      <span className="text-slate-500 text-sm font-medium">{date}</span>
    </div>

    <div className="mb-8">
      <div className="rounded-[2.5rem] overflow-hidden shadow-lg shadow-slate-200">
        <img src={image} className="w-full h-auto lg:h-[480px] object-cover" alt="Main" />
      </div>
      <p className="mt-4 text-[10px] text-slate-400 italic">SUMBER: CNN INDONESIA</p>
    </div>

    <article className="text-slate-700 text-[18px] leading-relaxed space-y-6 mb-16 border-b border-slate-100 pb-12 text-justify">
      {paragraphs.map((p, index) => <p key={index}>{p}</p>)}
    </article>
  </div>
);