package edu.tamu.aggieaid.api;

import java.util.ArrayList;
import java.util.Objects;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.tamu.aggieaid.api.dto.JwtDTO;
import edu.tamu.aggieaid.api.dto.LoginDTO;
import edu.tamu.aggieaid.api.dto.NewUserDTO;
import edu.tamu.aggieaid.domain.User;
import edu.tamu.aggieaid.domain.repo.UserRepo;
import edu.tamu.aggieaid.utils.JwtUtils;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody NewUserDTO newUserDTO) {
        userRepo.save(User.builder()
            .username(newUserDTO.getEmail().split("@", 0)[0])
            .email(newUserDTO.getEmail())
            .name(newUserDTO.getName())
            .password(encoder.encode(newUserDTO.getPassword()))
            .build());
        return new ResponseEntity<>("201 Created", HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginDTO loginDTO) {

        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(loginDTO.getEmail(), loginDTO.getPassword()));


        ResponseEntity<?> res = null;

        if(Objects.nonNull(authentication)) {
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtUtils.generateJwtToken(authentication);
            
            User userDetails = (User) authentication.getPrincipal();    
    
            // List<String> roles = userDetails.getAuthorities().stream()
            //     .map(item -> item.getAuthority())
            //     .collect(Collectors.toList());

            res = ResponseEntity.ok(JwtDTO.builder()
            .token(jwt)
            .id(userDetails.getId())
            .username(userDetails.getUsername())
            .email(userDetails.getEmail())
            .roles(new ArrayList<>())
            .build());

        }

        return Objects.nonNull(authentication) && authentication.isAuthenticated() 
            ? res
            : ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authentication Failed");
    }

}
