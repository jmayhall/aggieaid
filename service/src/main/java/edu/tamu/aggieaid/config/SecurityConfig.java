package edu.tamu.aggieaid.config;

import static javax.servlet.http.HttpServletResponse.SC_OK;
import static javax.servlet.http.HttpServletResponse.SC_UNAUTHORIZED;
import static org.springframework.http.HttpMethod.GET;
import static org.springframework.http.HttpMethod.POST;

import java.io.IOException;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;
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
import org.springframework.web.cors.CorsConfiguration;

import com.fasterxml.jackson.databind.ObjectMapper;

import edu.tamu.aggieaid.domain.entity.UserEntity;
import edu.tamu.aggieaid.domain.repo.UserRepo;
import edu.tamu.aggieaid.security.CustomAuthenticationProvider;
import edu.tamu.aggieaid.service.CustomUserDetailsService;
import lombok.RequiredArgsConstructor;

// @Configuration
// @EnableWebSecurity
// @RequiredArgsConstructor
// public class SecurityConfig {

//     @Autowired
//     UserDetailsServiceImpl userDetailsService;

//     @Autowired
//     private UserRepo userRepo;

//     @Autowired
//     private CustomUserDetailsService userDetailsService;

//     @Autowired
//     private ObjectMapper objectMapper;

//     @Autowired
//     private DataSource dataSource;

//     @Bean
//     public PersistentTokenRepository persistentTokenRepository() {
//         JdbcTokenRepositoryImpl db = new JdbcTokenRepositoryImpl();
//         db.setDataSource(dataSource);
//         return db;
//     }

//     @Bean
//     public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

//         http
//             .cors()
//                 .configurationSource(request -> new CorsConfiguration().applyPermitDefaultValues())
//             .and()
//             .csrf()
//                 .disable()
//             .headers()
//                 .frameOptions()
//                 .disable()
//             .and()
//                 .authorizeRequests()

//                     .antMatchers(POST, "/api/auth/register")
//                         .permitAll()

//                     .antMatchers(POST, "/api/auth/login")
//                         .permitAll()
                    
//                     .antMatchers(POST, "/api/auth/logout")
//                         .permitAll()

//                     .antMatchers(GET, "/", "/explorer/**")
//                         .permitAll()

//                     .anyRequest()
//                         .authenticated()

//             .and()
//                 .rememberMe()
//                     .rememberMeParameter("rememberme")
//                     .rememberMeCookieName("REMEMBERME")
//                     .tokenRepository(persistentTokenRepository())
//                     .userDetailsService(userDetailsService)
//             .and()
//                 .exceptionHandling()
//                     .authenticationEntryPoint(new AuthenticationEntryPoint() {

//                         @Override
//                         public void commence(
//                             HttpServletRequest request,
//                             HttpServletResponse response,
//                             AuthenticationException authException
//                         ) throws IOException, ServletException {
//                             processAuthResponse(response, SC_UNAUTHORIZED, "Authentication is required");
//                         }

//                     })
//             .and()
//                 .formLogin()
//                     .usernameParameter("email")
//                     .passwordParameter("password")
//                     .loginProcessingUrl("/api/auth/login")
//                     .successHandler(new CustomAuthenticationSuccessHandler())
//                     .failureHandler(new CustomAuthenticationFailureHandler())
//             .and()
//                 .logout()
//                     .addLogoutHandler(new CookieClearingLogoutHandler(new String[] { "JSESSION" }))
//                     .deleteCookies("JSESSION")
//                     .invalidateHttpSession(true)
//                     .logoutUrl("/api/auth/logout");

//         return http.build();
//     }

//     @Bean
//     public PasswordEncoder encoder() {
//         return new BCryptPasswordEncoder();
//     }

//     @Bean
//     public AuthenticationManager authManager(HttpSecurity http) throws Exception {
//         AuthenticationManagerBuilder authenticationManagerBuilder = http.getSharedObject(AuthenticationManagerBuilder.class);
//         authenticationManagerBuilder
//             .userDetailsService(userDetailsService)
//             .passwordEncoder(encoder())
//             .and()
//             .authenticationProvider(new CustomAuthenticationProvider());
//         return authenticationManagerBuilder.build();
//     }

//     public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

//         @Override
//         public void onAuthenticationSuccess(
//             HttpServletRequest request,
//             HttpServletResponse response,
//             Authentication authentication
//         ) throws IOException, ServletException {
//             Optional<User> user = userRepo.findByEmail(((User)authentication.getPrincipal()).getName());
//             if(user.isPresent()) {
//                 String body = objectMapper.writeValueAsString(user.get());
//                 processAuthResponse(response, SC_OK, body);    
//             } else {
//                 processAuthResponse(response, SC_OK, "User not found:" + ((User)authentication.getPrincipal()).getName());
//             }
//         }
//     }

//     public class CustomAuthenticationFailureHandler implements AuthenticationFailureHandler {

//         @Override
//         public void onAuthenticationFailure(
//             HttpServletRequest request,
//             HttpServletResponse response,
//             AuthenticationException exception
//         ) throws IOException, ServletException {
//             Map<String, Object> data = new HashMap<>();
//             data.put("timestamp", Calendar.getInstance().getTime());
//             data.put("exception", exception.getMessage());
//             processAuthResponse(response, SC_UNAUTHORIZED, objectMapper.writeValueAsString(data));
//         }

//     }

//     private void processAuthResponse(HttpServletResponse response, int status, String body) throws IOException {
//         System.out.println(body);
//         response.setStatus(status);
//         response
//             .getOutputStream()
//             .println(body);
//     }

// }
