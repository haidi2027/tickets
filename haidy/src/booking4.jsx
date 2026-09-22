
import { useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
function Booking4() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const API_KEY = "d1769896";
    const [selectedSeats, setSelectedSeats] = useState([]);

    const rows = ["A", "B", "C", "D", "E", "F"];

    const seatsPerRow = 9;

    // كراسي محجوزة مسبقًا
    const reservedSeats = ["A3", "B6", "C2", "D5", "E7"];

    const toggleSeat = (seatId) => {
        // لو الكرسي محجوز، ممنوع اختياره
        if (reservedSeats.includes(seatId)) return;

        setSelectedSeats((prev) => {
            if (prev.includes(seatId)) {
                return prev.filter((seat) => seat !== seatId);
            }

            return [...prev, seatId];
        });
    };

    const price = 150;
    const totalPrice = selectedSeats.length * price;
    
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
    
    if (!movie) {
    return <h2>Loading...</h2>;
    }

    return (
    <div className="booking-page">
        
                <div className="screen">
                    <img src={movie.Poster} alt={movie.Title}/>
                </div>

                <div
                    className={`booking-layout ${
                        selectedSeats.length > 0 ? "has-summary" : ""
                    }`}
                >

            <div className="seats-container">
                {/* Seats */}
                {rows.map((row) => (
                    <div className="seat-row" key={row}>

                        <span className="row-name">{row}</span>

                        {Array.from(
                            { length: seatsPerRow },
                            (_, index) => {

                                const seatNumber = index + 1;
                                const seatId = `${row}${seatNumber}`;

                                const isReserved =
                                    reservedSeats.includes(seatId);

                                const isSelected =
                                    selectedSeats.includes(seatId);

                                return (
                                    <button
                                        key={seatId}
                                        className={
                                            `seat
                                            ${isReserved ? "reserved" : ""}
                                            ${isSelected ? "selected" : ""}`
                                        }
                                        onClick={() =>
                                            toggleSeat(seatId)
                                        }
                                        disabled={isReserved}
                                    >
                                        <span className="seat-back"></span>

                                        <span className="seat-number">
                                            {seatNumber}
                                        </span>
                                    </button>
                                );
                            }
                        )}

                        <span className="row-name">{row}</span>

                    </div>
                ))}

                {/* Legend */}
                <div className="legend">

                    <div>
                        <span className="legend-seat available"></span>
                        Available
                    </div>

                    <div>
                        <span className="legend-seat selected"></span>
                        Selected
                    </div>

                    <div>
                        <span className="legend-seat reserved"></span>
                        Reserved
                    </div>

                </div>

            </div>


            {/* Booking Summary */}
            <div
                className={`booking-summary ${
                    selectedSeats.length > 0 ? "show" : ""
                }`}
            >
                <h2>Booking Summary</h2>

                <p>
                    Selected seats:
                    <strong>
                        {selectedSeats.length > 0
                            ? selectedSeats.join(", ")
                            : " None"}
                    </strong>
                </p>

                <p>
                    Number of seats:
                    <strong>{selectedSeats.length}</strong>
                </p>

                <p>
                    Total:
                    <strong>{totalPrice} EGP</strong>
                </p>
                <p>
                    Film:
                    <strong>{movie.Title}</strong>
                </p>

                <button
                    className="confirm-btn"
                    disabled={selectedSeats.length === 0}
                    onClick={() => alert("Booking confirmed!")}
                >
                    Confirm Booking
                </button>
                </div>

        </div>

    </div>
);
}

export default Booking4;