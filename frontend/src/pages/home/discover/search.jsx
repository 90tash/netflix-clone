import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/Navbar";
import "./search.css"; // Import the external CSS file
import Footer from "../../../components/Footer";

const SearchPage = () => {
  const [searchTerm , setSearchTerm] = useState("");
  const [searchResults , setSearchResults] = useState([]);
  const [isLoading , setIsLoading] = useState(false);
  const [contentType , setContentType] = useState("");
  const [hasSearched , setHasSearched] = useState(false); // Flag to track if a search was submitted

  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return; // Ensure the search term is not empty

    setIsLoading(true);
    setHasSearched(true); // Mark that the search has been initiated

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(
          searchTerm
        )}&api_key=e2949b4ae590912c037da493c44407fc`
      );
      const data = await response.json();

      const filteredResults = data.results.filter(
        (result) => result.poster_path || result.profile_path
      );

      setSearchResults(filteredResults);

      if (filteredResults.length > 0) {
        if (filteredResults[0].media_type === "movie") {
          setContentType("movie");
        } else if (filteredResults[0].media_type === "tv") {
          setContentType("tv");
        } else if (filteredResults[0].media_type === "person") {
          setContentType("people");
        }
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setIsLoading(false);
    }
  };


  const handleMovieClick = (movie) => {
    if (movie.media_type === "movie") {
      navigate("/moviedetails", { state: { movie, type: "movie" } });
    } else if (movie.media_type === "tv") {
      navigate("/tvdetails", { state: { movie, type: "tv" } });
    } else if (movie.media_type === "person") {
      navigate("/peopledetails", { state: { movie, type: "people" } });
    }
  };
  

  return (
    <>
      <Navbar />
      <div className="search-page">
        <h1 className="tittle-25">Search Movies, TV Shows, or People</h1>
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for a movie, TV show, or person..."
            className="search-input"
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>

        {isLoading && <p>Loading...</p>}

        {!isLoading && hasSearched && searchResults.length === 0 && (
          <p className="no-results">Sorry, no results found.</p>
        )}

        <div className="search-results">
          {searchResults.map((result) => (
            <div
              key={result.id}
              onClick={() => handleMovieClick(result)}
              className="result-card"
            >
              {result.poster_path || result.profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${
                    result.poster_path || result.profile_path
                  }`}
                  alt={result.title || result.name}
                  className="result-image"
                />
              ) : null}
              <p className="result-title">
                {result.title || result.name || "Untitled"}
              </p>
            </div>
          ))}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default SearchPage;
