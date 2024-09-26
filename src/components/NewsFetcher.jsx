import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NewsFetcher = ({ apiUrl, sectionTitle }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(apiUrl);
        setArticles(response.data.articles);
      } catch (err) {
        console.error('Error fetching the news:', err);
        setError('Hubo un problema al cargar las noticias. Intenta de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]);

  if (loading) {
    return <p className="text-center">Cargando noticias...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">{sectionTitle}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.length > 0 ? (
          articles.map((article, index) => (
            <div key={index} className="border p-4 rounded-lg shadow-md">
              {article.urlToImage && (
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="w-full h-48 object-cover mb-4 rounded-lg"
                />
              )}
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

export default NewsFetcher;
