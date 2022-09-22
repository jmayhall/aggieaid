package edu.tamu.aggieaid.api;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import edu.tamu.aggieaid.api.dto.LoginDTO;
import edu.tamu.aggieaid.domain.repo.UserRepo;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepo userRepo;

    // @PostMapping("/login")
    // public ResponseEntity<String> authenticateUser(@RequestBody LoginDTO loginDTO){
    //     Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
    //         loginDTO.getUsernameOrEmail(), loginDTO.getPassword()));

    //     SecurityContextHolder.getContext().setAuthentication(authentication);
    //     return new ResponseEntity<>("User signed-in successfully!.", HttpStatus.OK);
    // }

    // @GetMapping(value = "/logout")
    // @ResponseStatus(HttpStatus.NO_CONTENT)
    // public void logout(HttpSession session) {
    //     session.invalidate();
    // }

}
