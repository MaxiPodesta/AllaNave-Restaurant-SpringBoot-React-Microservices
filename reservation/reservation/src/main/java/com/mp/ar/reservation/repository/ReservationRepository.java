package com.mp.ar.reservation.repository;

import com.mp.ar.reservation.entity.Reservations;
import feign.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservations, Integer> {

    @Query("SELECT r FROM Reservations r WHERE r.reservationDate = ?1 AND r.time = ?2")//Query needed to instruct the action in the DB
    List<Reservations> findReservationsByDateAndTime(LocalDate reservationDate, String time);


    @Query("SELECT r FROM Reservations r WHERE r.reservationDate = :date")//Query needed to instruct the action in the DB
    List<Reservations> findByReservationDate(@Param("date") LocalDate date);


}
