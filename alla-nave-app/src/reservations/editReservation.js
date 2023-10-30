// EditReservation.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditReservation() {
    const urlBase = "http://localhost:8081/alla-nave/reservations";
    let navegacion = useNavigate();
    const { idReservation } = useParams();

    const [reservation, setReservation] = useState({
        nameUser: "",
        party: "",
        time: "",
        reservationDate: "",
        observations: "",
        confirmation: false, //Initially is false so 24 hs before th owner can confirm with the costumer the reservation
    });

    const { nameUser, party, time, reservationDate, observations, confirmation } = reservation;

    useEffect(() => {
        loadReservation();
    }, []);

    const loadReservation = async () => {
        const resultado = await axios.get(`${urlBase}/${idReservation}`);
        const reservationData = resultado.data;
        setReservation({
            nameUser: reservationData.nameUser,
            party: reservationData.party,
            time: reservationData.time,
            reservationDate: reservationData.reservationDate,
            observations: reservationData.observations,
            confirmation: reservationData.confirmation,
        });
    }

    const onInputChange = (e) => {
        if (e.target.type === 'checkbox') {
            setReservation({ ...reservation, [e.target.name]: e.target.checked });
        } else {
            setReservation({ ...reservation, [e.target.name]: e.target.value });
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        // verify if the reservation is not bigger than 15 people
        if (party <= 15) {
            await axios.put(`${urlBase}/${idReservation}`, reservation);
            // Redirigimos a la página de inicio
            navegacion('/reservat');
        } else {
            // Shows the error in case is more than 15 
            alert("La reserva supera el límite de 15 personas. Por favor, ajusta el número de personas.");
        }
    }

    return (
        <div className="container">
            <div className="container text-center" style={{ margin: "30px" }}>
                <h3 style={{ color: 'white' }}>Edit Reservation</h3>
            </div>

            <form onSubmit={(e) => onSubmit(e)}>
                <div className="mb-3">
                    <label htmlFor="nameUser" className="form-label" style={{ color: 'white' }}>Customer Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nameUser"
                        name="nameUser"
                        required={true}
                        value={nameUser}
                        onChange={(e) => onInputChange(e)}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="party" className="form-label" style={{ color: 'white' }}>Party</label>
                    <input
                        type="number"
                        className="form-control"
                        id="party"
                        name="party"
                        required={true}
                        value={party}
                        onChange={(e) => onInputChange(e)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="time" className="form-label" style={{ color: 'white' }}>Time</label>
                    <select
                        className="form-select"
                        id="time"
                        name="time"
                        value={time}
                        onChange={(e) => onInputChange(e)}
                    >
                        <option value="dinner">Dinner</option>
                        <option value="lunch">Lunch</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="reservationDate" className="form-label" style={{ color: 'white' }}>Date</label>
                    <input
                        type="date"
                        className="form-control"
                        id="reservationDate"
                        name="reservationDate"
                        value={reservationDate}
                        onChange={(e) => onInputChange(e)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="observations" className="form-label" style={{ color: 'white' }}>Observations</label>
                    <input
                        type="text"
                        className="form-control"
                        id="observations"
                        name="observations"
                        value={observations}
                        onChange={(e) => onInputChange(e)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmation" className="form-label" style={{ color: 'white' }}>Confirmation</label>
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="confirmation"
                        name="confirmation"
                        checked={confirmation}
                        onChange={(e) => onInputChange(e)}
                    />
                </div>

                <div className="text-center">
                    <button type="submit" className="btn btn-warning btn-sm me-3">Update Changes</button>
                    <a href='/reservat' className="btn btn-danger btn-sm">Return</a>
                </div>
            </form>
        </div>
    );
}
