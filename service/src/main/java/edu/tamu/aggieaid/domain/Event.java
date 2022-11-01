package edu.tamu.aggieaid.domain;

import java.time.LocalTime;
import java.util.Date;
import java.util.UUID;

import javax.validation.constraints.NotNull;

import edu.tamu.aggieaid.constants.ValidationsMessages;

public interface Event {

    public UUID getId();
    public void setId(UUID id);

    public String getTitle();
    public void setTitle(String title);

    public String getDescription();
    public void setDescription(String description);

    public String getShortDescription();
    public void setShortDescription(String description);

    public Date getDate();
    public void setDate(
        @NotNull(message=ValidationsMessages.DATE_NULL) 
        Date date
    );

    public String getThumbnailFileName();
    public void setThumbnailFileName(String thumbnailFileName);

    public float getThumbnailXOffset();
    public void setThumbnailXOffset(float xOffset);

    public float getThumbnailYOffset();
    public void setThumbnailYOffset(float xOffset);

    public float getThumbnailZoomOffset();
    public void setThumbnailZoomOffset(float xOffset);

    public LocalTime getStartTime();
    public void setStartTime(
        @NotNull(message=ValidationsMessages.START_TIME_NULL) 
        LocalTime startTime
    );

    public LocalTime getEndTime();
    public void setEndTime(
        @NotNull(message=ValidationsMessages.END_TIME_NULL) 
        LocalTime endTime
    );

    public int getVolunteerCount();
    public void setVolunteerCount(int volunteerCount);

}
