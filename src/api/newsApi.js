const API_KEY = process.env.REACT_APP_NEWS_API_KEY;
const BASE_URL = "https://newsapi.org/v2";

// Rename function from fetchNews to fetchTopHeadlines
export const fetchTopHeadlines = async (category = "", country = "us") => {
  try {
    let url = "";

    if (category) {
      url = `${BASE_URL}/top-headlines?country=${country}&category=${category.toLowerCase()}&apiKey=${API_KEY}`;
    } else {
      // Home page pe pehle Pakistan try karo
      url = `${BASE_URL}/top-headlines?country=pk&apiKey=${API_KEY}`;
      const pkRes = await fetch(url);
      const pkData = await pkRes.json();

      if (pkData.articles && pkData.articles.length > 0) {
        console.log("Pakistan news loaded:", pkData.articles.length);
        return pkData.articles;
      } else {
        console.log("No Pakistan news, using US news");
        url = `${BASE_URL}/top-headlines?country=us&apiKey=${API_KEY}`;
      }
    }

    console.log("REQUEST URL:", url);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    const data = await response.json();

    if (data.articles && data.articles.length > 0) {
      console.log("NEWS LOADED:", data.articles.length);
      return data.articles;
    } else {
      console.log("No articles found");
      return [];
    }
  } catch (error) {
    console.error("News fetch failed:", error.message);
    return [];
  }
};

// Agar aapke paas fetchNews function hai to usko bhi rakhein
export const fetchNews = fetchTopHeadlines; // Alias for compatibility