import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


import "./peopleDetails.css";

const PeopleDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const person = location.state?.movie || location.state?.person;
  // Passed from SearchPage

  const [details, setDetails] = useState(null);
  const [credits, setCredits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  


  useEffect(() => {
    if (!person) return;

    const fetchDetails = async () => {
      try {
        setIsLoading(true);

        // Fetch person details
        const detailsResponse = await fetch(
          `https://api.themoviedb.org/3/person/${person.id}?api_key=e2949b4ae590912c037da493c44407fc`
        );
        const detailsData = await detailsResponse.json();

        // Fetch person credits (movies and TV shows)
        const creditsResponse = await fetch(
          `https://api.themoviedb.org/3/person/${person.id}/combined_credits?api_key=e2949b4ae590912c037da493c44407fc`
        );
        const creditsData = await creditsResponse.json();

        setDetails(detailsData);
        setCredits(creditsData.cast); // Movies and TV shows
      } catch (error) {
        console.error("Error fetching person details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [person]);
 

  const handleCreditClick = (movie) => {
    if (movie.media_type === "movie") {
      navigate("/moviedetails", { state: { movie, type: "movie" } });
    } else if (movie.media_type === "tv") {
      navigate("/tvdetails", { state: { movie, type: "tv"} });
    }
    window.location.reload();
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <Navbar className='header' />

      <div className="viewcontentblock">
        <div className="maincontent">
          {details.profile_path && (
            <img
              src={`https://image.tmdb.org/t/p/original${details.profile_path}`}
              alt={details.name}
              className="person-image"
            />
          )}
        </div>

        <div className="whiteborder1"></div>
        <div className="whiteborder21"></div>

        <div className="main1">
          {details.profile_path && (
            <img
              src={`https://image.tmdb.org/t/p/original${details.profile_path}`}
              alt={details.name}
              className="person-image"
            />
          )}
          <div className="leftblur1"></div>
          <div className="bottomblur"></div>

          <div className="round"></div>
          <div className="content-title1">
            <h1 className="tittle">{details.name}</h1>
          </div>
        </div>

        <div className="detailsofpeople">
          <h1 className="tittle">{details.name}</h1>
          <h3 className="gender">
            <b>Gender:</b> {details.gender === 2 ? "Male" : "Female"}
          </h3>
          <h2 className="gender">
            <b>Date of Birth:</b> {details.birthday}
          </h2>
          {details.deathday && (
            <h4 className="gender">
              <b>Death Day:</b> {details.deathday}
            </h4>
          )}
          <h3 className="gender">
            <b>Place of Birth:</b> {details.place_of_birth}
          </h3>
          <h3 className="gender">
            <b>Profession:</b> {details.known_for_department}
          </h3>
          <h3 className="gender1">Biography</h3>
          <p className="overview">{details.biography || "Biography not available."}</p>
        </div>
      </div>

      <div className="people-details">
        <h2 className="tittle">Movies & TV Shows</h2>
        <div className="credits-list">
          {credits
            .filter((credit) => credit.poster_path) // Only show credits with a poster
            .map((credit) => (
              <div
                key={credit.id}
                className="credit-card"
                onClick={() => handleCreditClick(credit)}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${credit.poster_path}`}
                  alt={credit.title || credit.name}
                  className="credit-image"
                />
                <p className="credit-title">{credit.title || credit.name}</p>
              </div>
            ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default PeopleDetails;
