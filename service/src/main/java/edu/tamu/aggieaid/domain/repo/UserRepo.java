package edu.tamu.aggieaid.domain.repo;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.repository.CrudRepository;

import edu.tamu.aggieaid.domain.entity.UserEntity;

public interface UserRepo extends CrudRepository<UserEntity, UUID> {
    Optional<UserEntity> findByEmail(String email);
    Optional<UserEntity> findByUsernameOrEmail(String username, String email);
    Optional<UserEntity> findByUsername(String username);
    Optional<UserEntity> findByEmailVerificationCode(String emailVerificationCode);
    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);
}
