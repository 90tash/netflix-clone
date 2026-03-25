import { useState, useEffect } from 'react';
import { fetchTrendingContent, fetchPopularMovies, fetchTopRatedMovies, fetchMovieScreenshots, fetchSeasonTrailers } from './apiFunctions'; // Import the functions

export const useHomeScreen = (contentType, setContentType) => {
  const [movieList, setMovieList] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [randomMovie, setRandomMovie] = useState(null);
  const [screenshots, setScreenshots] = useState([]);
  const [seasonTrailers, setSeasonTrailers] = useState([]);
  
  const [trendingIndex, setTrendingIndex] = useState(0);
  const [popularIndex, setPopularIndex] = useState(0);
  const [topRatedIndex, setTopRatedIndex] = useState(0);

  const trendingContentToShow = movieList.slice(0, 10);

  const handleTrendingLeftClick = () => {
    setTrendingIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleTrendingRightClick = () => {
    setTrendingIndex((prevIndex) =>
      Math.min(prevIndex + 1, trendingContentToShow.length - 3)
    );
  };

  const handlePopularLeftClick = () => {
    setPopularIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleTopRatedLeftClick = () => {
    setTopRatedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handlePopularRightClick = () => {
    setPopularIndex((prevIndex) =>
      Math.min(prevIndex + 1, popularMovies.length - 3)
    );
  };

  const handleTopRatedRightClick = () => {
    setTopRatedIndex((prevIndex) =>
      Math.min(prevIndex + 1, topRatedMovies.length - 3)
    );
  };

  useEffect(() => {
    const savedContentType = localStorage.getItem("contentType") || "movie";
    setContentType(savedContentType);
  }, [setContentType]);

  useEffect(() => {
    localStorage.setItem("contentType", contentType);
    fetchTrendingContent(contentType, setMovieList, setRandomMovie); // Call the function
    fetchPopularMovies(setPopularMovies); // Call the function
    fetchTopRatedMovies(contentType, setTopRatedMovies); // Call the function
  }, [contentType]);

  useEffect(() => {
    if (randomMovie && contentType === "tv") {
      fetchMovieScreenshots(contentType, randomMovie.id, setScreenshots); // Fetch screenshots for TV shows
      fetchSeasonTrailers(randomMovie.id, setSeasonTrailers); // Fetch trailers for seasons
    }
  }, [randomMovie, contentType]);

  return {
    movieList,
    popularMovies,
    topRatedMovies,
    randomMovie,
    screenshots,
    seasonTrailers,
    trendingIndex,
    popularIndex,
    topRatedIndex,
    handleTrendingLeftClick,
    handleTrendingRightClick,
    handlePopularLeftClick,
    handleTopRatedLeftClick,
    handlePopularRightClick,
    handleTopRatedRightClick
  };
};
