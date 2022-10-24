package edu.tamu.aggieaid.api.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

import lombok.Data;

@Data
public class NewUserDTO {
    @NotBlank(message = "The name field is required")
    private String name;
    @NotBlank(message = "The email field is required")
    @Pattern(regexp=".+@.+\\..+", message="Please provide a valid email address")
    private String email;
    @NotBlank(message = "The password field is required")
    @Pattern(regexp="^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$", message="Passwords must have at least one uppercase letter, one lowercase letter, one number and one special character',")
    private String password;
}
