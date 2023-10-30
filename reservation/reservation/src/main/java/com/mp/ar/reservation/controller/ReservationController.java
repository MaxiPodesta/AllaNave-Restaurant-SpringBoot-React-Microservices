package com.mp.ar.reservation.controller;

import com.mp.ar.reservation.DTO.ReservationDTO;
import com.mp.ar.reservation.entity.Reservations;
import com.mp.ar.reservation.exception.NotFoundResource;
import com.mp.ar.reservation.service.IReservationsService;
import org.eclipse.jdt.core.compiler.InvalidInputException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/alla-nave")
@CrossOrigin(value = "http://localhost:3000")
public class ReservationController {

    @Autowired
    private IReservationsService reserService;//Injection of the Interface service

    private final static Logger logger = LoggerFactory.getLogger(ReservationController.class);



    public ReservationController(IReservationsService reserService) {

        this.reserService = reserService;
    }

    @GetMapping("/reservations")
    @ResponseStatus(HttpStatus.CREATED)
    public List<Reservations> getAllReservations(){
        var usuarios  = reserService.listOfReservations();
        usuarios.forEach(reservation -> logger.info(reservation.toString()));//shows all the info of every reservation
        return usuarios;
    }
    @PostMapping("/reservations")//"Post" because create a new data
    public String newReservation(@RequestBody ReservationDTO reser) throws InvalidInputException {
        try {
            reserService.createReservation(reser.getParty(), reser.getTime(), reser.getReservationDate(), reser.getConfirmation(), reser.getObservations(), reser.getEmail());
            return "Reservation has been created successfully";
        } catch (InvalidInputException e) {
            return e.getMessage(); //When the reservation exceed 40 people per turn(Lunch or Dinner)
        }

    }

    @DeleteMapping("/reservations/{idReservation}")
    public ResponseEntity<Map<String,Boolean>> removeReservation(@PathVariable Integer idReservation){
        Reservations usuario = reserService.searchReservation(idReservation);
        if(usuario==null)
            throw new NotFoundResource("This id Doesn't exist in the database");
        reserService.deleteReservation(idReservation);
        //Json
        Map<String,Boolean> answer =new HashMap<>();
        answer.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(answer);
    }
    @PutMapping("/reservations/{idReservation}")//"Put" because  updates an existing data
    public ResponseEntity<Reservations> editReservations(@PathVariable Integer idReservation, @RequestBody Reservations reser) {
        Reservations reservation = reserService.searchReservation(idReservation);
        if (reservation == null){
            throw new NotFoundResource("This id Doesn't exist in the database");
        }
        reservation.setNameUser(reser.getNameUser());
        reservation.setParty(reser.getParty());
        reservation.setTime(reser.getTime());
        reservation.setReservationDate(reser.getReservationDate());
        reservation.setObservations(reser.getObservations());
        reservation.setConfirmation(reser.getConfirmation());


        reserService.editReservation(idReservation, reservation);

        return ResponseEntity.ok(reservation);
    }


    @GetMapping("/reservations/{idReservation}")
    public ResponseEntity<Reservations> searchReservation(@PathVariable Integer idReservation){

        Reservations reservation= reserService.searchReservation(idReservation);
        if(reservation==null){
            throw new NotFoundResource("Couldn't found the resource: "+ idReservation);
        }
        return ResponseEntity.ok(reservation);

    }


    @GetMapping("/reservations/people-per-day")//Use it in the main table of reservations in the frontend
    public ResponseEntity<List<Reservations>> filterReservationsByDate(@RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
            List<Reservations> filteredReservations = reserService.findReservationByDate(date);
            return ResponseEntity.ok(filteredReservations);
    }

    @GetMapping("/reservations/people-per-time/{date}/{time}")//Use it in the secondary table of reservations in the frontend
    public int countPeoplePerTime(@PathVariable("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date, @PathVariable("time") String time) {
        return reserService.countPeopleByTime(date, time);
    }
}




