import React, { useEffect, useState } from "react";

const TrendingMovies = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/v1/movie/trending", {
          withCredentials: true, // Include cookies if needed
        });
        const data = await response.json();
        if (data.success) {
          setMovies(data.content);
        } else {
          setError(data.message);
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