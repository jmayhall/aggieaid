package edu.tamu.aggieaid.service;

import java.security.SignatureException;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import edu.tamu.aggieaid.domain.entity.UserEntity;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtService {
    private static final Logger logger = LoggerFactory.getLogger(JwtService.class);

    @Value("${app.jwt.secret}")
    private String jwtSecret;

    @Value("${app.jwt.expirationMs}")
    private int jwtExpirationMs;

    public String generateJwtToken(Authentication authentication) {

        UserEntity userPrincipal = (UserEntity) authentication.getPrincipal();

        return Jwts.builder()
            .setSubject((userPrincipal.getEmail()))
            .setIssuedAt(new Date())
            .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
            .signWith(SignatureAlgorithm.HS512, jwtSecret)
            .compact();
    }

    public String getEmailFromJwtToken(String token) {
        return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();
    }

    public Date getExpirationFromJwtToken(String token) {
        return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getExpiration();
    }

    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
            return true;
        } catch (Exception e) {
            logger.error("Invalid JWT signature: {}", e.getMessage());
        // } catch (MalformedJwtException e) {
        //     logger.error("Invalid JWT token: {}", e.getMessage());
        // } catch (ExpiredJwtException e) {
        //     logger.error("JWT token is expired: {}", e.getMessage());
        // } catch (UnsupportedJwtException e) {
        //     logger.error("JWT token is unsupported: {}", e.getMessage());
        // } catch (IllegalArgumentException e) {
        //     logger.error("JWT claims string is empty: {}", e.getMessage());
        }

        return false;
    }
}
