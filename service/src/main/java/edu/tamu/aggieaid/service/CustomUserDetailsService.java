package edu.tamu.aggieaid.service;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import edu.tamu.aggieaid.domain.entity.UserEntity;
import edu.tamu.aggieaid.domain.repo.UserRepo;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        System.out.println(email);
        UserEntity user = userRepo.findByEmail(email)
            .orElseThrow(() -> 
                new UsernameNotFoundException("User not found with email:" + email));
            return user;
    }
    
}
