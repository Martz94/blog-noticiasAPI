import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = ({ sectionTitle = 'general' }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {

      setLoading(true);
      setError(null);

      const apiUrl = sectionTitle 
      ? `${import.meta.env.VITE_API_URL}/top-headlines?category=${sectionTitle}&language=en&country=us&apiKey=${import.meta.env.VITE_API_KEY}`
      : `${import.meta.env.VITE_API_URL}/top-headlines?language=en&country=us&apiKey=${import.meta.env.VITE_API_KEY}`;
      try {
        const response = await axios.get(apiUrl);
        console.log(response); // Verifica si la respuesta de la API es correcta
        setArticles(response.data.articles);
      } catch (err) {
        console.error('Error fetching news:', err);
        setError('Hubo un problema al cargar las noticias. Intenta más tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return <p className="text-center">Cargando noticias...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto p-2 max-w-7xl mt-36">
      <h2 className="text-3xl font-bold mb-7">Últimas Noticias</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.length > 0 ? (
          articles.map((article, index) => (
            <div key={index} className="border p-4 rounded-lg shadow-md bg-slate-50">
              <img
                src={article.urlToImage}
                alt={article.title}
                className="w-full h-48 object-cover mb-4 rounded-lg"
              />
              <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
              <p className="text-gray-600 mb-2">{article.description}</p>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Leer más
              </a>
            </div>
          ))
        ) : (
          <p>No hay artículos disponibles en este momento.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
