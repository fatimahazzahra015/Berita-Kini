import { useState, useEffect } from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import DetailBerita from './pages/DetailBerita';
import Footer from './components/Footer';
import { fetchNewsByCategory } from './services/newsService';

const CATEGORIES = ['Terbaru', 'Nasional', 'Internasional', 'Ekonomi', 'Olahraga', 'Teknologi', 'Hiburan', 'Gaya Hidup'];

function App() {
  const [news, setNews] = useState([]);
  const [activeTab, setActiveTab] = useState('Terbaru');
  const [selectedNews, setSelectedNews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getNews = async () => {
      setLoading(true);
      try {
        // 2. Panggil fungsi service di sini
        const data = await fetchNewsByCategory(activeTab);
        setNews(data);
      } catch (error) {
        console.error("Fetch Error:", error);
        setNews([]); 
      } finally {
        setLoading(false);
      }
    };

    getNews();
  }, [activeTab]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header 
        activeTab={activeTab} 
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setSelectedNews(null);
          window.scrollTo(0, 0); 
        }} 
        categories={CATEGORIES} 
      />
      
      <main className="flex-grow w-full">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40">
            <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-b-4 border-[#007BFF] mb-4"></div>
            <p className="text-slate-500 font-bold animate-pulse tracking-widest uppercase">Memuat Berita {activeTab}...</p>
          </div>
        ) : selectedNews ? (
          <DetailBerita 
            data={selectedNews} 
            news={news} 
            onBack={() => {
              setSelectedNews(null);
              window.scrollTo(0, 0);
            }} 
            onDetail={(item) => { 
              setSelectedNews(item);
              window.scrollTo(0, 0);
            }}
            changeCategory={(newCat) => {
              setActiveTab(newCat);
              setSelectedNews(null);
              window.scrollTo(0, 0);
            }}
          />
        ) : news.length > 0 ? (
          <Home 
            news={news} 
            onDetail={(item) => {
              setSelectedNews(item);
              window.scrollTo(0, 0);
            }} 
          />
        ) : (
          <div className="max-w-7xl mx-auto px-6 lg:px-20 py-20">
            <div className="text-center py-20 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
              <h2 className="text-2xl font-bold text-slate-400">Oops! Berita {activeTab} tidak ditemukan</h2>
              <p className="text-slate-500 mt-2">Coba pilih kategori lain atau periksa koneksi internet Anda.</p>
            </div>
          </div>
        )}
      </main>

      <Footer 
        categories={CATEGORIES} 
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setSelectedNews(null); 
          window.scrollTo({ top: 0, behavior: 'smooth' }); 
        }} 
      />
    </div>
  );
}

export default App;