package com.investify.backend.exceptions;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class RestException extends RuntimeException {

    private final HttpStatus status;

    public RestException(String message, HttpStatus status) {
        super(message);
        this.status = status;
    }
}