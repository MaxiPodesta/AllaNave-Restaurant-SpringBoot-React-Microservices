package com.mp.ar.reservation.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.Date;

@Entity @Data
@Getter @Setter
@ToString
@Table(name = "reservations")//table name in the DB
@AllArgsConstructor
@NoArgsConstructor
public class Reservations {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idReservation;
    private String nameUser;
    private int party;
    private String time;
    @Temporal(TemporalType.DATE)
    private LocalDate reservationDate;
    private String observations;
    private Boolean confirmation;

}
