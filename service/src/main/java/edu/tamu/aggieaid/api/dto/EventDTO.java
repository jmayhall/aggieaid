package edu.tamu.aggieaid.api.dto;

import java.time.LocalTime;
import java.util.Date;
import java.util.UUID;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

import edu.tamu.aggieaid.constants.ValidationPaterns;
import edu.tamu.aggieaid.constants.ValidationsMessages;
import edu.tamu.aggieaid.domain.Event;
import lombok.Builder;
import lombok.Data;


/*
 * 
 *  The EventDTO is a Data Transfer Object that is used in REST responses to and from the client.
 * 
 */

@Data
@Builder
public class EventDTO implements Event {

    private UUID id;
    
    @NotBlank(message=ValidationsMessages.TITLE_NULL)
    private String title;

    @NotBlank(message=ValidationsMessages.DESCRIPTION_NULL)
    private String description;

    @NotBlank(message=ValidationsMessages.SHORT_DESCRIPTION_NULL)
    private String shortDescription;

    @NotNull(message=ValidationsMessages.DATE_NULL)
    private Date date; 

    @NotBlank(message=ValidationsMessages.THUMBNAIL_FILENAME_NULL)
    private String thumbnailFileName;

    private float thumbnailXOffset;

    private float thumbnailYOffset;

    private float thumbnailZoomOffset;

    @NotNull(message=ValidationsMessages.START_TIME_NULL)
    private LocalTime startTime;
    
    @NotNull(message=ValidationsMessages.END_TIME_NULL)
    private LocalTime endTime;
    
    @Min(value = 5, message = ValidationsMessages.VOLUNTEER_MIN)
    private int volunteerCount;

    @NotNull(message=ValidationsMessages.OWNER_NULL)
    @Pattern(regexp=ValidationPaterns.VALID_UUID, message=ValidationsMessages.OWNER_NOT_VALID_UUID)
    private UUID owner;

}
