package edu.tamu.aggieaid.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.tamu.aggieaid.api.dto.NewUserDTO;
import edu.tamu.aggieaid.domain.User;
import edu.tamu.aggieaid.domain.repo.UserRepo;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepo userRepo;

    @PostMapping("/register")
    public ResponseEntity<String> regiterUser(@RequestBody NewUserDTO newUserDTO){
        userRepo.save(User.builder()
            .username(newUserDTO.getEmail().split("@", 0)[0])
            .email(newUserDTO.getEmail())
            .name(newUserDTO.getName())
            .password(newUserDTO.getPassword())
            .build());
        return new ResponseEntity<>("201 Created", HttpStatus.CREATED);
    }

}
