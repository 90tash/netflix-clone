import { Info, Play } from "lucide-react";
import { useEffect, useState } from "react";
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

const HomeScreen = () => {
    const [heroContent, setHeroContent] = useState(null);
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

                const heroCandidates = (payloads[0].results || []).filter((item) => item.backdrop_path);
                setHeroContent(heroCandidates[0] || null);
            } catch (error) {
                console.error("Error loading homepage content:", error);
            }
        };

        loadHomeContent();
    }, []);

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
                        <button type="button" className="browse-play">
                            <Play size={20} fill="currentColor" />
                            Play
                        </button>
                        <button type="button" className="browse-info">
                            <Info size={20} />
                            More Info
                        </button>
                    </div>
                </div>
            </section>

            <main className="browse-main">
                {contentRows.map((row) => (
                    <section className="browse-row" key={row.title}>
                        <h2>{row.title}</h2>
                        <div className="browse-slider">
                            {row.items.map((item) => (
                                <button
                                    type="button"
                                    className="browse-card"
                                    key={`${row.title}-${item.id}`}
                                    onClick={() => openDetails(item)}
                                >
                                    <img
                                        src={`${IMAGE_BASE}/w500${item.poster_path}`}
                                        alt={item.title || item.name || "Movie poster"}
                                    />
                                    <span>{item.title || item.name}</span>
                                </button>
                            ))}
                        </div>
                    </section>
                ))}
            </main>

            <Footer />
        </div>
    );
};

export default HomeScreen;
