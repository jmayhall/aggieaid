package edu.tamu.aggieaid.api.controller.advice;

import javax.persistence.EntityNotFoundException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;

import edu.tamu.aggieaid.api.dto.ErrorDTO;
import edu.tamu.aggieaid.exceptions.EventCreationException;


/*
 * 
 *  The APIControllerAdvice intercepts thrown errors from the REST controllers
 *  and prepares error responses to return to the client.
 * 
 */

@RestController
@ControllerAdvice
public class ApiControllerAdvice {

    private static final Logger logger = LoggerFactory.getLogger(ApiControllerAdvice.class);

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<ErrorDTO> handleEntityNotFoundException(EntityNotFoundException e) {
        if (logger.isDebugEnabled()) {
            e.printStackTrace();
        }
        logger.warn(e.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
            .body(ErrorDTO.builder()
                .status(HttpStatus.NOT_FOUND.value())
                .message(e.getMessage())
                .build());
    }

    @ExceptionHandler(EventCreationException.class)
    public ResponseEntity<ErrorDTO> handleEventCreationException(EventCreationException e) {
        if (logger.isDebugEnabled()) {
            e.printStackTrace();
        }
        logger.warn(e.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(ErrorDTO.builder()
                .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                .message(e.getMessage())
                .build());
    }

}
