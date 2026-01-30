export const fetchNewsByCategory = async (category) => {
  // Tambahkan prefix cors-anywhere atau proxy lainnya
const BASE_URL = '/api-news/api/cnn-news';
const categoryMap = {
    'Terbaru': '',
    'Nasional': '/nasional',
    'Internasional': '/internasional',
    'Ekonomi': '/ekonomi',
    'Olahraga': '/olahraga',
    'Teknologi': '/teknologi',
    'Hiburan': '/hiburan',
    'Gaya Hidup': '/gaya-hidup',
  };

  const endpoint = categoryMap[category] || '';
  const response = await fetch(`${BASE_URL}${endpoint}`);
  if (!response.ok) throw new Error("Gagal mengambil data");
  const result = await response.json();
  return result.data;
};