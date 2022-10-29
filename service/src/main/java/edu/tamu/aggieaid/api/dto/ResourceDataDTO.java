package edu.tamu.aggieaid.api.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

import edu.tamu.aggieaid.constants.ValidationPaterns;
import edu.tamu.aggieaid.constants.ValidationsMessages;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ResourceDataDTO {

    @NotBlank(message = ValidationsMessages.NAME_NULL)
    private String name;

    @Pattern(regexp = ValidationPaterns.VALID_URL)
    @NotBlank(message = ValidationsMessages.URL_NULL)
    private String url;
}
