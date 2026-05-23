import React, { useEffect, useState } from "react";

const TMDB_API_KEY = "e2949b4ae590912c037da493c44407fc";

const TrendingMovies = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=${TMDB_API_KEY}`
        );
        const data = await response.json();
        if (data.results) {
          setMovies(data.results);
        } else {
          setError(data.status_message || "Unable to load movies");
        }
      } catch (err) {
        setError("Failed to fetch movies");
        console.error(err);
      }
    };

    fetchMovies();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Trending Movies</h1>
      {movies.length > 0 ? (
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>{movie.title}</li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default TrendingMovies;
