package edu.tamu.aggieaid.domain.repo;

import java.util.UUID;

import org.springframework.data.repository.CrudRepository;

import edu.tamu.aggieaid.domain.entity.EventEntity;

public interface EventRepo extends CrudRepository<EventEntity, UUID> {
    
}
