import { useEffect, useState } from "react";
import {Link, useParams } from "react-router-dom";
import { MDBBtn } from 'mdb-react-ui-kit';
import { useNavigate } from "react-router-dom";
import DotPattern from "../src/component/dotPattern";
import Footer from "./footer";
function Detailess() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    fetch(`https://ghibliapi.vercel.app/films/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("MOVIE:", data);
        setMovie(data);
      })
      .catch((err) => {
        console.log("ERROR:", err);
      });
  }, [id]);
  
  useEffect(() => {
    fetch("https://ghibliapi.vercel.app/films")
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch((err) => console.log(err));
  }, []);

  if (!movie) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <DotPattern
        glowColor="#ff0000"
        baseColor="#555555"
        gap={30}
        proximity={150}
        glowIntensity={1.5}
      />

      <section className="section1">

        <div className="deimg">
          <img src={movie.image} alt={movie.title} width="300"/>
        </div>

        <div className="deword">
          <h1>{movie.title}</h1>

          <p style={{color:"gray"}}>⭐️ {movie.rt_score} User Rating</p>

          <p style={{color:"gray"}}>{movie.description}</p>
          <p>
            {movie.running_time}m  . {movie.director} . {movie.release_date?.slice(0 ,4)}
          </p>
          
          <div className="debttn">
            <Link to={`/booking3/${movie.id}`}>
              <MDBBtn  style={{width:"160px", backgroundColor:"#26323cfe", color:"white", boxShadow:"none"}} > Buy Tickets</MDBBtn>
            </Link>
          </div>

        </div>
        
      </section>
      <div className="divs3" style={{marginBottom:"90px"}} >
        <div className="act">
          <h2>You May Also Like</h2>
        </div>
        <div className="divs31">
          {movies.slice(0, 4).map((movie) => (
            <div className="divs32" key={movie.id}>
              <div className="divimg1">
                <img
                  src={
                    movie.image ||
                    "https://via.placeholder.com/210x295?text=No+Image"
                  }
                  alt={movie.title}
                />
              </div>

              <div className="divword1">
                <h5>
                  <i>{movie.title}</i>
                </h5>

                <p>
                  {movie.release_date}
                </p>
              </div>

              <div className="divbtn1">
                <MDBBtn
                    rounded
                    className="mx-2"
                    onClick={() => navigate(`/detailess/${movie.id}`)}>
                    Show
                  </MDBBtn>
                <div className='divbtn11'>
                  <p>⭐ {movie.rt_score}</p>        
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
  
    </div>



    
  );
}

export default Detailess;