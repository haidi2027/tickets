
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useNavigate } from "react-router-dom";
import './App.css';
import { Pagination, Navigation } from 'swiper/modules';
import { useEffect, useState } from "react";

function Secon() {
  const [theaters, setTheaters] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const seriesRes = await fetch(
          "https://www.omdbapi.com/?apikey=d1769896&s=Dark&type=movie"
        );

        const seriesData = await seriesRes.json();

        if (seriesData.Search) {
          const requests = seriesData.Search.map((item) =>
            fetch(
              `https://www.omdbapi.com/?apikey=d1769896&i=${item.imdbID}&plot=full`
            ).then((res) => res.json())
          );

          const details = await Promise.all(requests);
          setTheaters(details);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <Swiper
      navigation
      pagination={{ clickable: true }}
      modules={[Pagination, Navigation]}
      className="mySwiper"
    >
      {theaters.slice(0, 4).map((item) => (
        <SwiperSlide key={item.imdbID}>
          <div className="swiper-image" >
            <img className='swiper-images' src={item.Poster} alt={item.Title}  onClick={() => navigate(`/omdbDetails/${item.imdbID}`)}/>
          </div>

          <div className="herosection">
            <h1 className="divh1">{item.Title}</h1>
            <p>{item.Year}| {item.Rated}|{item.Genre}</p>
            <p className="divp">
                {item.Plot && item.Plot.length > 150
                ? item.Plot.slice(0, 250) + "..."
                : item.Plot}
            </p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Secon;