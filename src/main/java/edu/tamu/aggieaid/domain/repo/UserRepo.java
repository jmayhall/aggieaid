package edu.tamu.aggieaid.domain.repo;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import edu.tamu.aggieaid.domain.User;

public interface UserRepo extends CrudRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByUsernameOrEmail(String username, String email);
    Optional<User> findByUsername(String username);
    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);
}
