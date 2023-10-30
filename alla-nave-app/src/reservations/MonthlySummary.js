import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ReservationSummary() {
  const urlBase = "http://localhost:8081/alla-nave/reservations";
  const [reservations, setReservations] = useState([]);
  const [selectedDate, setSelectedDate] = useState(""); 
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [showAllReservations, setShowAllReservations] = useState(true); 

  useEffect(() => {
    loadReservations();
  }, []);

  const loadReservations = async () => {
    const result = await axios.get(urlBase);

    // Filtra y agrupa las reservas por fecha y time (Lunch o Dinner)
    const filteredAndGroupedReservations = result.data.reduce((groups, reservation) => {
      if (reservation.time === "Lunch" || reservation.time === "Dinner") {
        const key = `${reservation.reservationDate}-${reservation.time}`;
        if (!groups[key]) {
          groups[key] = {
            reservationDate: reservation.reservationDate,
            time: reservation.time,
            totalPeople: 0,
          };
        }
        groups[key].totalPeople += reservation.party;
      }
      return groups;
    }, {});

    const reservationsWithSum = Object.values(filteredAndGroupedReservations);

    
    reservationsWithSum.sort((a, b) => new Date(a.reservationDate) - new Date(b.reservationDate));

    setReservations(reservationsWithSum);
    setFilteredReservations(reservationsWithSum);
  }

  const filterReservations = () => {
    if (selectedDate) {
      const filtered = reservations.filter((reservation) => {
        return reservation.reservationDate === selectedDate;
      });
      setFilteredReservations(filtered);
      setShowAllReservations(false);
    } else {

      if (showAllReservations) {
        setFilteredReservations(reservations);
      }
    }
  }

  const showAll = () => {
    setFilteredReservations(reservations);
    setSelectedDate("");
    setShowAllReservations(true);
  }

  return (
    <div className="container">
      <div className="container text-center" style={{ margin: "30px" }}>
        <h3>List of Reservations</h3>
        <div>
          <button onClick={showAll} className="button-blue">Show All</button>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          <button onClick={filterReservations} className="button-blue">Filter by Date</button>
        </div>
      </div>
      <table className="table table-striped table-over align-mode">
        <thead className="table-dark">
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Time</th>
            <th scope="col">Total People</th>
          </tr>
        </thead>
        <tbody>
          {filteredReservations.map((reservation) => (
            <tr key={`${reservation.reservationDate}-${reservation.time}`}>
              <td>{reservation.reservationDate}</td>
              <td>{reservation.time}</td>
              <td>{reservation.totalPeople}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
