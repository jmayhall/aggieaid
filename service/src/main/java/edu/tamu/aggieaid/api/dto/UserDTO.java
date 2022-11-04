package edu.tamu.aggieaid.api.dto;

import java.util.List;
import java.util.UUID;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

import org.hibernate.validator.constraints.Length;

import edu.tamu.aggieaid.constants.ValidationsMessages;
import edu.tamu.aggieaid.constants.ValidationPaterns;
import edu.tamu.aggieaid.domain.User;
import lombok.Data;

@Data
public class UserDTO implements User {

    private UUID id;

    @NotBlank(message=ValidationsMessages.NAME_NULL)
    private String name;

    @Length(min=3, max=15, message=ValidationsMessages.USERNAME_NULL)
    private String username;

    @Pattern(regexp=ValidationPaterns.VALID_EMAIL, message=ValidationsMessages.EMAIL_NOT_VALID)
    private String email;

    List<@Pattern(regexp=ValidationPaterns.VALID_UUID, message=ValidationsMessages.OWNER_NOT_VALID_UUID) UUID> sponsoredEvents;

    private boolean enabled;
    
}
