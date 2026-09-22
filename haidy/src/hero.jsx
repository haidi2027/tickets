import React from 'react'
import { MDBBtn } from 'mdb-react-ui-kit';
import { GoTriangleRight } from "react-icons/go";
import { useEffect, useState } from "react";
import {Link }from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import DotPattern from "../src/component/dotPattern";
import { motion } from 'framer-motion';

function Hero() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
  const fetchData = async () => {
    try {
      // Batman Movies
      const movieRes = await fetch(
        "https://www.omdbapi.com/?apikey=d1769896&s=batman"
      );

      const movieData = await movieRes.json();

      if (movieData.Search) {
        setMovies(movieData.Search);
      }
    } catch (error) {
      console.log(error);
    }
  };

  fetchData();
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
    
    <div className="herosec"></div>
      <div className='secosec'>
          <div className='divs'>
              <div><h2>Now Showing</h2></div>
              <div className='adiv'><Link to="/movies" className='link'>Viwe All  <GoTriangleRight style={{position: 'absolute', top: '18px', right: '105px'}} /></Link> </div>
          </div>
            <div className='divs2'>
            {movies?.slice(0, 4).map((movie) => (
              <motion.div
                key={movie.imdbID}
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, amount:0.7 }}
                className='divs21'
              >
              <div  className='divimg'>
                            <img src={movie.Poster} alt={movie.Title} width="150" />
                        </div>
                        <div  className='divword'>
                            <h5>{movie.Title} .</h5>
                            <p>{movie.Year}</p>
                                      
                        </div>
                        <div className='divbtn'>
                          <MDBBtn rounded color='danger' className="mx-2" onClick={() => navigate(`/omdbDetails/${movie.imdbID}`)}> Show </MDBBtn>
                        </div>
                    </motion.div>
            ))}   
            </div>
    </div>
    </>
);
}

export default Hero