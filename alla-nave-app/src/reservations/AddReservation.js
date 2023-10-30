import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AddReservation() {
    const navigate = useNavigate();

    const [reservation, setReservation] = useState({
        email: '',
        party: '',
        time: '',
        reservationDate: '',
        observations: '',
        confirmation: false,
    });

    const [errorMessage, setErrorMessage] = useState('');

    const { email, party, time, reservationDate, observations, confirmation } = reservation;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReservation({ ...reservation, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (party <= 40) {
            try {
                const response = await axios.post('http://localhost:8081/alla-nave/reservations', reservation);
                navigate('/reservat');
            } catch (error) {
                if (error.response && error.response.data && error.response.data.message) {
                    setErrorMessage(error.response.data.message);
                } else {
                    setErrorMessage('An unknown error occurred.');
                    console.error('Unknown error:', error);
                }
            }
        } else {
            setErrorMessage('The reservation exceeds the limit of 40 people. Please adjust the number of people.');
            console.log();
        }
    };

    return (
        <div className="container">
            <div className="container text-center" style={{ margin: '30px' }}>
                <h3>Add Reservation</h3>
            </div>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label" style={{ color: 'white' }}>
                        Customer
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="email"
                        name="email"
                        required={true}
                        value={email}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="party" className="form-label" style={{ color: 'white' }}>
                        Party
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="party"
                        name="party"
                        required={true}
                        value={party}
                        onChange={handleChange}
                        max="15"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="time" className="form-label" style={{ color: 'white' }}>
                        Time
                    </label>
                    <select
                        className="form-select"
                        id="time"
                        name="time"
                        value={time}
                        onChange={handleChange}
                    >
                        <option value="Dinner">Dinner</option>
                        <option value="Lunch">Lunch</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="reservationDate" className="form-label" style={{ color: 'white' }}>
                        Date
                    </label>
                    <input
                        type="date"
                        className="form-control"
                        id="reservationDate"
                        name="reservationDate"
                        value={reservationDate}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="observations" className="form-label" style={{ color: 'white' }}>
                        Observations
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="observations"
                        name="observations"
                        value={observations}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmation" className="form-label" style={{ color: 'white' }}>
                        Confirmation
                    </label>
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="confirmation"
                        name="confirmation"
                        checked={confirmation}
                        onChange={handleChange}
                    />
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-warning btn-sm me-3">
                        Save
                    </button>
                    <a href="/" className="btn btn-danger btn-sm">
                        Return
                    </a>
                </div>
            </form>
        </div>
    );
}
