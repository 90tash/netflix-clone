import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import "./search.css";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setIsLoading(true);
    setHasSearched(true);

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(searchTerm)}&api_key=e2949b4ae590912c037da493c44407fc`
      );
      const data = await response.json();
      const filteredResults = data.results.filter(
        (result) => result.poster_path || result.profile_path
      );
      setSearchResults(filteredResults);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResultClick = (result) => {
    if (result.media_type === "movie") {
      navigate("/moviedetails", { state: { movie: result } });
    } else if (result.media_type === "tv") {
      navigate("/tvdetails", { state: { movie: result } });
    } else if (result.media_type === "person") {
      navigate("/peopledetails", { state: { person: result } });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="search-page">
      <Navbar />
      
      <main className="search-container">
        <h1 className="search-title">Search Movies, TV Shows, or People</h1>
        
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for something to watch..."
            className="search-input"
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>

        {isLoading ? (
          <p className="loading-text">Searching...</p>
        ) : hasSearched && searchResults.length === 0 ? (
          <p className="no-results">No results found for "{searchTerm}".</p>
        ) : (
          <div className="search-grid">
            {searchResults.map((result) => (
              <div
                key={result.id + result.media_type}
                className="search-result-card"
                onClick={() => handleResultClick(result)}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${result.poster_path || result.profile_path}`}
                  alt={result.title || result.name}
                />
                <p>{result.title || result.name}</p>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default SearchPage;