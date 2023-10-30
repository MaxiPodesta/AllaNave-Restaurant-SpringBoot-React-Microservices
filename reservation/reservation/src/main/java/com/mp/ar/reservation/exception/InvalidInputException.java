package com.mp.ar.reservation.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)  // Usar HttpStatus.BAD_REQUEST en lugar de NOT_FOUND
public class InvalidInputException extends RuntimeException{
    public InvalidInputException(String message) {
        super(message);

    }
}
