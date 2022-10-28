package edu.tamu.aggieaid.api.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

import edu.tamu.aggieaid.constants.ValidationsMessages;
import edu.tamu.aggieaid.constants.ValidationPaterns;
import lombok.Data;

@Data
public class UserRegistrationDTO {
    @NotBlank(message=ValidationsMessages.NAME_NULL)
    private String name;
    @NotBlank(message=ValidationsMessages.EMAIL_NULL)
    @Pattern(regexp=ValidationPaterns.VALID_EMAIL, message=ValidationsMessages.EMAIL_NOT_VALID)
    private String email;
    @NotBlank(message=ValidationsMessages.PASSWORD_NULL)
    private String password;
}
