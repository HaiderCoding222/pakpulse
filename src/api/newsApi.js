// src/api/newsApi.js

const GNEWS_API_KEY = "9fb07036367bccea2228c0ca05293799";

export const fetchTopHeadlines = async () => {   // ← sirf ye line change ki
  try {
    let response = await fetch(
      `https://gnews.io/api/v4/top-headlines?country=pk&lang=en&max=20&token=${GNEWS_API_KEY}`
    );

    if (response.ok) {
      const data = await response.json();
      if (data.articles && data.articles.length > 0) {
        console.log("Pakistani news loaded successfully!");
        return data.articles;
      }
    }

    console.log("Falling back to world news...");
    response = await fetch(
      `https://gnews.io/api/v4/top-headlines?lang=en&max=20&token=${GNEWS_API_KEY}`
    );

    if (response.ok) {
      const data = await response.json();
      return data.articles || [];
    }

    return [];
  } catch (error) {
    console.error("News fetch failed:", error);
    return [];
  }
};