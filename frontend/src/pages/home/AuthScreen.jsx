import { useEffect, useState } from "react";
import "./authScreen.css";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/authUser";

const TMDB_API_KEY = "e2949b4ae590912c037da493c44407fc";

const benefits = [
    {
        title: "Enjoy on your TV",
        text: "Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.",
    },
    {
        title: "Download your shows",
        text: "Save your favourites easily and always have something ready to watch.",
    },
    {
        title: "Watch everywhere",
        text: "Stream movies and TV shows on your phone, tablet, laptop and TV.",
    },
    {
        title: "Create profiles for kids",
        text: "Let kids explore family-friendly entertainment in their own profile.",
    },
];

const faqs = [
    {
        question: "What is Netflix?",
        answer: "Netflix is a streaming service with movies, shows, documentaries and more across many devices.",
    },
    {
        question: "How much does Netflix cost?",
        answer: "Plans start at Rs. 149 per month in India and vary based on the screen quality and devices you choose.",
    },
    {
        question: "Where can I watch?",
        answer: "You can watch on supported phones, tablets, laptops, TVs and streaming devices.",
    },
    {
        question: "How do I cancel?",
        answer: "Netflix is flexible, so users can start or stop their membership online.",
    },
    {
        question: "What can I watch on Netflix?",
        answer: "The service includes movies, series, anime, documentaries, originals and more.",
    },
    {
        question: "Is Netflix good for kids?",
        answer: "Kids profiles are designed to give younger viewers a separate space for age-appropriate entertainment.",
    },
];

const AuthScreen = () => {
    const [email, setEmail] = useState("");
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [openFaq, setOpenFaq] = useState(null);
    const navigate = useNavigate();
    const { startDemo } = useAuthStore();

    useEffect(() => {
        localStorage.setItem("contentType", "movie");
        fetchTrendingMovies();
    }, []);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        startDemo(email);
        navigate("/");
    };

    const handleSignIn = () => {
        navigate("/login");
    };

    const fetchTrendingMovies = async () => {
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/trending/all/day?language=en-US&api_key=${TMDB_API_KEY}`
            );
            const data = await response.json();
            const posterResults = (data.results || []).filter((item) => item.poster_path);
            setTrendingMovies(posterResults.slice(0, 10));
        } catch (error) {
            console.error("Error fetching trending content:", error);
        }
    };

    return (
        <div className="auth-page">
            <section className="auth-hero">
                <header className="auth-navbar">
                    <img src="/netflix-logo.png" alt="Netflix" className="auth-logo" />
                    <div className="auth-nav-actions">
                        <select className="language-select" aria-label="Select language">
                            <option value="English">English</option>
                            <option value="Hindi">Hindi</option>
                        </select>
                        <button type="button" onClick={handleSignIn} className="signin-button">
                            Sign In
                        </button>
                    </div>
                </header>

                <div className="hero-content">
                    <h1>Unlimited movies, shows, and more</h1>
                    <p>Starts at Rs. 149. Cancel at any time.</p>
                    <span>Ready to watch? Enter your email to create or restart your membership.</span>
                    <form onSubmit={handleFormSubmit} className="email-cta">
                        <input
                            type="email"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <button type="submit">Get Started</button>
                    </form>
                </div>
            </section>

            <main className="landing-content">
                <section className="landing-section">
                    <h2>Trending Now</h2>
                    <div className="trending-row">
                        {trendingMovies.map((movie, index) => (
                            <article className="trending-card" key={`${movie.id}-${movie.media_type || "movie"}`}>
                                <span>{index + 1}</span>
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={movie.title || movie.name || "Trending title"}
                                />
                            </article>
                        ))}
                    </div>
                </section>

                <section className="landing-section">
                    <h2>More reasons to join</h2>
                    <div className="benefit-grid">
                        {benefits.map((benefit) => (
                            <article className="benefit-card" key={benefit.title}>
                                <h3>{benefit.title}</h3>
                                <p>{benefit.text}</p>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="landing-section faq-section">
                    <h2>Frequently Asked Questions</h2>
                    <div className="faq-list">
                        {faqs.map((faq, index) => (
                            <div className="faq-item" key={faq.question}>
                                <button
                                    type="button"
                                    className="faq-question"
                                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                >
                                    <span>{faq.question}</span>
                                    <span className="faq-plus">{openFaq === index ? "-" : "+"}</span>
                                </button>
                                {openFaq === index && <p className="faq-answer">{faq.answer}</p>}
                            </div>
                        ))}
                    </div>
                </section>

                <section className="bottom-cta">
                    <p>Ready to watch? Enter your email to create or restart your membership.</p>
                    <form onSubmit={handleFormSubmit} className="email-cta">
                        <input
                            type="email"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <button type="submit">Get Started</button>
                    </form>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default AuthScreen;
