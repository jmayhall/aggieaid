package edu.tamu.aggieaid.domain;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

import org.hibernate.validator.constraints.Length;

import lombok.Data;

@Data
@Entity
@Table(name = "users", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"username"}),
        @UniqueConstraint(columnNames = {"email"})
})
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotBlank(message = "You name cannot be blank")
    private String name;

    @Length(min = 3, max = 15, message = "You username must be between 3 and 15 character")
    private String username;

    @Pattern(regexp=".+@.+\\..+", message="Please provide a valid email address")
    private String email;

    @NotBlank(message = "You password cannot be blank")
    private String password;
    
}
