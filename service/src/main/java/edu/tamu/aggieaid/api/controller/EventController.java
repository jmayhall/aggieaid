package edu.tamu.aggieaid.api.controller;

import java.util.Objects;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.hibernate.action.internal.EntityActionVetoException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
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

@RestController
@RequestMapping("/api/event")
public class EventController {

    @Autowired
    EventRepo eventRepo;

    @Autowired
    UserRepo userRepo;

    @PostMapping
    public ResponseEntity<EventDTO> createEvent(EventDTO eventDto) throws EventCreationException {

        User user = userRepo.findById(eventDto.getOwner())
            .orElseThrow(() -> new EntityNotFoundException("User Not Found with id: " + eventDto.getOwner()));

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
    
}
