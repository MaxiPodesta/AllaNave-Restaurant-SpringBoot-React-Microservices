package com.mp.ar.reservation.service;

import com.mp.ar.reservation.entity.Reservations;
import org.eclipse.jdt.core.compiler.InvalidInputException;

import java.time.LocalDate;

import java.util.List;

public interface IReservationsService {

    public List<Reservations> listOfReservations();
    public void createReservation(int party, String time, LocalDate reservationDate, Boolean confirmation, String observations, String email) throws InvalidInputException;
    public Reservations searchReservation(Integer idReservation);
    public String deleteReservation (Integer idReservation);
    public Reservations editReservation(Integer idReservation, Reservations reser);
    public List<Reservations>findReservationByDate(LocalDate date);
    public int countPeopleByTime (LocalDate date, String time);


}
