import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Play, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MovieDetails = () => {
    const { state } = useLocation();
    const [teaser, setTeaser] = useState(null);
    const [trailers, setTrailers] = useState([]);
    const [cast, setCast] = useState([]);
    const [castIndex, setCastIndex] = useState(0);
    const [similarMovieIndex, setSimilarMovieIndex] = useState(0);
    const [similarMovie, setSimilarMovie] = useState([]);
    const navigate = useNavigate();

    const handleMovieClick = (movie) => {
      navigate("/moviedetails", { state: { movie } });
      window.location.reload();
    };
    const handleMemberClick = (person) => {
        navigate("/peopledetails", { state: { person } });
    };


    const handleCastLeftClick = () => {
        setCastIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };

    const handleCastRightClick = () => {
        setCastIndex((prevIndex) =>
            Math.min(prevIndex + 1, cast.length - 6)
        );
    };
    const handleSimilarMovieLeftClick = () => {
        setSimilarMovieIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };

    const handleSimilarMovieRightClick = () => {
        setSimilarMovieIndex((prevIndex) =>
            Math.min(prevIndex + 1, similarMovie.length - 6)
        );
    };

    const movie = state?.movie;

    useEffect(() => {
        const fetchVideos = async () => {
            if (!movie || !movie.id) return;

            try {
                // Fetch TV show details to get the list of seasons
                const detailsResponse = await fetch(
                    `https://api.themoviedb.org/3/movie/${movie.id}?api_key=e2949b4ae590912c037da493c44407fc`
                );
                const detailsData = await detailsResponse.json();

                const allTrailers = [];
                let foundTeaser = null;

                // Iterate through seasons and fetch videos
                for (const season of detailsData.seasons) {
                    const seasonResponse = await fetch(
                        `https://api.themoviedb.org/3/movie/${movie.id}/season/${season.season_number}/videos?api_key=e2949b4ae590912c037da493c44407fc`
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
        fetchCast();
    }, [movie]);


    const fetchCast = (movieId) => {
        fetch(
            `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=e2949b4ae590912c037da493c44407fc`
        )
            .then((res) => res.json())
            .then((json) => {
                setCast(json.cast.slice(0, 6)); // Limit to 6 cast members
            })
            .catch((error) => console.error("Error fetching cast:", error));
    };
    const fetchSimilarMovie = async (movieId) => {
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=e2949b4ae590912c037da493c44407fc`
            );
            const data = await response.json();
            setSimilarMovie(data.results.slice(0, 10));
        } catch (error) {
            console.error("Error fetching similar movies:", error);
        }
    };
    useEffect(() => {
        if (movie) {
            fetchCast(movie.id);
            fetchSimilarMovie(movie.id);
        }
    }, [movie]);

    return (
        <>
            <Navbar />
            <div className="viewcontentblock">
                <div className="maincontent">
                    <img
                        className="maincontentbackgroud"
                        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                        alt={movie.title || movie.name}
                    />
                </div>

                <div className="whiteborder"></div>
                <div className="whiteborder2"></div>

                <div className="main">
                    <img
                        className="backgroundImage"
                        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                        alt={movie.title || movie.name}
                    />
                    <div className="leftblur"></div>
                    <div className="bottomblur"></div>

                    <div className="round"></div>
                    <div className="content-title">
                        <span  className='media-type'>M O V I E</span>
                        <h1 className="tittle">{movie.title || movie.name}</h1>
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
                <h1>{movie.title || movie.name}</h1>
                <p>
                    {movie.first_air_date
                        ? movie.first_air_date.substring(0, 4)
                        : "N/A"}{" "}
                    | {movie.adult ? "Adult (18+)" : "Kids, Adult (12+)"} | Rating:{" "}
                    {movie.vote_average || "N/A"}
                </p>
                <h2>{movie.overview}</h2>
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
                        <div key={person.id} className="content1" onClick={()=>handleMemberClick(person)} >
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
            <h2 className="tittle-24">Similar Movies like "{movie.title || movie.name}"</h2>
            <div className="content-container">
                {similarMovieIndex > 0 && (
                    <button className="scroll-btn left" onClick={handleSimilarMovieLeftClick} >
                        &lt;
                    </button>
                )}
                <div className="morecontents">
                    {similarMovie.slice(similarMovieIndex, similarMovieIndex + 6).map((similar) => (
                        <div key={similar.id} className="content1" onClick={()=> handleMovieClick(similar)}  >
                            <img
                                src={`https://image.tmdb.org/t/p/w500${similar.poster_path}`}
                                alt={similar.name}
                            />
                            <p>{similar.name}</p>
                        </div>
                    ))}
                </div>
                {similarMovieIndex < similarMovie.length - 6 && (
                    <button className="scroll-btn right"  onClick={handleSimilarMovieRightClick} >
                        &gt;
                    </button>
                )}
            </div>





            <Footer />
        </>
    );
};

export default MovieDetails;
