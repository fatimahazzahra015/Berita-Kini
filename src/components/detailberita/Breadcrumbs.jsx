export const Breadcrumbs = ({ category, onBack }) => (
  <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
    <button onClick={onBack} className="hover:text-[#007BFF] transition-colors">
      Beranda
    </button>
    <span className="text-slate-300">›</span>
    <span className="text-slate-400">{category}</span>
    <span className="text-slate-300">›</span>
    <span className="text-slate-900 font-bold">Detail</span>
  </nav>
);