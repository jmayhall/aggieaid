package edu.tamu.aggieaid.api.dto;

import java.util.List;
import java.util.UUID;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

import edu.tamu.aggieaid.constants.ValidationPaterns;
import edu.tamu.aggieaid.constants.ValidationsMessages;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


/*
 * 
 *  
 * 
 */

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class JwtDTO {

    @Pattern(regexp=ValidationPaterns.VALID_JWT, message=ValidationsMessages.JWT_NOT_VALID)
    @NotBlank( message=ValidationsMessages.JWT_NULL)
    private String token;

    @Pattern(regexp = ValidationPaterns.TOKEN_TYPES,message = ValidationsMessages.TOKEN_TYPE_NOT_VALID)
    @NotBlank( message=ValidationsMessages.TOKEN_TYPE_NULL)  
    private String type = "Bearer";
    
    @Pattern(regexp=ValidationPaterns.VALID_UUID, message=ValidationsMessages.ID_NOT_VALID_UUID)
    @NotBlank( message=ValidationsMessages.ID_NULL)
    private UUID id;
    
    @NotBlank( message=ValidationsMessages.USERNAME_NULL)
    private String username;
    
    @Pattern(regexp=ValidationPaterns.VALID_EMAIL, message=ValidationsMessages.EMAIL_NOT_VALID)
    @NotBlank( message=ValidationsMessages.EMAIL_NULL)
    private String email;
    
    private List<String> roles;
}

