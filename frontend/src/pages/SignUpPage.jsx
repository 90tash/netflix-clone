import { useState } from 'react';
import './singup.css';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { useAuthStore } from '../stores/authUser';


//agar bychance token Appear na ho tab axiox se with credentials likh dena inthe handle signup function 


const SingUpPage = () => {
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
        <div className="navbar">
          <div className="left-navbar-items">
          <Link to={"/"}>
					<img src='/netflix-logo.png' alt='logo' className='logo' />
				</Link>
          </div>
        </div>

        <div className="singin-block">
          <div className="inside-singin-block">
            <h1>Sign Up</h1>
            <form onSubmit={handleSignUp}>
              <label htmlFor='email' className='lable'>Email</label>
              <input
                type="email"
                placeholder='ex: you@example.com'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor='username' className='lable'>Username</label>
              <input
                type="text"
                placeholder='ex: nishant_dev'
                id='username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <label htmlFor='password' className='lable'>Password</label>
              <input
                type="password"
                placeholder='• • • • • • •'
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit" className='Singup-btn'>Sign Up</button>
            </form>

     

            <div className='singn'>
              Already a Member?{" "}
              <Link className='link-tag' to="/login">Sign In</Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SingUpPage;




