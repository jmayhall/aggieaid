package edu.tamu.aggieaid.service;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import edu.tamu.aggieaid.domain.User;
import edu.tamu.aggieaid.domain.repo.UserRepo;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String usernameOrEmail) throws UsernameNotFoundException {
        User user = userRepo.findByUsernameOrEmail(usernameOrEmail, usernameOrEmail)
            .orElseThrow(() -> 
                new UsernameNotFoundException("User not found with username or email:" + usernameOrEmail));
            List<GrantedAuthority> auths = Collections.emptyList();
            return new org.springframework.security.core.userdetails.User(user.getEmail(),
            user.getPassword(), auths);
    }
    
}
