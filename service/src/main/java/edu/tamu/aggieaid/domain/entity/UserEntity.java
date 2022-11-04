package edu.tamu.aggieaid.domain.entity;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;
import org.hibernate.validator.constraints.Length;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import edu.tamu.aggieaid.constants.ValidationPaterns;
import edu.tamu.aggieaid.constants.ValidationsMessages;
import edu.tamu.aggieaid.domain.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "users", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"username"}),
        @UniqueConstraint(columnNames = {"email"})
})
public class UserEntity implements User, UserDetails {

    @Id
    @GeneratedValue(generator="system-uuid", strategy = GenerationType.AUTO)
    @GenericGenerator(name="system-uuid", strategy = "uuid2")
    @Type(type = "uuid-char")
    private UUID id;

    @NotBlank(message=ValidationsMessages.NAME_NULL)
    private String name;

    @Length(min=3, max=15, message=ValidationsMessages.USERNAME_NULL)
    private String username;

    @Pattern(regexp=ValidationPaterns.VALID_EMAIL, message=ValidationsMessages.EMAIL_NOT_VALID)
    private String email;

    private String password;

    @OneToMany(
        mappedBy = "owner", 
        cascade = CascadeType.ALL,
        orphanRemoval = true
    )
    @Builder.Default
    private List<EventEntity> sponsoredEvents = new ArrayList<>();

    private boolean enabled;

    private String emailVerificationCode;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public boolean isAccountNonExpired() {
        // TODO Auto-generated method stub
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        // TODO Auto-generated method stub
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        // TODO Auto-generated method stub
        return true;
    }

    @Override
    public boolean isEnabled() {
        return this.enabled;
    }
    
}
