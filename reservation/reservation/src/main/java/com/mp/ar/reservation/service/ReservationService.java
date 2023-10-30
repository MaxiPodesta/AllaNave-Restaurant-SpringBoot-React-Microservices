package com.mp.ar.reservation.service;

import com.mp.ar.reservation.DTO.UsuarioDTO;
import com.mp.ar.reservation.entity.Reservations;
import com.mp.ar.reservation.exception.NotFoundResource;
import com.mp.ar.reservation.repository.ReservationRepository;
import org.eclipse.jdt.core.compiler.InvalidInputException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;


import java.time.LocalDate;
import java.util.List;

@Service
public class ReservationService implements IReservationsService {

    @Autowired
    private RestTemplate apiConsume;

    @Autowired
    private ReservationRepository reserRepo;//implementation of the repository

    @Override
    public List<Reservations> listOfReservations() {
        return reserRepo.findAll();
    }

    public void createReservation(int party, String time, LocalDate reservationDate, Boolean confirmation, String observations, String email) throws InvalidInputException {
        UsuarioDTO usuarioDTO = apiConsume.getForObject("http://localhost:8080/alla-nave/usuarios/usuariosByEmail/" + email, UsuarioDTO.class);// url that will be called on the service user
        Reservations reservation = new Reservations();
        if (usuarioDTO == null) {
            // Manage the case when the user is not found
            throw new InvalidInputException("User not found.");
        }

        // Validate the values of the variable time )it has to be Lunch or Dinner)
        if (!time.equalsIgnoreCase("dinner") && !time.equalsIgnoreCase("lunch")) {
            throw new InvalidInputException("The value 'time' must be 'Dinner' or 'Lunch'.");
        }

        // It verify that the total amount of the reservation for that turn (Lunch/Dinner) Doesn't go over 40 people
        if (allowedReservation(reservationDate, time, party)) {
            reservation.setNameUser(usuarioDTO.getName()+" "+usuarioDTO.getSurname());
            reservation.setParty(party);
            reservation.setTime(time);
            reservation.setReservationDate(reservationDate);
            reservation.setConfirmation(confirmation);
            reservation.setObservations(observations);
           reserRepo.save(reservation);
        } else {//message send it in case is not enought space for that amount of people in that date and time
            throw new InvalidInputException("There is not enough space for the amount of people you want to add for this day and time.");
        }
    }


    @Override
    public Reservations searchReservation(Integer idReservation) {
        return reserRepo.findById(idReservation).orElse(null);
    }

    @Override
    public String deleteReservation(Integer idReservation) {
        reserRepo.deleteById(idReservation);
        return "Reservation has been deleted successfully";
    }

    @Override
    public Reservations editReservation(Integer idReservation, Reservations reser) {
        Reservations reservation = reserRepo.findById(idReservation).orElse(null);
        if (reservation == null) {
            throw new NotFoundResource("This id Doesn't exist in the database");
        }

        // update of the new data
        reservation.setParty(reser.getParty());
        reservation.setTime(reser.getTime());
        reservation.setReservationDate(reser.getReservationDate());
        reservation.setObservations(reser.getObservations());
        reservation.setConfirmation(reser.getConfirmation());
    //Save the changes
        return reserRepo.save(reservation);
    }

    @Override
    public List<Reservations> findReservationByDate(LocalDate date) {
        return reserRepo.findByReservationDate(date);
    }

    //Validate if is posible to do a reservation that day for that amount of people
    public Boolean allowedReservation(LocalDate date, String time, int party) {
        List<Reservations> reservationsList = reserRepo.findReservationsByDateAndTime(date, time);
        int maximumPeople = 40;
        int totalPartyCount = party;

        for (Reservations reser : reservationsList) {
            totalPartyCount += reser.getParty();
        }

        Boolean confirmation = totalPartyCount <= maximumPeople; //condition

        if (!confirmation) {
            System.out.println("There is not enough space for the amount of people you want to add for this day and time.");
        }

        return confirmation;
    }

    //it count the total amount of people selected for day and time(Lunch or Dinner)
    @Override
    public int countPeopleByTime (LocalDate date, String time){
        List<Reservations> reservationsList = reserRepo.findReservationsByDateAndTime(date, time);
        int peoplePerTime =0;
        for(Reservations reser : reservationsList){
            if(reser.getTime().equals(time) && reser.getReservationDate().equals(date)){
                peoplePerTime += reser.getParty();
            }
        }
        return peoplePerTime;
    }




}