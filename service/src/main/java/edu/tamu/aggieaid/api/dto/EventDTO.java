package edu.tamu.aggieaid.api.dto;

import java.time.LocalTime;
import java.util.Date;
import java.util.UUID;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

import edu.tamu.aggieaid.constants.EventValidationsMessages;
import edu.tamu.aggieaid.constants.ValidationPaterns;
import edu.tamu.aggieaid.constants.ValidationsMessages;
import edu.tamu.aggieaid.domain.Event;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class EventDTO implements Event {

    private UUID id;
    
    @NotBlank(message=EventValidationsMessages.TITLE_NULL)
    private String title;

    @NotBlank(message=EventValidationsMessages.DESCRIPTION_NULL)
    private String description;

    @NotNull(message=EventValidationsMessages.DATE_NULL)
    private Date date; 

    @NotBlank(message=EventValidationsMessages.THUMBNAIL_FILENAME_NULL)
    private String thumbnailFileName;

    @NotNull(message=EventValidationsMessages.START_TIME_NULL)
    private LocalTime startTime;
    
    @NotNull(message=EventValidationsMessages.END_TIME_NULL)
    private LocalTime endTime;
    
    @Min(value = 5, message = EventValidationsMessages.VOLUNTEER_MIN)
    private int volunteerCount;

    @NotNull(message=EventValidationsMessages.OWNER_NULL)
    @Pattern(regexp=ValidationPaterns.VALID_UUID, message=ValidationsMessages.OWNER_NOT_VALID_UUID)
    private UUID owner;

}
