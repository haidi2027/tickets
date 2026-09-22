import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MDBBtn } from 'mdb-react-ui-kit';
import { useNavigate } from "react-router-dom";
import DotPattern from "../src/component/dotPattern";
import Footer from "./footer";
function OMDBDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const API_KEY = "d1769896";
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        fetch(
            `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`
        )
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setMovie(data);
            })
            .catch((err) => console.log(err));
    }, [id]);
    
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
                    <img src={movie.Poster} alt={movie.Title}/>
                </div>

                <div className="deword">
                    <h1>{movie.Title}</h1>

                    <p style={{ color: "gray" }}>⭐️ {movie.imdbRating} User Rating</p>

                    <p style={{ color: "gray" }}>
                        {movie.Plot && movie.Plot.length > 150
                        ? movie.Plot.slice(0, 400) + "..."
                        : movie.Plot}
                    </p>
                    <p>
                        {movie.Runtime}m  . {movie.Genre} . {movie.Year?.slice(0, 4)}
                    </p>

                    <div className="debttn">
                        <Link to={`/trailer1/${movie.imdbID}`}>
                            <MDBBtn color='danger' style={{ width: "160px", boxShadow: "none" }}> Watch Trailer</MDBBtn>
                        </Link>
                        <Link to={`/booking4/${movie.imdbID}`}>
                            <MDBBtn  style={{width:"160px", backgroundColor:"#26323cfe", color:"white", boxShadow:"none"}} > Buy Tickets</MDBBtn>
                        </Link>
                    </div>

                </div>

            </section>
            <div className="act" style={{margin:"150px  0 0 0"}}>
                <h2 style={{zIndex: "20"}}>You May Also Like</h2>
            </div>
            <div className="herosec"></div>
                <div className='secosec'>
                        <div className='divs2'>
                        {movies?.slice(0, 4).map((movie) => (
                                <div className='divs21' key={movie.imdbID}>
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
                                </div>
                        ))}   
                        </div>
                </div>
        < Footer/>
        </div>

    );
}

export default OMDBDetails;