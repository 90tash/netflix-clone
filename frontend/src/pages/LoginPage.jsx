import { Link } from 'react-router-dom';
import { useState } from 'react';
import './login.css';
import Footer from '../components/Footer';
import { useAuthStore } from '../stores/authUser';

const LoginPage = () => {

 const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const {login}= useAuthStore();

  const handleSingIn = (e) =>{
    e.preventDefault();
   login({email,password});

  };

  return (
    <div className="body">
      <div className="home">
        <div className="navbar">
          <div className="left-navbar-items"><Link to={"/"}>
					<img src='/netflix-logo.png' alt='logo' className='logo' />
				</Link></div>

        </div>


        <div className="singin-block">
          <div className="inside-singin-block">
            <h1>Sign In</h1>
            <form onSubmit={handleSingIn}>
            <label htmlFor='email' className='lable'>Email</label>
            <input type="email" placeholder='ex: you@example.com' id='email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <label htmlFor='password' className='lable'>Password</label>
            <input type="password" placeholder='• • • • • • •' id='password' value={password} onChange={(e) => setPassword(e.target.value)} />
              <button className='login-btn'>Sign In</button>
              <p>OR</p>
            </form>
            <div className='singn'>
              Don't have an account?{"  "}
              <Link className='link-tag' to={"/signup"}>Sing Up</Link>
            </div>
            <p>This page is protected by Google reCAPTCHA to ensure you're not a bot. </p>

          </div>
        </div>

      </div>
      <Footer/>
    </div>
  )
}

export default LoginPage;