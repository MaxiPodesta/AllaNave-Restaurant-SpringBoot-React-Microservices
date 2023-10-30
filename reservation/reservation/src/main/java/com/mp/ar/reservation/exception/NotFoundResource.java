package com.mp.ar.reservation.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value= HttpStatus.NOT_FOUND)
public class NotFoundResource extends RuntimeException {
    public NotFoundResource(String message){
        super(message);
    }

}
