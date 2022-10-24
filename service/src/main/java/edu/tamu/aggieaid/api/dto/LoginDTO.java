package edu.tamu.aggieaid.api.dto;

import javax.validation.constraints.NotBlank;

import lombok.Data;

@Data
public class LoginDTO {

    @NotBlank(message = "Email is a required field")
    String email;

    @NotBlank(message = "Password is a required field")
    String password;

}
