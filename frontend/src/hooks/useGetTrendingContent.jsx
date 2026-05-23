import { useEffect, useState } from "react";
import { useContentStore } from "../stores/content";

const TMDB_API_KEY = "e2949b4ae590912c037da493c44407fc";

const useGetTrendingContent = () => {
  const [trendingContent, setTrendingContent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { contentType } = useContentStore();

  useEffect(() => {
    const getTrendingContent = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/trending/${contentType}/day?language=en-US&api_key=${TMDB_API_KEY}`
        );
        const data = await response.json();
        setTrendingContent(data.results || []);
      } catch (err) {
        setError(err);
        console.error("Error fetching trending content:", err);
      } finally {
        setIsLoading(false);
      }
    };

    getTrendingContent();
  }, [contentType]);

  return { trendingContent, isLoading, error };
};

export default useGetTrendingContent;
