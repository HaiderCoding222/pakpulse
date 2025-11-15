const GNEWS_API_KEY = "9fb07036367bccea2228c0ca05293799";

// Free CORS proxy laga diya hai (bilkul safe aur working)
const PROXY = "https://api.allorigins.win/get?url=";
const GNEWS_BASE = "https://gnews.io/api/v4/top-headlines";

export const fetchTopHeadlines = async () => {
  try {
    // Pakistan news
    let url = `${GNEWS_BASE}?country=pk&lang=en&max=30&token=${GNEWS_API_KEY}`;
    let response = await fetch(PROXY + encodeURIComponent(url));
    let result = await response.json();
    let data = JSON.parse(result.contents);

    if (data.articles && data.articles.length > 0) {
      console.log("Pakistani news loaded via proxy!");
      return data.articles;
    }

    // Fallback world news
    url = `${GNEWS_BASE}?lang=en&max=30&token=${GNEWS_API_KEY}`;
    response = await fetch(PROXY + encodeURIComponent(url));
    result = await response.json();
    data = JSON.parse(result.contents);

    return data.articles || [];

  } catch (error) {
    console.error("News fetch failed:", error);
    return [];
  }
};