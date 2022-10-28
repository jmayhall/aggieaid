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

import com.fasterxml.jackson.annotation.JsonBackReference;

import edu.tamu.aggieaid.constants.EventValidationsMessages;
import edu.tamu.aggieaid.domain.Event;
import edu.tamu.aggieaid.domain.User;
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

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity owner;
    
}
