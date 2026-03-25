import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/home/HomePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage';
import MovieDetails from './pages/MovieDetails';
import TvDetails from './pages/TvDetails';
import PeopleDetails from './pages/PeopleDetails';
import Tv from './pages/home/discover/tv';
 import Movie from './pages/home/discover/movie';
 import SearchPage from './pages/home/discover/search';

import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './stores/authUser';
import { useEffect } from 'react';
import { Loader } from 'lucide-react';

function App() {

  const { user, isCheckingAuth, authCheck } = useAuthStore();


  console.log(" auth user is here:", user);


  useEffect(() => {
    authCheck();
  }, [authCheck]);

  if (isCheckingAuth) {
    return (
      <div className="loading-page">
        <div className="loading-block">
          <Loader className='loader' />
        </div>
      </div>
    );
  }


  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={!user ? <LoginPage /> : <Navigate to={"/"} />} />
				<Route path='/signup' element={!user ? <SignUpPage /> : <Navigate to={"/"} />} />
        <Route path="/tvdetails" element={!user ? <LoginPage/> :<TvDetails />} />
        <Route path="/moviedetails" element={!user ? <LoginPage/> :<MovieDetails />} />
        <Route path="/tv" element={!user ? <LoginPage/> :<Tv/>} />
         <Route path="/movie" element={!user ? <LoginPage/> :< Movie/>} /> 
         <Route path="/search" element={!user ? <LoginPage/> :< SearchPage/>} /> 
        <Route path="/peopledetails" element={!user?<LoginPage/>:<PeopleDetails />} />

      </Routes>
      <Toaster />
    </>

  );
}

export default App;
