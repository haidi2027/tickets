import React from 'react'
import Footer from './footer'
import { MDBBtn } from 'mdb-react-ui-kit';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DotPattern from "../src/component/dotPattern";
import { motion } from 'framer-motion';

function Series() {
const [movies, setMovies] = useState([]);
const navigate = useNavigate();

  useEffect(() => {
    fetch(
      `https://api.tvmaze.com/shows`
    )
      .then((res) => res.json())
      .then((data) => setMovies(data))
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

    <div className='divs3'  style={{minHeight:"200vh", marginBottom:"100px"}} >
      <div className='divs31' >
      {movies?.slice(0 , 12).map((movie) => (
      
        <motion.div
          key={movie.id}
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount:0.7 }}
          className="divs32"
        >
          <div  className='divimg1'>
            <img
                src={movie.image?.medium || "https://via.placeholder.com/210x295?text=No+Image"}
                alt={movie.name}
            />
          </div>
          <div  className='divword1'>
            <h4><i>{ movie.name}</i></h4>
            <p>{movie.premiered?.split("-")[0]}</p>           
          </div>
          <div className='divbtn1'>
            <MDBBtn rounded className="mx-2" onClick={() => navigate(`/tvDetails/${movie.id}`)}> Show </MDBBtn>
            <div className='divbtn11'>
              <p>⭐ {movie.rating?.average?? "N/A"}</p>        
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

export default  Series
