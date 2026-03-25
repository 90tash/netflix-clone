import React, { useState, useEffect } from 'react';
import './authScreen.css';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';

const AuthSreen = () => {

    const [email, setEmail] = useState("");  // Fixed: default value is an empty string
    const [popularMovies, setPopularMovies] = useState([]);
   
    const [popularIndex, setPopularIndex] = useState(0);

    const handlePopularLeftClick = () => {
        setPopularIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };

    const handlePopularRightClick = () => {
        setPopularIndex((prevIndex) =>
            Math.min(prevIndex + 1, popularMovies.length - 6)
        );
    };

    useEffect(() => {
        localStorage.setItem('contentType', 'movies');  // Fixed: added key-value pair
        fetchPopularMovies();
    }, []);

    const navigate = useNavigate();

    const handleFormSubmit = (e) => {
        e.preventDefault();
        navigate("/signup?email=" + email);
    };

    const handleClickButton = (e) => {
        e.preventDefault();
        navigate("/login");
    };

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

    return (
        <div className='body'>
            <div className="home">
                <div className="navbar">
                    <div className="left-navbar-items"><img src="netflix-logo.png" alt="" /></div>
                    <div className="right-navbar-items">
                        <select className='language'>
                            <option className='language-icon' value="English">  English</option>
                            <option value="Hindi">  Hindi</option>
                        </select>
                        <button onClick={handleClickButton} className='singin-btn'>
                            Singin
                        </button>
                    </div>
                </div>
                <div className="content-advertisment-details">
                    <h1>Unlimited movies, TV shows and more</h1>
                    <p>Starts at ₹149. Cancel at any time</p>
                    <span>Ready to watch? Enter your email to create or restart your membership.</span>
                </div>

                <form onSubmit={handleFormSubmit} className='sigup-btn-block'>
                    <input className='emailaddress-input' type="text" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <button className='singup-btn'>Get Started <img src="https://img.icons8.com/?size=100&id=9432&format=png&color=000000" alt="" /></button>
                </form>

                <div id="c">
                    <div id="b"></div>
                </div>
                <div className="trending-contents">
                    {/* You can add content here */}
                </div>
            </div>
            <div className="trending-movies">
                <h2 className="tittle-22">Upcoming Movies </h2>
                <div className="content-container2">
                    {popularIndex > 0 && (
                        <button className="scroll-btn left" onClick={handlePopularLeftClick}>
                            &lt;
                        </button>
                    )}
                    <div className="movie-card-block">
                        {popularMovies.slice(popularIndex, popularIndex + 6).map((movie) => (
                            <div key={movie.id} className="card">
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
                <div className="benifit-netflix">
                    <h1>More reasons to join</h1>
                    <div className="benift-block">
                        <div className="benifitblocks"><h1>Enjoy on your TV</h1><p>Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.</p></div>
                        <div className="benifitblocks"><h1>Download your shows to watch offline</h1><p>Save your favourites easily and always have something to watch.</p></div>
                        <div className="benifitblocks"><h1>Watch everywhere</h1><p>Stream unlimited movies and TV shows on your phone, tablet, laptop and TV.</p></div>
                        <div className="benifitblocks"><h1>Create profiles for kids</h1><p>Send kids on adventures with their favourite characters in a space made just for them — free with your membership.</p></div>
                    </div>
                </div>
                <div className="frequently-aksed-question">
                    <h1>Frequently Asked Questions</h1>
                    <div className="questions"><p>What is Netflix?</p> <img src="https://img.icons8.com/?size=100&id=96645&format=png&color=000000" alt="" /></div>
                    <div className="questions"><p>What is Netflix?</p> <img src="https://img.icons8.com/?size=100&id=96645&format=png&color=000000" alt="" /></div>
                    <div className="questions"><p>What is Netflix?</p> <img src="https://img.icons8.com/?size=100&id=96645&format=png&color=000000" alt="" /></div>
                    <div className="questions"><p>What is Netflix?</p> <img src="https://img.icons8.com/?size=100&id=96645&format=png&color=000000" alt="" /></div>
                    <div className="questions"><p>What is Netflix?</p> <img src="https://img.icons8.com/?size=100&id=96645&format=png&color=000000" alt="" /></div>
                    <div className="questions"><p>What is Netflix?</p> <img src="https://img.icons8.com/?size=100&id=96645&format=png&color=000000" alt="" /></div>
                    {/* More questions */}
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default AuthSreen;
