import { useEffect, useState, useRef } from "react";
import { Info, Play, ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { useNavigate } from "react-router-dom";
import "../../movieTvDetails.css";
import "../../home/homescreen.css";

const MovieRow = ({ title, items, onCardClick }) => {
    const sliderRef = useRef(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);

    const scroll = (direction) => {
        if (sliderRef.current) {
            const { scrollLeft, clientWidth } = sliderRef.current;
            const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
            sliderRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
        }
    };

    const handleScroll = () => {
        if (sliderRef.current) {
            setShowLeftArrow(sliderRef.current.scrollLeft > 0);
        }
    };

    return (
        <section className="browse-row">
            <h2>{title}</h2>
            <div className="slider-wrapper">
                {showLeftArrow && (
                    <button className="row-arrow left" onClick={() => scroll('left')}>
                        <ChevronLeft size={40} />
                    </button>
                )}
                
                <div className="browse-slider" ref={sliderRef} onScroll={handleScroll}>
                    {items.map((m) => (
                        <button key={m.id} className="browse-card" onClick={() => onCardClick(m)}>
                            <img src={`https://image.tmdb.org/t/p/w500${m.backdrop_path || m.poster_path}`} alt={m.title} />
                            <span className="card-title">{m.title}</span>
                        </button>
                    ))}
                </div>

                <button className="row-arrow right" onClick={() => scroll('right')}>
                    <ChevronRight size={40} />
                </button>
            </div>
        </section>
    );
};

const DiscoverMoviePage = () => {
    const [movies, setMovies] = useState({
        trending: [],
        popular: [],
        topRated: [],
        upcoming: [],
    });
    const [heroCandidates, setHeroCandidates] = useState([]);
    const [heroIndex, setHeroIndex] = useState(0);
    const [heroMovie, setHeroMovie] = useState(null);
    const [heroImdbId, setHeroImdbId] = useState(null);
    const navigate = useNavigate();

    const API_KEY = "e2949b4ae590912c037da493c44407fc";

    useEffect(() => {
        const fetchImdbId = async () => {
            if (!heroMovie) return;
            try {
                const res = await fetch(`https://api.themoviedb.org/3/movie/${heroMovie.id}?api_key=${API_KEY}`);
                const data = await res.json();
                setHeroImdbId(data.imdb_id);
            } catch (error) {
                console.error("Error fetching hero IMDB ID:", error);
            }
        };

        fetchImdbId();
    }, [heroMovie]);

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchAll = async () => {
            const endpoints = {
                trending: `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`,
                popular: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
                topRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`,
                upcoming: `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`,
            };

            try {
                const results = {};
                for (const [key, url] of Object.entries(endpoints)) {
                    const res = await fetch(url);
                    const data = await res.json();
                    results[key] = data.results || [];
                }
                setMovies(results);
                const candidates = results.trending.filter(m => m.backdrop_path);
                setHeroCandidates(candidates);
                setHeroMovie(candidates[0]);
            } catch (err) {
                console.error(err);
            }
        };
        fetchAll();
    }, []);

    // Auto-rotate hero content every 8 seconds
    useEffect(() => {
        if (heroCandidates.length === 0) return;
        const interval = setInterval(() => {
            setHeroIndex((prev) => (prev + 1) % Math.min(heroCandidates.length, 10));
        }, 8000);
        return () => clearInterval(interval);
    }, [heroCandidates]);

    useEffect(() => {
        if (heroCandidates.length > 0) {
            setHeroMovie(heroCandidates[heroIndex]);
        }
    }, [heroIndex, heroCandidates]);

    if (!heroMovie) return null;

    const handleCardClick = (m) => {
        navigate("/moviedetails", { state: { movie: m } });
    };

    return (
        <div className="details-page">
            <Navbar />
            <section className="details-hero">
                <img 
                    key={heroMovie.id}
                    className="details-hero-image" 
                    src={`https://image.tmdb.org/t/p/original${heroMovie.backdrop_path}`} 
                    alt={heroMovie.title} 
                    style={{ animation: 'kenburns 20s infinite alternate, crossfade 1s ease-in-out' }}
                />
                <div className="details-hero-shade" />
                <div className="details-hero-content">
                    <span className="media-type">M O V I E S</span>
                    <h1>{heroMovie.title}</h1>
                    <div className="details-actions">
                        <button 
                            className="details-play" 
                            onClick={() => {
                                if (heroImdbId) window.location.href = `https://www.playimdb.com/title/${heroImdbId}`;
                            }}
                        >
                            <Play fill="currentColor" /> Play
                        </button>
                        <button className="details-info" onClick={() => handleCardClick(heroMovie)}>
                            <Info /> More Info
                        </button>
                    </div>
                    <div className="details-hero-meta">
                        <span className="rating">{heroMovie.vote_average.toFixed(1)} Rating</span>
                        <span>{heroMovie.release_date?.split("-")[0]}</span>
                        <span className="maturity">{heroMovie.adult ? "18+" : "12+"}</span>
                        <span className="hd-badge">HD</span>
                    </div>
                    <p className="details-hero-overview truncate-2">{heroMovie.overview}</p>
                </div>
            </section>

            <main className="browse-main" style={{ marginTop: '-15vh', position: 'relative', zIndex: 10 }}>
                <MovieRow title="Trending Movies" items={movies.trending} onCardClick={handleCardClick} />
                <MovieRow title="Popular" items={movies.popular} onCardClick={handleCardClick} />
                <MovieRow title="Top Rated" items={movies.topRated} onCardClick={handleCardClick} />
                <MovieRow title="Upcoming" items={movies.upcoming} onCardClick={handleCardClick} />
            </main>
            <Footer />
        </div>
    );
};

export default DiscoverMoviePage;