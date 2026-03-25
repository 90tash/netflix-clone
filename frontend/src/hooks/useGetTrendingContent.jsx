import { useEffect, useState } from "react";
import { useContentStore } from "../stores/content";
import axios from "axios";

const useGetTrendingContent = () => {
  const [trendingContent, setTrendingContent] = useState([]); // Initialize as empty array
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const [error, setError] = useState(null); // Track errors
  const { contentType } = useContentStore();

  useEffect(() => {
    const getTrendingContent = async () => {
      setIsLoading(true); // Set loading state
      setError(null); // Reset error state

      try {
        const res = await axios.get(
          `http://localhost:5000/api/v1/${contentType}/trending`
        );
        setTrendingContent(res.data.content); // Set trending content
      } catch (err) {
        setError(err); // Handle errors
        console.error("Error fetching trending content:", err);
      } finally {
        setIsLoading(false); // Reset loading state
      }
    };

    getTrendingContent();
  }, [contentType]);

  return { trendingContent, isLoading, error }; // Return loading and error states
};

export default useGetTrendingContent;