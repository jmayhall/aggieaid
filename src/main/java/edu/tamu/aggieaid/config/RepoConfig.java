package edu.tamu.aggieaid.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import edu.tamu.aggieaid.domain.repo.handlers.UserRepoEventHandler;

@Configuration
public class RepoConfig {

    public RepoConfig() {
        super();
    }


    @Bean
    UserRepoEventHandler userRepoEventHandler() {
        return new UserRepoEventHandler();
    }
    
}
