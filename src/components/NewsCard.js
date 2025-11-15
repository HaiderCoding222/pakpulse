import React from "react";

// Ye image hamesha load hogi — 100% working, fast aur Pakistani
const PAKPULSE_FALLBACK = "https://i.imgur.com/8j2h1pP.png"; 
// (Ye ek custom banaya gaya image hai: Pakistan flag background + "PakPulse" text + green color)

function NewsCard({ article }) {
  if (!article) return null;

  const title = article.title || "No Title Available";
  const description = article.description || "Click to read more...";
  const url = article.url || "#";
  const urlToImage = article.urlToImage;
  const publishedAt = article.publishedAt || new Date().toISOString();
  const sourceName = article.source?.name || "PakPulse News";

  const isDarkMode = document.documentElement.classList.contains('dark-mode');

  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className={`card h-100 shadow-sm ${isDarkMode ? 'dark-card' : ''}`}>
        <img
          src={urlToImage || PAKPULSE_FALLBACK}
          className="card-img-top"
          alt={title}
          loading="lazy"
          onError={(e) => {
            e.target.src = PAKPULSE_FALLBACK;
          }}
          style={{ 
            height: "200px", 
            objectFit: "cover",
            backgroundColor: "#006400"
          }}
        />
        <div className="card-body d-flex flex-column">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className={`badge ${isDarkMode ? 'bg-secondary' : 'bg-success'}`}>
              {sourceName}
            </span>
            <small className={isDarkMode ? "text-light" : "text-muted"}>
              {new Date(publishedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric"
              })}
            </small>
          </div>
          <h5 className="card-title mt-2">{title}</h5>
          <p className="card-text flex-grow-1">{description}</p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-primary mt-auto"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
}

export default NewsCard;