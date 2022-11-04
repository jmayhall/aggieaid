package edu.tamu.aggieaid.api.controller;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.Objects;

import javax.mail.MessagingException;
import javax.security.auth.message.AuthException;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.core.env.Environment;
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
import edu.tamu.aggieaid.api.dto.UserRegistrationDTO;
import edu.tamu.aggieaid.constants.EmailMessages;
import edu.tamu.aggieaid.domain.entity.UserEntity;
import edu.tamu.aggieaid.domain.repo.UserRepo;
import edu.tamu.aggieaid.service.EmailSenderService;
import edu.tamu.aggieaid.service.JwtService;


/*
 * 
 *  The AuthController handles the first order business logic for authentication related actions.
 * 
 */

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
    JwtService jwtServie;

    @Autowired
    EmailSenderService emailSenderService;

    @Autowired
    private Environment environment;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody UserRegistrationDTO newUserDTO) throws MessagingException, UnknownHostException {
        userRepo.save(UserEntity.builder()
            .username(newUserDTO.getEmail().split("@", 0)[0])
            .email(newUserDTO.getEmail())
            .name(newUserDTO.getName())
            .password(encoder.encode(newUserDTO.getPassword()))
            .build());

        logger.info("http://"+InetAddress.getLocalHost().getHostAddress()+":"+environment.getProperty("local.server.port"));

        emailSenderService.sendSimpleMessage(
            newUserDTO.getEmail(), 
            EmailMessages.REGISTER_USER_SUBJECT, 
            String.format(EmailMessages.REGISTER_USER_BODY, "http://"+InetAddress.getLocalHost().getHostAddress()+":"+environment.getProperty("local.server.port")+"/api/email/verify")
        );

        return new ResponseEntity<>("201 Created", HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<JwtDTO> authenticateUser(@Valid @RequestBody LoginDTO loginDTO) throws AuthException {

        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(loginDTO.getEmail(), loginDTO.getPassword()));
        
        if(Objects.isNull(authentication) || !authentication.isAuthenticated()) {
            throw new AuthException("Authentication Error");
        }

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtServie.generateJwtToken(authentication);
        
        UserEntity userDetails = (UserEntity) authentication.getPrincipal();    

        // List<String> roles = userDetails.getAuthorities().stream()
        //     .map(item -> item.getAuthority())
        //     .collect(Collectors.toList());

        return ResponseEntity.ok(JwtDTO.builder()
            .token(jwt)
            .id(userDetails.getId())
            .username(userDetails.getUsername())
            .email(userDetails.getEmail())
            .roles(new ArrayList<>())
            .expiration(jwtServie.getExpirationFromJwtToken(jwt))
            .enabled(userDetails.isEnabled())
            .build());
    }

}
