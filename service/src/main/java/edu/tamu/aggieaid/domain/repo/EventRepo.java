package edu.tamu.aggieaid.domain.repo;

import org.springframework.data.repository.CrudRepository;

import edu.tamu.aggieaid.domain.Event;

public interface EventRepo extends CrudRepository<Event, Long> {
    
}
