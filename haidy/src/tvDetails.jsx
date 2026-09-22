import { useEffect, useState } from "react";
import {Link, useParams } from "react-router-dom";
import { MDBBtn } from 'mdb-react-ui-kit';
import { useNavigate } from "react-router-dom";
import Footer from "./footer";
import DotPattern from "../src/component/dotPattern";
function TVDetails() {
    const { id } = useParams();
    const [show, setShow] = useState(null);
    const [cast, setCast] = useState([]);
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`https://api.tvmaze.com/shows/${id}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setShow(data);
            })
            .catch((err) => console.log(err));
    }, [id]);
    useEffect(() => {
            fetch(
            `https://api.tvmaze.com/shows`
            )
            .then((res) => res.json())
            .then((data) => setMovies(data))
            .catch((err) => console.log(err));
        }, []);
    useEffect(() => {
        fetch(`https://api.tvmaze.com/shows/${id}/cast`)
            .then((res) => res.json())
            .then((data) => setCast(data))
            .catch((err) => console.log(err));
    }, [id]);

    if (!show) {
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
                    <img src={show.image?.original} alt={show.name} />
                </div>

                <div className="deword">
                    <h2>{show.name}</h2>

                    <p style={{ color: "gray" }}>⭐️ {show.rating?.average || "N/A"} User Rating</p>

                    <p style={{ color: "gray" }} dangerouslySetInnerHTML={{
                        __html: show.summary&& show.summary.length > 150
                        ? show.summary.slice(0, 400) + "..."
                        : show.summary || "No description available",
                    }}
                    />
                    <p>
                        {show.runtime || show.averageRuntime || "N/A"} m . {show.genres?.join(" | ")} . {show.premiered?.split("-")[0]}
                    </p>

                    <div className="debttn">
                        <Link to={`/booking2/${show.id}`}>
                            <MDBBtn  style={{width:"160px", backgroundColor:"#26323cfe", color:"white", boxShadow:"none"}} > Buy Tickets</MDBBtn>
                        </Link>
                    </div>

                </div>

            </section>
            <div className="act">
                <h2>Actores</h2>
            </div>
            <div className="cast-container">
                {cast.slice(0, 4).map((actor) => (
                    <div className="actor-card" key={actor.person.id}>
                        <div className="img-actor">
                            <img src={actor.person.image?.medium ||"https://via.placeholder.com/150x200?text=No+Image"}
                                alt={actor.person.name}
                            />
                        </div>
                        <div>
                            <h6>{actor.person.name}</h6>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className='divs3' style={{marginBottom:"90px"}}>
                <div className="act">
                    <h2>You May Also Like</h2>
                </div>
                <div className='divs31' >
                {movies?.slice(0 , 4).map((movie) => (
                
                    <div className='divs32' key={movie.id}>
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
                    </div>
                    
                ))}  
                </div> 
            </div>
        <Footer/>
        </div>
    );
}

export default TVDetails;