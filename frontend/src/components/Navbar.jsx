import './navbar.css';
import { Link } from 'react-router-dom';
import { LogOut, Menu, Search } from 'lucide-react';
import { useAuthStore } from '../stores/authUser';
import { useContentStore } from '../stores/content';

const Navbar = () => {
    const { user, logout } = useAuthStore();
    const { contentType, setContentType } = useContentStore();

    return (
        <header className='header'>
            <div className="left-header-items">
                <Link to={"/"}>
                    <img src='/netflix-logo.png' alt='logo' className='header-logo' />
                </Link>
                <Link
                    className={`link ${contentType === "movie" ? "active" : ""}`}
                    to={"/movie" }
                    onClick={() => setContentType("movie")}
                >
                    Movies
                </Link>
                <Link
                    className={`link ${contentType === "tv" ? "active" : ""}`}
                    to={"/tv"}
                    onClick={() => setContentType("tv")}
                >
                    TV Shows
                </Link>
                <Link className='link' to={"/history"}> My List </Link>
            </div>
            <div className="right-header-items">
            <Link className='search-icon' to={"/search"}>
                <Search className='search-icon' /></Link>
                <img src={user.image} alt="Avatar" className='avatar' />
                <LogOut onClick={logout} className='logout-btn' />
                <Menu className='menu' />
            </div>
        </header>
    );
};

export default Navbar;
