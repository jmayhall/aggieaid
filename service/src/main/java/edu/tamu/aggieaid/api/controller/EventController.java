package edu.tamu.aggieaid.api.controller;

import java.util.List;
import java.util.Objects;

import javax.persistence.EntityNotFoundException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Streamable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.tamu.aggieaid.api.dto.EventDTO;
import edu.tamu.aggieaid.domain.Event;
import edu.tamu.aggieaid.domain.User;
import edu.tamu.aggieaid.domain.entity.EventEntity;
import edu.tamu.aggieaid.domain.entity.UserEntity;
import edu.tamu.aggieaid.domain.repo.EventRepo;
import edu.tamu.aggieaid.domain.repo.UserRepo;
import edu.tamu.aggieaid.exceptions.EventCreationException;


/*
 * 
 *  The EventController handles CRUD actions for the Event domain
 * 
 */

@RestController
@RequestMapping("/api/event")
public class EventController {

    private static final Logger logger = LoggerFactory.getLogger(EventController.class);

    @Autowired
    private EventRepo eventRepo;

    @Autowired
    private UserRepo userRepo;

    @PostMapping
    public ResponseEntity<EventDTO> createEvent(@RequestBody EventDTO eventDto) throws EventCreationException {

        logger.info(String.format("Creating event %s", eventDto.getTitle()));

        User user = userRepo.findById(eventDto.getOwner())
            .orElseThrow(() -> new EntityNotFoundException(String.format("User Not Found with id: %s", eventDto.getOwner())));

        Event newEvent = eventRepo.save(EventEntity.builder()
            .title(eventDto.getTitle())
            .date(eventDto.getDate())
            .thumbnailFileName(eventDto.getThumbnailFileName())
            .startTime(eventDto.getStartTime())
            .endTime(eventDto.getEndTime())
            .volunteerCount(eventDto.getVolunteerCount())
            .owner((UserEntity) user)
            .build());

        if(!Objects.nonNull(newEvent)) {
            throw new EventCreationException("An error occured while creating the event");
        }
        

        ((UserEntity)user).getSponsoredEvents()
            .add((EventEntity) newEvent);

        userRepo.save((UserEntity) user);

        return ResponseEntity.ok(EventDTO.builder()
            .id(newEvent.getId())
            .title(newEvent.getTitle())
            .date(newEvent.getDate())
            .thumbnailFileName(newEvent.getThumbnailFileName())
            .startTime(newEvent.getStartTime())
            .endTime(newEvent.getEndTime())
            .volunteerCount(newEvent.getVolunteerCount())
            .owner(user.getId())
            .build());
    }

    @GetMapping
    public ResponseEntity<List<EventDTO>> getEvents() {
    
        List<EventDTO> events = Streamable.of(eventRepo.findAll())
            .stream()
            .map(ee -> EventDTO.builder()
                .id(ee.getId())
                .title(ee.getTitle())
                .description(ee.getDescription())
                .thumbnailFileName(ee.getThumbnailFileName())
                .date(ee.getDate())
                .startTime(ee.getStartTime())
                .endTime(ee.getEndTime())
                .volunteerCount(ee.getVolunteerCount())
                .owner(ee.getOwner().getId())
                .build())
            .toList();

        return ResponseEntity.ok(events);
    }
    
}
