package edu.tamu.aggieaid.domain.entity;

import java.time.LocalTime;
import java.util.Date;
import java.util.UUID;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import edu.tamu.aggieaid.constants.ValidationsMessages;
import edu.tamu.aggieaid.domain.Event;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class EventEntity implements Event {

    @Id
    @GeneratedValue(generator="system-uuid", strategy = GenerationType.AUTO)
    @GenericGenerator(name="system-uuid", strategy = "uuid2")
    @Type(type = "uuid-char")
    private UUID id;

    @NotBlank(message=ValidationsMessages.TITLE_NULL)
    private String title;

    @NotBlank(message=ValidationsMessages.DESCRIPTION_NULL)
    private String description;

    @NotBlank(message=ValidationsMessages.DESCRIPTION_NULL)
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

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity owner;
    
}
