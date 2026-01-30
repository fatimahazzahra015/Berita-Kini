import { useState, useEffect, useRef } from 'react';

const SLIDE_DATA = [
  {
    title: "Petualangan Edukatif bersama \n Malang Mbois City Tour!",
    desc: "Nikmati perjalanan seru keliling kota dengan fasilitas terbaik dan pemandu profesional.",
    color: "bg-[#00C4A7]",
    images: [
      { url: "https://picsum.photos/400/300?sig=11", label: "Museum Brawijaya" },
      { url: "https://picsum.photos/400/300?sig=12", label: "Kayutangan" },
      { url: "https://picsum.photos/400/300?sig=13", label: "Kebun Binatang" },
    ]
  },
  {
    title: "Jelajahi Kuliner Legendaris \n Khas Kota Malang!",
    desc: "Dari Bakso hingga Cwie Mie, temukan cita rasa otentik yang tak terlupakan.",
    color: "bg-[#FFB100]",
    images: [
      { url: "https://picsum.photos/400/300?sig=21", label: "Bakso Malang" },
      { url: "https://picsum.photos/400/300?sig=22", label: "Pasar Besar" },
      { url: "https://picsum.photos/400/300?sig=23", label: "Cwie Mie" },
    ]
  },
  {
    title: "Promo Weekend Seru \n Diskon Paket Keluarga!",
    desc: "Dapatkan potongan harga khusus untuk reservasi paket tour di hari Sabtu & Minggu.",
    color: "bg-[#0090FF]",
    images: [
      { url: "https://picsum.photos/400/300?sig=31", label: "Alun-Alun" },
      { url: "https://picsum.photos/400/300?sig=32", label: "Batu Night" },
      { url: "https://picsum.photos/400/300?sig=33", label: "Paralayang" },
    ]
  }
];

const ALL_SLIDES = [SLIDE_DATA[SLIDE_DATA.length - 1], ...SLIDE_DATA, SLIDE_DATA[0]];

export function PromoBanner() {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const timeoutRef = useRef(null);

  useEffect(() => {
    timeoutRef.current = setInterval(() => {
      setIsTransitioning(true);
      setCurrentSlide((prev) => prev + 1);
    }, 5000);

    return () => clearInterval(timeoutRef.current);
  }, []);

  const handleTransitionEnd = () => {
    if (currentSlide === ALL_SLIDES.length - 1) {
      setIsTransitioning(false);
      setCurrentSlide(1);
    } else if (currentSlide === 0) {
      setIsTransitioning(false);
      setCurrentSlide(ALL_SLIDES.length - 2);
    }
  };

  const activeDotIdx = (currentSlide - 1 + SLIDE_DATA.length) % SLIDE_DATA.length;

  return (
    <section className="max-w-7l mx-auto px-6 lg:px-20 py-20">
      <div className="relative group overflow-hidden">
        <div 
          className={`flex ${isTransitioning ? 'transition-transform duration-700 ease-in-out' : ''}`}
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          onTransitionEnd={handleTransitionEnd}
        >
          {ALL_SLIDES.map((slide, idx) => (
            <div key={idx} className="w-full flex-shrink-0 px-2">
              <SlideCard slide={slide} />
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-2 mt-8">
          {SLIDE_DATA.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setIsTransitioning(true);
                setCurrentSlide(idx + 1);
              }}
              className={`transition-all duration-300 rounded-full h-2.5 ${
                activeDotIdx === idx ? "w-8 bg-[#0090FF]" : "w-2.5 bg-slate-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}


const SlideCard = ({ slide }) => (
  <div className={`${slide.color} rounded-[2.5rem] p-10 lg:p-16 flex flex-col lg:flex-row items-center justify-between relative`}>
    <div className="absolute inset-0 opacity-20 pointer-events-none">
      <svg className="absolute top-10 right-1/3 w-64 h-64" viewBox="0 0 200 200">
        <path d="M20,100 Q100,20 180,100" fill="none" stroke="white" strokeDasharray="5,5" />
      </svg>
      <div className="absolute top-16 right-1/4 text-white text-3xl rotate-12">✈</div>
    </div>

    <div className="relative z-10 text-white space-y-4 lg:max-w-[55%]">
      <h2 className="text-3xl lg:text-[44px] font-nunito font-black leading-[1.2] whitespace-pre-line">
        {slide.title}
      </h2>
      <p className="text-white/90 text-sm lg:text-base font-nunito font-medium max-w-md">
        {slide.desc}
      </p>
    </div>

    <SlideImages images={slide.images} />
  </div>
);

const SlideImages = ({ images }) => (
  <div className="relative z-10 mt-12 lg:mt-0 h-[250px] w-full lg:w-[40%] flex justify-center items-center">
    <div className="absolute left-0 bottom-10 w-40 lg:w-44 bg-white p-1.5 rounded-xl shadow-2xl -rotate-[15deg] z-10">
      <img src={images[0].url} className="w-full h-24 lg:h-28 object-cover rounded-lg" alt="img1" />
      <p className="text-[10px] text-center font-bold text-slate-700 py-1 font-nunito">{images[0].label}</p>
    </div>
    <div className="absolute left-1/4 -bottom-2 w-44 lg:w-48 bg-white p-1.5 rounded-xl shadow-2xl rotate-[5deg] z-30">
      <img src={images[1].url} className="w-full h-28 lg:h-32 object-cover rounded-lg" alt="img2" />
      <p className="text-[10px] text-center font-bold text-slate-700 py-1 font-nunito">{images[1].label}</p>
    </div>
    <div className="absolute right-0 top-0 w-40 lg:w-44 bg-white p-1.5 rounded-xl shadow-2xl rotate-[12deg] z-20">
      <img src={images[2].url} className="w-full h-24 lg:h-28 object-cover rounded-lg" alt="img3" />
      <p className="text-[10px] text-center font-bold text-slate-700 py-1 font-nunito">{images[2].label}</p>
    </div>
  </div>
);