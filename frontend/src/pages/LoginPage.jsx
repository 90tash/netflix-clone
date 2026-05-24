import { Link } from 'react-router-dom';
import { useState } from 'react';
import './login.css';
import Footer from '../components/Footer';
import { useAuthStore } from '../stores/authUser';

const LoginPage = () => {

 const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const {login}= useAuthStore();

  const handleSignIn = (e) =>{
    e.preventDefault();
   login({email,password});

  };

  return (
    <div className="body">
      <div className="home">
        <header className="navbar">
          <Link to={"/"}>
            <img src='/netflix-logo.png' alt='Netflix' className='logo' />
          </Link>
        </header>

        <main className="singin-block">
          <div className="inside-singin-block">
            <h1>Sign In</h1>
            <form onSubmit={handleSignIn}>
              <input 
                type="email" 
                placeholder='Email or phone number' 
                id='email' 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
              <input 
                type="password" 
                placeholder='Password' 
                id='password' 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
              <button type="submit" className='login-btn'>Sign In</button>
            </form>
            <div className='singn'>
              New to Netflix?
              <Link className='link-tag' to={"/signup"}>Sign up now</Link>
            </div>
            <p>This page is protected by Google reCAPTCHA to ensure you're not a bot. <Link to="#" className="link-tag">Learn more.</Link></p>
          </div>
        </main>
      </div>
      <Footer/>
    </div>
  )
}

export default LoginPage;