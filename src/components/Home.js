import React, { useState, useEffect } from "react";
import NewsCard from "./NewsCard";
import { fetchTopHeadlines } from "../api/newsApi";

function Home() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const articles = await fetchTopHeadlines();
        setNews(articles);
      } catch (error) {
        console.error("Error loading news:", error);
        setNews([]);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading latest news...</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4 text-center text-primary fw-bold">
        Top Headlines
        <small className="text-muted d-block fs-6">Pakistan & Around the World</small>
      </h2>

      <div className="row">
        {news.length > 0 ? (
          news.map((article, index) => (
            <NewsCard 
              key={`${article.url || index}-${index}`} 
              article={article} 
            />
          ))
        ) : (
          <div className="col-12 text-center py-5">
            <div className="alert alert-warning">
              <h5>No news available</h5>
              <p className="mb-0">Please try again later or check your internet connection.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;