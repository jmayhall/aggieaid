package edu.tamu.aggieaid.api.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class EmailVerificationDTO {
    
    private String email;
    private String password;
    private String verificationCode;

}
