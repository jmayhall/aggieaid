package edu.tamu.aggieaid.api.dto;

import javax.validation.constraints.NotBlank;

import lombok.Data;

@Data
public class LoginDTO {

    @NotBlank
    String email;

    @NotBlank
    String password;

}
