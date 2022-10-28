package edu.tamu.aggieaid.domain.repo.handlers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.security.crypto.password.PasswordEncoder;

import edu.tamu.aggieaid.domain.entity.UserEntity;

@RepositoryEventHandler(UserEntity.class)
public class UserRepoEventHandler {

    @Autowired
    PasswordEncoder encoder;

    @HandleBeforeCreate
    public void handleAuthorBeforeCreate(UserEntity user){
        user.setPassword(
            encoder.encode(user.getPassword())
        );
    }
    
}
