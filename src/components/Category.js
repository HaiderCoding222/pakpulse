import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NewsCard from "./NewsCard";
import { fetchTopHeadlines } from "../api/newsApi";

function Category() {
  const { categoryName } = useParams();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTopHeadlines(categoryName).then((articles) => {
      setNews(articles);
      setLoading(false);
    });

    // Theme change listener
    const handleThemeChange = () => {
      setNews(prev => [...prev]);
    };

    window.addEventListener('themeChange', handleThemeChange);
    return () => window.removeEventListener('themeChange', handleThemeChange);
  }, [categoryName]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <p className={document.documentElement.classList.contains('dark-mode') ? "text-light" : "text-dark"}>
          Loading {categoryName} news...
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className={`mb-4 text-center fw-bold ${document.documentElement.classList.contains('dark-mode') ? "text-light" : "text-primary"}`}>
        {categoryName} News
      </h2>

      <div className="row">
        {news.length > 0 ? (
          news.map((article, index) => (
            <NewsCard key={`${article.url || index}-${index}`} article={article} />
          ))
        ) : (
          <div className="col-12 text-center py-5">
            <p className={document.documentElement.classList.contains('dark-mode') ? "text-light" : "text-dark"}>
              No {categoryName} news available right now.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Category;