import { useEffect, useState } from 'react';
import { Breadcrumbs } from '../components/detailberita/Breadcrumbs';
import { ArticleContent } from '../components/detailberita/ArticleContent';
import { SidebarPopular } from '../components/detailberita/SidebarPopular';
import CommentSection from '../components/detailberita/CommentSection'; // Pindahkan logika komentar ke file sendiri
import RelatedNewsSection from '../components/detailberita/RelatedNewsSection';

export default function DetailBerita({ data, news, onBack, onDetail, changeCategory }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [data]);

  // Helper Functions
  const getCategory = (link) => {
    if (!link) return "Nasional";
    const category = link.split('/')[3] || "Nasional";
    return category.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  };

  const formatDate = (isoString) => {
    return new Date(isoString || Date.now()).toLocaleDateString('id-ID', {
      day: 'numeric', month: 'short', year: 'numeric'
    });
  };

  const generateFullArticle = (snippet) => {
    if (!snippet) return [];
    const sentences = snippet.split('. ');
    return [
      sentences.slice(0, Math.ceil(sentences.length / 2)).join('. ') + '.',
      sentences.slice(Math.ceil(sentences.length / 2)).join('. ') + (sentences.length > 1 ? '.' : ''),
      "Dalam laporan lebih lanjut, situasi ini diprediksi akan memberikan dampak signifikan pada sektor-sektor terkait di masa mendatang.",
      "Hingga berita ini diunggah, tim redaksi masih menunggu pernyataan resmi tambahan dari narasumber kunci."
    ].filter(p => p.length > 5);
  };

  return (
    <div className="max-w-7l mx-auto px-6 lg:px-20 py-10 animate-in fade-in duration-700 font-nunito">
      <Breadcrumbs 
        category={getCategory(data.link)} 
        onBack={onBack} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8">
          <ArticleContent 
            title={data.title}
            category={getCategory(data.link)}
            date={formatDate(data.isoDate)}
            image={data.image?.large || data.image?.small}
            paragraphs={generateFullArticle(data.contentSnippet)}
          />
          
          <CommentSection /> 

          <RelatedNewsSection 
            news={news} 
            currentTitle={data.title} 
            category={getCategory(data.link)}
            onDetail={onDetail}
            changeCategory={changeCategory}
            getCategory={getCategory}
            formatDate={formatDate}
          />
        </div>

        <SidebarPopular 
          news={news?.slice(0, 3) || []} 
          onDetail={onDetail}
          getCategory={getCategory}
          formatDate={formatDate}
        />
      </div>
    </div>
  );
}