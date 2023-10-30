package com.mp.ar.reservation.DTO;

import com.mp.ar.reservation.entity.Reservations;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class ReservationDTO {

    private String nameUser;
    private int party;
    private String time;
    @Temporal(TemporalType.DATE)
    private LocalDate reservationDate;
    private String observations;
    private Boolean confirmation;
    private String email;
}
