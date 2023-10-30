import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function ListReservation() {
  const urlBase = "http://localhost:8081/alla-nave/reservations";
  const [reservations, setReservations] = useState([]);
  const [selectedDate, setSelectedDate] = useState(""); // State to save the selected date
  const [filteredReservations, setFilteredReservations] = useState([]); // State to save the  the filtered reservations
  const [showAllReservations, setShowAllReservations] = useState(true); //State to track if all the reservations have to been showed up

  useEffect(() => {
    loadReservations();
  }, []);

  const loadReservations = async () => {
    const result = await axios.get(urlBase);
    console.log("Result load Reservations");
    console.log(result.data);

    //modify the answer for includ the costumer name
    const reservationsWithNames = result.data.map((reservation) => {
      return {
        ...reservation,
        nameUser: reservation.nameUser,
      };
    });

    //Set the Reservations from the closest ones 
    reservationsWithNames.sort((a, b) => new Date(a.reservationDate) - new Date(b.reservationDate));

    setReservations(reservationsWithNames);
    setFilteredReservations(reservationsWithNames);
  }

  const deleteReservation = async (idReservation) => {
    await axios.delete(`${urlBase}/${idReservation}`);
    loadReservations();
  }

  const filterReservations = () => {
    if (selectedDate) {
      const filtered = reservations.filter((reservation) => {
        return reservation.reservationDate === selectedDate;
      });
      setFilteredReservations(filtered);
      setShowAllReservations(false);
    } else {
      // if doen't select any date, shows all reservations
      if (showAllReservations) {
        setFilteredReservations(reservations);
      }
    }
  }

  const showAll = () => {
    setFilteredReservations(reservations);
    setSelectedDate(""); //clean selected date
    setShowAllReservations(true);
  }

  return (
    <div className="container">
      <div className="container text-center" style={{ margin: "30px" }}>
        <h3>List of Reservations</h3>
        <div>
          <button onClick={showAll}className="button-blue">Show All</button>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          <button onClick={filterReservations} className="button-blue" >Filter by Date</button>
        </div>
      </div>
      <table className="table table-striped table-over align-mode">
        <thead className="table-dark">
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Customer</th>
            <th scope="col">Party</th>
            <th scope="col">Date</th>
            <th scope="col">Time</th>
            <th scope="col">Confirmation</th>
            <th scope="col">Observations</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredReservations.map((reservation) => (
            <tr key={reservation.idReservation}>
              <th scope="row">{reservation.idReservation}</th>
              <td>{reservation.nameUser}</td> 
              <td>{reservation.party}</td>
              <td>{reservation.reservationDate}</td>
              <td>{reservation.time}</td>
              <td>{reservation.confirmation ? 'Yes' : 'No'}</td>
              <td>{reservation.observations}</td>
              <td className='text-center'>
                <div>
                  <Link to={`/editReservation/${reservation.idReservation}`} className='btn btn-warning btn-sm me-3'>Edit</Link>
                  <button onClick={() => deleteReservation(reservation.idReservation)} className='btn btn-danger btn-sm'>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
