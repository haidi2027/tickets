import React from 'react'
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Trailer1() {
    const [trailer, setTrailer] = useState(null);
    const { id } = useParams();
    const API_KEY = "2896ad3a6adc84d2875375ea3a8062d8";
    useEffect(() => {
        const fetchTrailer = async () => {
            try {
            const res = await fetch(
                `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`
            );

            const data = await res.json();

            const video = data.results.find(
                (item) =>
                item.type === "Trailer" &&
                item.site === "YouTube"
            );

            setTrailer(video);
            } catch (error) {
            console.log(error);
            }
        };

        fetchTrailer();
    }, [id]);
    return(
        <>
        {trailer && (
            <div className="trailer">
                <h2>Trailer</h2>

                <iframe
                width="100%"
                height="680"
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title="Movie Trailer"
                allowFullScreen
                ></iframe>
            </div>
        )}
        </>
    )
}

export default Trailer1
