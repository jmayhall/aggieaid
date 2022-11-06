package edu.tamu.aggieaid.api.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

import edu.tamu.aggieaid.constants.ValidationPaterns;
import edu.tamu.aggieaid.constants.ValidationsMessages;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoginDTO {

    @NotBlank(message = ValidationsMessages.EMAIL_NULL)
    @Pattern(regexp = ValidationPaterns.VALID_EMAIL, message = ValidationsMessages.EMAIL_NOT_VALID)
    String email;

    @NotBlank(message = ValidationsMessages.PASSWORD_NULL)
    String password;

}
