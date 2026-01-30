import logo from '../assets/logo putih.png';
import kirim from '../assets/kirim.png';
import fb from '../assets/fb.png';
import ig from '../assets/ig.png';
import yt from '../assets/yt.png';

export default function Footer({ categories = [], setActiveTab }) {
  return (
   <footer className="w-full bg-[#2D333F] text-white pt-16 pb-12 mt-auto border-t border-slate-700">
      <div className="max-w-7l mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Logo & Hak Cipta */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={logo} alt="logo" className="h-15 w-auto" />
              <span className="font-poppins text-[30px] font-semibold">Berita Kini</span>
            </div>
            <p className="text-slate-400 font-nunito text-[14px]">
              © 2023 Berita Kini. All Rights Reserved.
            </p>
            <div className="space-y-4 pt-4">
              <h4 className="font-nunito font-semibold text-[16px] tracking-widest text-slate-300">Ikuti Kami</h4>
              <div className="flex gap-4">
                <img src={yt} alt="yt" className="cursor-pointer hover:opacity-80 transition-opacity" />
                <img src={ig} alt="ig" className="cursor-pointer hover:opacity-80 transition-opacity" />
                <img src={fb} alt="fb" className="cursor-pointer hover:opacity-80 transition-opacity" />
              </div>
            </div>
          </div>

          {/* Telusuri */}
          <div className="space-y-4 lg:pl-15">
            <h4 className="font-nunito font-semibold text-[18px]">Telusuri</h4>
            <ul className="space-y-2 text-slate-300 text-[14px]">
              {categories.map((item) => (
                <li 
                  key={item} 
                  onClick={() => setActiveTab(item)} 
                  className="hover:text-white cursor-pointer transition-colors w-fit"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Bantuan */}
          <div className="space-y-4">
            <h4 className="font-nunito font-semibold text-[18px]">Bantuan</h4>
            <ul className="space-y-2 text-slate-300 text-[14px]">
              <li className="hover:text-white cursor-pointer transition-colors">Kontak Kami</li>
              <li className="hover:text-white cursor-pointer transition-colors">Laporan Pembajakan</li>
              <li className="hover:text-white cursor-pointer transition-colors">Kebijakan</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="font-nunito font-semibold text-[18px]">
              Berlangganan Berita Terbaru
            </h4>
            <div className="relative group flex items-center">
              <input 
                type="email" 
                placeholder="Masukan email" 
                className="w-full bg-white rounded-lg px-4 py-4 text-slate-900 outline-none pr-14"
              />
              <button className="absolute right-2 bg-[#0090FF] p-2.5 rounded-md hover:bg-blue-600 transition-all">
                <img src={kirim} alt="kirim" className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}