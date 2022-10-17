package edu.tamu.aggieaid.api.dto;

import lombok.Data;

@Data
public class NewUserDTO {
    private String name;
    private String email;
    private String password;
}
