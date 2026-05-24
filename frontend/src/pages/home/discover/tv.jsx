import { useEffect, useState, useRef } from "react";
import { Info, Play, ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { useNavigate } from "react-router-dom";
import "../../movieTvDetails.css";
import "../../home/homescreen.css";

const TvRow = ({ title, items, onCardClick }) => {
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
                    {items.map((t) => (
                        <button key={t.id} className="browse-card" onClick={() => onCardClick(t)}>
                            <img src={`https://image.tmdb.org/t/p/w500${t.backdrop_path || t.poster_path}`} alt={t.name} />
                            <span className="card-title">{t.name}</span>
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

const DiscoverTvPage = () => {
    const [tvs, setTvs] = useState({
        trending: [],
        popular: [],
        topRated: [],
        airingToday: [],
    });
    const [heroCandidates, setHeroCandidates] = useState([]);
    const [heroIndex, setHeroIndex] = useState(0);
    const [heroTv, setHeroTv] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchAll = async () => {
            const API_KEY = "e2949b4ae590912c037da493c44407fc";
            const endpoints = {
                trending: `https://api.themoviedb.org/3/trending/tv/day?api_key=${API_KEY}`,
                popular: `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}`,
                topRated: `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}`,
                airingToday: `https://api.themoviedb.org/3/tv/airing_today?api_key=${API_KEY}`,
            };

            try {
                const results = {};
                for (const [key, url] of Object.entries(endpoints)) {
                    const res = await fetch(url);
                    const data = await res.json();
                    results[key] = data.results || [];
                }
                setTvs(results);
                const candidates = results.trending.filter(t => t.backdrop_path);
                setHeroCandidates(candidates);
                setHeroTv(candidates[0]);
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
            setHeroTv(heroCandidates[heroIndex]);
        }
    }, [heroIndex, heroCandidates]);

    if (!heroTv) return null;

    const handleCardClick = (t) => {
        navigate("/tvdetails", { state: { movie: t } });
    };

    return (
        <div className="details-page">
            <Navbar />
            <section className="details-hero">
                <img 
                    key={heroTv.id}
                    className="details-hero-image" 
                    src={`https://image.tmdb.org/t/p/original${heroTv.backdrop_path}`} 
                    alt={heroTv.name} 
                    style={{ animation: 'kenburns 20s infinite alternate, crossfade 1s ease-in-out' }}
                />
                <div className="details-hero-shade" />
                <div className="details-hero-content">
                    <span className="media-type">T V  S H O W S</span>
                    <h1>{heroTv.name}</h1>
                    <div className="details-actions">
                        <button className="details-play" onClick={() => handleCardClick(heroTv)}>
                            <Play fill="currentColor" /> Play
                        </button>
                        <button className="details-info" onClick={() => handleCardClick(heroTv)}>
                            <Info /> More Info
                        </button>
                    </div>
                    <div className="details-hero-meta">
                        <span className="rating">{heroTv.vote_average.toFixed(1)} Rating</span>
                        <span>{heroTv.first_air_date?.split("-")[0]}</span>
                        <span className="maturity">{heroTv.adult ? "18+" : "12+"}</span>
                        <span className="hd-badge">HD</span>
                    </div>
                    <p className="details-hero-overview truncate-2">{heroTv.overview}</p>
                </div>
            </section>

            <main className="browse-main" style={{ marginTop: '-10vh', position: 'relative', zIndex: 10 }}>
                <TvRow title="Trending TV Shows" items={tvs.trending} onCardClick={handleCardClick} />
                <TvRow title="Popular" items={tvs.popular} onCardClick={handleCardClick} />
                <TvRow title="Top Rated" items={tvs.topRated} onCardClick={handleCardClick} />
                <TvRow title="Airing Today" items={tvs.airingToday} onCardClick={handleCardClick} />
            </main>
            <Footer />
        </div>
    );
};

export default DiscoverTvPage;