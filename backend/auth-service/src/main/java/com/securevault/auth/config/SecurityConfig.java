package com.securevault.auth.config;
import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.http.HttpMethod;


@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
@Bean
public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
        .csrf(csrf -> csrf.disable())
        .authorizeHttpRequests(auth -> auth
            .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
            .requestMatchers(
                "/api/auth/register",
                "/api/auth/login",
                "/api/auth/2fa/enable",
                "/api/auth/2fa/verify",
		"/actuator/**",
                "/api/auth/2fa/reset"
            ).permitAll()
            .anyRequest().authenticated()
        );

    return http.build();
}



  

//        @Bean
// public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//     http
//         .csrf(csrf -> csrf.disable())
        
//         .authorizeHttpRequests(auth -> auth
//             .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
//             .requestMatchers(
//                 "/api/auth/register",
//                 "/api/auth/login",
//                 "/api/auth/2fa/enable",
//                 "/api/auth/2fa/verify",
//                 "/api/auth/2fa/reset"
//             ).permitAll()
//             .anyRequest().authenticated()
//         );

//     return http.build();
// }
}
