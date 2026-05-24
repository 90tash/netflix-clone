import { Info, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "./homescreen.css";

const TMDB_API_KEY = "e2949b4ae590912c037da493c44407fc";
const IMAGE_BASE = "https://image.tmdb.org/t/p";

const rows = [
    {
        title: "Trending Now",
        url: `https://api.themoviedb.org/3/trending/all/day?language=en-US&api_key=${TMDB_API_KEY}`,
    },
    {
        title: "Popular Movies",
        url: `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=${TMDB_API_KEY}`,
    },
    {
        title: "Top Rated TV Shows",
        url: `https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1&api_key=${TMDB_API_KEY}`,
    },
    {
        title: "Upcoming Movies",
        url: `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&api_key=${TMDB_API_KEY}`,
    },
];

const MovieRow = ({ row, openDetails }) => {
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
            <h2>{row.title}</h2>
            <div className="slider-wrapper">
                {showLeftArrow && (
                    <button className="row-arrow left" onClick={() => scroll('left')}>
                        <ChevronLeft size={40} />
                    </button>
                )}
                
                <div className="browse-slider" ref={sliderRef} onScroll={handleScroll}>
                    {row.items.map((item) => (
                        <button
                            type="button"
                            className="browse-card"
                            key={`${row.title}-${item.id}`}
                            onClick={() => openDetails(item)}
                        >
                            <img
                                src={`${IMAGE_BASE}/w500${item.backdrop_path || item.poster_path}`}
                                alt={item.title || item.name || "Movie poster"}
                            />
                            <span className="card-title">{item.title || item.name}</span>
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

const HomeScreen = () => {
    const [heroContent, setHeroContent] = useState(null);
    const [heroCandidates, setHeroCandidates] = useState([]);
    const [heroIndex, setHeroIndex] = useState(0);
    const [contentRows, setContentRows] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const loadHomeContent = async () => {
            try {
                const responses = await Promise.all(rows.map((row) => fetch(row.url)));
                const payloads = await Promise.all(responses.map((response) => response.json()));

                const nextRows = rows.map((row, index) => ({
                    title: row.title,
                    items: (payloads[index].results || []).filter((item) => item.poster_path),
                }));

                setContentRows(nextRows);

                const candidates = (payloads[0].results || []).filter((item) => item.backdrop_path);
                setHeroCandidates(candidates);
                setHeroContent(candidates[0] || null);
            } catch (error) {
                console.error("Error loading homepage content:", error);
            }
        };

        loadHomeContent();
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
            setHeroContent(heroCandidates[heroIndex]);
        }
    }, [heroIndex, heroCandidates]);

    const openDetails = (item) => {
        if (item.media_type === "tv" || item.name) {
            navigate("/tvdetails", { state: { movie: item, type: "tv" } });
            return;
        }

        navigate("/moviedetails", { state: { movie: item, type: "movie" } });
    };

    const title = heroContent?.title || heroContent?.name || "Loading...";
    const releaseYear = (heroContent?.release_date || heroContent?.first_air_date || "").slice(0, 4);

    return (
        <div className="netflix-home">
            <Navbar />

            <section className="browse-hero">
                {heroContent?.backdrop_path && (
                    <img
                        className="browse-hero-image"
                        src={`${IMAGE_BASE}/original${heroContent.backdrop_path}`}
                        alt={title}
                    />
                )}
                <div className="browse-hero-shade" />
                <div className="browse-hero-content">
                    <span className="browse-label">NETFLIX ORIGINAL</span>
                    <h1>{title}</h1>
                    <div className="browse-meta">
                        {releaseYear && <span>{releaseYear}</span>}
                        {heroContent?.vote_average && <span>{heroContent.vote_average.toFixed(1)} Rating</span>}
                        <span>HD</span>
                    </div>
                    <p>{heroContent?.overview || "Movies, shows, trailers and more are ready to watch."}</p>
                    <div className="browse-actions">
                        <button type="button" className="browse-play" onClick={() => openDetails(heroContent)}>
                            <Play size={20} fill="currentColor" />
                            Play
                        </button>
                        <button type="button" className="browse-info" onClick={() => openDetails(heroContent)}>
                            <Info size={20} />
                            More Info
                        </button>
                    </div>
                </div>
            </section>

            <main className="browse-main">
                {contentRows.map((row) => (
                    <MovieRow key={row.title} row={row} openDetails={openDetails} />
                ))}
            </main>

            <Footer />
        </div>
    );
};

export default HomeScreen;
