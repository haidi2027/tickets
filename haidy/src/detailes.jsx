import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MDBBtn } from 'mdb-react-ui-kit';
import { useNavigate } from "react-router-dom";
import Footer from "./footer";
import DotPattern from "../src/component/dotPattern";
// import AOS from "aos";
// import "aos/dist/aos.css"
// import gsap from "gsap";

function Details() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [movies, setMovies] = useState([]);
  const API_KEY = "2896ad3a6adc84d2875375ea3a8062d8";
  const [cast, setCast] = useState([]);
  const navigate = useNavigate();
  

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMovie(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  useEffect(() => {
  fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`
  )
    .then((res) => res.json())
    .then((data) => setCast(data.cast))
    .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
      fetch(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => setMovies(data.results))
      .catch((err) => console.log(err));
    }, []);

    

  if (!movie) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
    <DotPattern
      glowColor="#ff0000"
      baseColor="#555555"
      gap={30}
      proximity={150}
      glowIntensity={1.5}
    />
    <div >
      <section className="section1">

        <div className="deimg">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title || movie.name}
            
          />
        </div>

        <div className="deword" >
          <h2 data-aos="fade-down">
            {movie.title || movie.name}
          </h2>

          <p  data-aos="fade-down"
            style={{color:"gray"}}>⭐️ {movie.vote_average} User Rating</p>

          <p data-aos="fade-down"
            style={{color:"gray"}}>{movie.overview}</p>
          <p data-aos="fade-down">
            {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m . {movie.genres?.map((genre) => genre.name).join(" | ")} . {(movie.release_date || movie.first_air_date)?.slice(0 ,4)}
          </p>
          
          <div className="debttn">
            <Link to={`/trailer4/${movie.id}`}>
              <MDBBtn color='danger' style={{width:"160px", boxShadow:"none"}}> Watch Trailer</MDBBtn>
            </Link>
            <Link to={`/booking/${movie.id}`}>
              <MDBBtn  style={{width:"160px", backgroundColor:"#26323cfe", color:"white", boxShadow:"none"}} > Buy Tickets</MDBBtn>
            </Link>
          </div>

        </div>

        
      </section>
      <div className="act">
        <h2 style={{zIndex: "20"}}>Actores</h2>
      </div>
      <div className="cast-container">
          {cast.slice(0, 4).map((actor) => (
            <div className="actor-card" key={actor.id}>
              <div className="img-actor">
                <img

                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                      : "https://via.placeholder.com/150x200?text=No+Image"
                  }
                  alt={actor.name}
                />
              </div>
              
            <div>
              <h6>{actor.name}</h6>
            </div>
            </div>
          ))}
      </div>
      
      <div className='divs3'style={{backgroundColor:"#06111f",marginBottom:"90px"}}>
        <div className="act">
          <h2>You May Also Like</h2>
        </div>
            <div className='divs31' >
            {movies?.slice(4, 8).map((movie) => (
      
        <div className="divs32" key={movie.id}>
      
          <div className="divimg1">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title || movie.name}
            />
          </div>
      
          <div className="divword1">
            <h5>
              <i>
                {(movie.title || movie.name || "").length > 25
                  ? (movie.title || movie.name).slice(0, 25)
                  : (movie.title || movie.name || "")}
              </i>
            </h5>
      
            <p>
              {(movie.release_date || movie.first_air_date || "").length > 4
                ? (movie.release_date || movie.first_air_date).slice(0, 4)
                : (movie.release_date || movie.first_air_date || "")}
            </p>
          </div>
      
          <div className="divbtn1">
      
            <MDBBtn rounded className="mx-2" onClick={() => navigate(`/detailes/${movie.id}`)}> Show </MDBBtn>
      
            <div className="divbtn11">
              <p>⭐️ {movie.vote_average}</p>
            </div>
      
          </div>
      
        </div>
      
          ))}
          </div> 
      
          </div>
          <Footer/>
    </div>
    
    </>
  );
  
}

export default Details;