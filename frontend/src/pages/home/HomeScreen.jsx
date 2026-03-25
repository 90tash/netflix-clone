import { Play, Info } from "lucide-react";
import Navbar from "../../components/Navbar";
import "./homescreen.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import Footer from '../../components/Footer';
import { useNavigate } from "react-router-dom";




const HomeScreen = () => {
  const [movieList, setMovieList] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [randomMovie, setRandomMovie] = useState(null);
  const [cast, setCast] = useState([]); // To store the cast of the random movie
  const [teaser, setTeaser] = useState(null);
  const [trailers, setTrailers] = useState([]);

  const navigate = useNavigate();

  const handleMovieClick = (movie) => {
      navigate("/tvdetails", { state: { movie } });
      window.location.reload();
  };

  const handleMemberClick = (person) => {
      navigate("/peopledetails", { state: { person } });
  };

  const [trendingIndex, setTrendingIndex] = useState(0); // Index for trending section
  const [popularIndex, setPopularIndex] = useState(0); // Index for popular section
  const [topRatedIndex, setTopRatedIndex] = useState(0); // Index for top rated section
  const [castIndex, setCastIndex] = useState(0); // Index for cast section

  // Trending Content to Show
  const trendingContentToShow = movieList.slice(0, 10);

  // Handlers for Trending Content
  const handleTrendingLeftClick = () => {
      setTrendingIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleTrendingRightClick = () => {
      setTrendingIndex((prevIndex) =>
          Math.min(prevIndex + 1, trendingContentToShow.length - 6)
      );
  };

  // Handlers for Popular Movies
  const handlePopularLeftClick = () => {
      setPopularIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleTopRatedLeftClick = () => {
      setTopRatedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handlePopularRightClick = () => {
      setPopularIndex((prevIndex) =>
          Math.min(prevIndex + 1, popularMovies.length - 6)
      );
  };

  const handleTopRatedRightClick = () => {
      setTopRatedIndex((prevIndex) =>
          Math.min(prevIndex + 1, topRatedMovies.length - 6)
      );
  };

  const handleCastLeftClick = () => {
      setCastIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleCastRightClick = () => {
      setCastIndex((prevIndex) =>
          Math.min(prevIndex + 1, cast.length - 6)
      );
  };

  useEffect(() => {
      fetchTrendingContent();
      fetchPopularMovies();
      fetchTopRatedMovies();
  }, []);

  useEffect(() => {
      if (randomMovie) {
          fetchCast(randomMovie.id);
      }
  }, [randomMovie]);

  useEffect(() => {
      const fetchVideos = async () => {
          if (!randomMovie || !randomMovie.id) return;

          try {
              const detailsResponse = await fetch(
                  `https://api.themoviedb.org/3/tv/${randomMovie.id}?api_key=e2949b4ae590912c037da493c44407fc`
              );
              const detailsData = await detailsResponse.json();

              const allTrailers = [];
              let foundTeaser = null;

              // Iterate through seasons and fetch videos
              for (const season of detailsData.seasons) {
                  const seasonResponse = await fetch(
                      `https://api.themoviedb.org/3/tv/${randomMovie.id}/season/${season.season_number}/videos?api_key=e2949b4ae590912c037da493c44407fc`
                  );
                  const seasonData = await seasonResponse.json();

                  if (!foundTeaser) {
                      foundTeaser = seasonData.results.find((video) => video.type === "Teaser");
                  }

                  const seasonTrailers = seasonData.results.filter((video) => video.type === "Trailer");
                  allTrailers.push(...seasonTrailers);

                  // Stop if we already have enough trailers
                  if (allTrailers.length >= 2) break;
              }

              setTeaser(foundTeaser);
              setTrailers(allTrailers.slice(0, 2)); // Limit to 2 trailers
          } catch (error) {
              console.error("Error fetching videos:", error);
          }
      };

      fetchVideos();
  }, [randomMovie]);

  // Fetch Trending Content (Movies or TV Shows)
  const fetchTrendingContent = () => {
      fetch(
          `https://api.themoviedb.org/3/trending/tv/day?language=en-US&api_key=e2949b4ae590912c037da493c44407fc`
      )
          .then((res) => res.json())
          .then((json) => {
              setMovieList(json.results);
              const randomIndex = Math.floor(Math.random() * json.results.length);
              setRandomMovie(json.results[randomIndex]);
          })
          .catch((error) => console.error("Error fetching trending content:", error));
  };

  // Fetch Cast Information for Random Movie or TV Show
  const fetchCast = (movieId) => {
      fetch(
          `https://api.themoviedb.org/3/tv/${movieId}/credits?api_key=e2949b4ae590912c037da493c44407fc`
      )
          .then((res) => res.json())
          .then((json) => {
              setCast(json.cast.slice(0, 6)); // Limit to 6 cast members
          })
          .catch((error) => console.error("Error fetching cast:", error));
  };

  // Fetch Popular Movies or TV Shows
  const fetchPopularMovies = async () => {
      try {
          const response = await fetch(
              `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&api_key=e2949b4ae590912c037da493c44407fc`
          );
          const data = await response.json();
          setPopularMovies(data.results.slice(0, 10));
      } catch (error) {
          console.error("Error fetching popular content:", error);
      }
  };

  // Fetch Top Rated Movies or TV Shows
  const fetchTopRatedMovies = async () => {
      try {
          const response = await fetch(
              `https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1&api_key=e2949b4ae590912c037da493c44407fc`
          );
          const data = await response.json();
          setTopRatedMovies(data.results.slice(0, 10));
      } catch (error) {
          console.error("Error fetching popular content:", error);
      }
  };

  return (
      <div>
          <Navbar />
          <div className="viewcontentblock">
              <div className="maincontent">
                  <img
                      className="maincontentbackgroud"
                      src={
                          randomMovie
                              ? `https://image.tmdb.org/t/p/original${randomMovie.backdrop_path}`
                              : ""
                      }
                      alt="Background"
                  />
              </div>

              <div className="whiteborder"></div>
              <div className="whiteborder2"></div>

              <div className="main">
                  <img
                      className="backgroundImage"
                      src={
                          randomMovie
                              ? `https://image.tmdb.org/t/p/original${randomMovie.backdrop_path}`
                              : ""
                      }
                      alt={randomMovie ? randomMovie.title || randomMovie.name : "Movie"}
                  />
                  <div className="leftblur"></div>
                  <div className="bottomblur"></div>

                  <div className="round"></div>
                  <div className="content-title">
                  <span  className="media-type">S E R I E S</span>
                     
                      <h1 className="tittle">
                          {randomMovie ? randomMovie.title || randomMovie.name : "Loading..."}
                      </h1>
                      <div className="btn-block">
                          <Link className="play-btn-video" to={"/watch/123"}>
                              <Play />
                              Play
                          </Link>
                          <Link className="more-info-btn" to={"/watch/123"}>
                              <Info className="info-icon" />
                              More Info
                          </Link>
                      </div>
                  </div>
              </div>
          </div>

          <div className="anothercontent">
              <h1>{randomMovie ? randomMovie.title || randomMovie.name : "Loading..."}</h1>
              <p>{randomMovie ? randomMovie.first_air_date : "Loading..."}{" "}
                  |{" "}
                  {randomMovie && randomMovie.adult
                      ? "Adult (18+)"
                      : "Kids, Adult (12+)"}{"     "}|  Rating:{randomMovie ? randomMovie.vote_average : "Loading"}</p>
              <h2>{randomMovie ? randomMovie.overview : "Loading"}</h2>
          </div>

          <h2 className="tittle-23">Teaser and Trailers</h2>
          <div className="video-container">

              <div className="video-section">
                  {teaser && (
                      <div className="video">
                          <iframe
                              src={`https://www.youtube.com/embed/${teaser.key}?modestbranding=1&showinfo=0&rel=0&controls=0&autoplay=0`}
                              title="Teaser"
                              allow=" encrypted-media"
                              allowFullScreen
                          />
                      </div>

                  )}
                  {trailers.map((trailer, index) => (
                      <div className="video" key={index}>
                          <iframe
                              src={`https://www.youtube.com/embed/${trailer.key}?modestbranding=1&showinfo=0&rel=0&controls=0&autoplay=0`}
                              title={`Trailer ${index + 1}`}
                              allow=" encrypted-media"
                              allowFullScreen
                          />
                      </div>
                  ))}
              </div>
          </div>



          <h2 className="tittle-2">Cast</h2>
          <div className="content-container">
              {castIndex > 0 && (
                  <button className="scroll-btn left" onClick={handleCastLeftClick}>
                      &lt;
                  </button>
              )}
              <div className="morecontents">
                  {cast.slice(castIndex, castIndex + 6).map((person) => (
                      <div key={person.id} className="content1" onClick={() => handleMemberClick(person)}  >
                          <img
                              src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
                              alt={person.name}
                          />
                          <p>{person.name}</p>
                      </div>
                  ))}
              </div>
              {castIndex < cast.length - 6 && (
                  <button className="scroll-btn right" onClick={handleCastRightClick}>
                      &gt;
                  </button>
              )}
          </div>

          {/* Trending Section */}
          <h2 className="tittle-2">Trending TV Shows</h2>
          <div className="content-container">
              {trendingIndex > 0 && (
                  <button className="scroll-btn left" onClick={handleTrendingLeftClick}>
                      &lt;
                  </button>
              )}
              <div className="morecontents">
                  {trendingContentToShow.slice(trendingIndex, trendingIndex + 6).map((movie) => (
                      <div key={movie.id} className="content1" onClick={() => handleMovieClick(movie)}    >
                          <img
                              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                              alt={movie.title || movie.name}
                          />
                          <p>{movie.title || movie.name}</p>
                      </div>
                  ))}
              </div>
              {trendingIndex < trendingContentToShow.length - 6 && (
                  <button className="scroll-btn right" onClick={handleTrendingRightClick}>
                      &gt;
                  </button>
              )}
          </div>

          {/* Popular Section */}
          <h2 className="tittle-2">Upcoming Movies </h2>
          <div className="content-container">
              {popularIndex > 0 && (
                  <button className="scroll-btn left" onClick={handlePopularLeftClick}>
                      &lt;
                  </button>
              )}
              <div className="morecontents">
                  {popularMovies.slice(popularIndex, popularIndex + 6).map((movie) => (
                      <div key={movie.id} className="content1" onClick={() => handleMovieClick(movie)}   >
                          <img
                              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                              alt={movie.title || movie.name}
                          />
                      </div>
                  ))}
              </div>
              {popularIndex < popularMovies.length - 6 && (
                  <button className="scroll-btn right" onClick={handlePopularRightClick}>
                      &gt;
                  </button>
              )}
          </div>
          <h2 className="tittle-2">Top Rated TV Shows</h2>
          <div className="content-container">
              {topRatedIndex > 0 && (
                  <button className="scroll-btn left" onClick={handleTopRatedLeftClick}>
                      &lt;
                  </button>
              )}
              <div className="morecontents">
                  {topRatedMovies.slice(topRatedIndex, topRatedIndex + 6).map((movie) => (
                      <div key={movie.id} className="content1" onClick={() => handleMovieClick(movie)}   >
                          <img
                              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                              alt={movie.title || movie.name}
                          />
                      </div>
                  ))}
              </div>
              {topRatedIndex < topRatedMovies.length - 6 && (
                  <button className="scroll-btn right" onClick={handleTopRatedRightClick}>
                      &gt;
                  </button>
              )}

          </div>
          <Footer />
      </div>
  );
};

export default HomeScreen;
