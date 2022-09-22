package edu.tamu.aggieaid.api.dto;

import javax.validation.constraints.NotBlank;

import lombok.Data;

@Data
public class LoginDTO {

    @NotBlank
    String usernameOrEmail;

    @NotBlank
    String password;

}
