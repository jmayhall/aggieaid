package edu.tamu.aggieaid.domain;

import java.util.UUID;

public interface User {

    public UUID getId();
    public void setId(UUID id);

    public String getName();
    public void setName(String name);
    
    public String getUsername();
    public void setUsername(String username);

    public String getEmail();
    public void setEmail(String email);

}
