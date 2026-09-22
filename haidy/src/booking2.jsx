
import { useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
function Booking2() {
    const { id } = useParams();
    const [show, setShow] = useState(null);
    // const API_KEY = "2896ad3a6adc84d2875375ea3a8062d8";
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
        fetch(`https://api.tvmaze.com/shows/${id}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setShow(data);
            })
            .catch((err) => console.log(err));
    }, [id]);

    if (!show) {
    return <h2>Loading...</h2>;
    }

    return (
    <div className="booking-page">
        
                <div className="screen">
                    <img src={show.image?.original} alt={show.name} />
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
                    <strong>{show.title || show.name}</strong>
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

export default Booking2;