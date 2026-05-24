import { useState } from 'react';
import './singup.css';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { useAuthStore } from '../stores/authUser';


//agar bychance token Appear na ho tab axiox se with credentials likh dena inthe handle signup function 


const SignUpPage = () => {
  const { searchParams } = new URL(document.location);
	const emailValue = searchParams.get("email");

	const [email, setEmail] = useState(emailValue || "");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const { signup, isSigningUp } = useAuthStore();

	const handleSignUp = (e) => {
		e.preventDefault();
		signup({ email, username, password });
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
            <h1>Sign Up</h1>
            <form onSubmit={handleSignUp}>
              <input
                type="text"
                placeholder='Username'
                id='username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder='Email'
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
              <button type="submit" className='Singup-btn' disabled={isSigningUp}>
                {isSigningUp ? "Signing Up..." : "Sign Up"}
              </button>
            </form>

            <div className='singn'>
              Already a member?{" "}
              <Link className='link-tag' to="/login">Sign in now</Link>
            </div>
            <p>This page is protected by Google reCAPTCHA to ensure you're not a bot. <Link to="#" className="link-tag">Learn more.</Link></p>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default SignUpPage;



