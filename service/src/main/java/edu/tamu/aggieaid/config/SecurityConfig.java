package edu.tamu.aggieaid.config;

import static javax.servlet.http.HttpServletResponse.SC_OK;
import static javax.servlet.http.HttpServletResponse.SC_UNAUTHORIZED;
import static org.springframework.http.HttpMethod.GET;
import static org.springframework.http.HttpMethod.POST;

import java.io.IOException;
import java.util.Optional;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.logout.CookieClearingLogoutHandler;
import org.springframework.security.web.authentication.rememberme.JdbcTokenRepositoryImpl;
import org.springframework.security.web.authentication.rememberme.PersistentTokenRepository;

import com.fasterxml.jackson.databind.ObjectMapper;

import edu.tamu.aggieaid.domain.User;
import edu.tamu.aggieaid.domain.repo.UserRepo;
import edu.tamu.aggieaid.service.CustomUserDetailsService;
import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private DataSource dataSource;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserRepo userRepo;

    @Bean
    public PersistentTokenRepository persistentTokenRepository() {
        JdbcTokenRepositoryImpl db = new JdbcTokenRepositoryImpl();
        db.setDataSource(dataSource);
        return db;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors()
                .and()
            .csrf()
                .disable()
            .authorizeRequests()

                .antMatchers(POST, "/login")
                    .permitAll()
                
                .antMatchers(POST, "/logout")
                    .permitAll()

                .antMatchers(GET, "/")
                    .permitAll()

                .anyRequest()
                    .denyAll()

            .and()
                .rememberMe()
                    .rememberMeParameter("rememberme")
                    .rememberMeCookieName("REMEMBERME")
                    .tokenRepository(persistentTokenRepository())
                    .userDetailsService(userDetailsService)
            .and()
                .exceptionHandling()
                    .authenticationEntryPoint(new AuthenticationEntryPoint() {

                        @Override
                        public void commence(
                            HttpServletRequest request,
                            HttpServletResponse response,
                            AuthenticationException authException
                        ) throws IOException, ServletException {
                            processAuthResponse(response, SC_UNAUTHORIZED, "Authentication is required");
                        }

                    })
            .and()
                .formLogin(formLogin -> formLogin
                    .passwordParameter("password")
                    .usernameParameter("usernameOrEmail")
                    .successHandler(new CustomAuthenticationSuccessHandler())
                    .failureHandler(new CustomAuthenticationFailureHandler()))
                .logout(logout -> logout
                    .logoutUrl("/logout")
                    .addLogoutHandler(new CookieClearingLogoutHandler(new String[] { "JSESSION" })));

        return http.build();
    }

    @Bean
    public PasswordEncoder encoder() {
        return new BCryptPasswordEncoder();
    }


    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration
            .getAuthenticationManager();
    }

    public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

        @Override
        public void onAuthenticationSuccess(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication
        ) throws IOException, ServletException {
            String email = ((User) authentication.getPrincipal()).getEmail();
            Optional<User> user = userRepo.findByEmail(email);
            if(user.isPresent()) {
                String body = objectMapper.writeValueAsString(user.get());
                processAuthResponse(response, SC_OK, body);
            } else  {
                processAuthResponse(response, SC_UNAUTHORIZED, "Could not find user" + email);
            }
        }
    }

    public class CustomAuthenticationFailureHandler implements AuthenticationFailureHandler {

        @Override
        public void onAuthenticationFailure(
            HttpServletRequest request,
            HttpServletResponse response,
            AuthenticationException exception
        ) throws IOException, ServletException {
            processAuthResponse(response, SC_UNAUTHORIZED, "Bad Credentials");
        }

    }

    private void processAuthResponse(HttpServletResponse response, int status, String body) throws IOException {
        response.setStatus(status);
        response.getWriter().write(body);
        response.getWriter().flush();
        response.getWriter().close();
    }

}
