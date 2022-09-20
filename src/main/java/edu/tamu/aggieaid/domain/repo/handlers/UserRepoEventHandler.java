package edu.tamu.aggieaid.domain.repo.handlers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.security.crypto.password.PasswordEncoder;

import edu.tamu.aggieaid.domain.User;

@RepositoryEventHandler(User.class)
public class UserRepoEventHandler {

    @Autowired
    PasswordEncoder encoder;

    @HandleBeforeCreate
    public void handleAuthorBeforeCreate(User user){
        user.setPassword(
            encoder.encode(user.getPassword())
        );
    }
    
}
