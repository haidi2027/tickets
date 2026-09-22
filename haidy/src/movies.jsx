import React from 'react'
import Footer from './footer'
import { useEffect, useState } from "react";
import { MDBBtn } from 'mdb-react-ui-kit';
import { useNavigate } from "react-router-dom";
import DotPattern from "../src/component/dotPattern";
import { motion } from 'framer-motion';


function Movies() {
  const [movies, setMovies] = useState([]);
  const API_KEY = "2896ad3a6adc84d2875375ea3a8062d8";
  const navigate = useNavigate();
  
  useEffect(() => {
    fetch(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&language=en-US`
  )
    .then((res) => res.json())
    .then((data) => setMovies(data.results))
    .catch((err) => console.log(err));
  }, []);
  


  return (
    <>
    <DotPattern
      glowColor="#ff0000"
      baseColor="#555555"
      gap={30}
      proximity={150}
      glowIntensity={1.5}
    />
    
    <div className='divs3' style={{minHeight:"200vh", marginBottom:"100px"}}>
    <div className='divs31' >
      
      {movies?.slice(0, 12).map((movie) => (
        <motion.div
          key={movie.id}
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount:0.7 }}
          className="divs32"
        >
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
        
      </motion.div>
    
      ))}
      
    </div> 
    </div>
    
    <Footer/>
    </>
  )
}

export default  Movies
