package edu.tamu.aggieaid.api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


/*
 * 
 *  The ErrorDTO is a Data Transfer Object that is used in REST responses to the client during error events.
 * 
 */

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ErrorDTO {
    
    private String path;
    private String error;
    private String message;
    private int status;

}
