package com.securevault.gateway.security;

import java.util.List;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.ReactiveAuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import reactor.core.publisher.Mono;

@Component
public class JwtAuthenticationManager implements ReactiveAuthenticationManager {

    private final JwtUtil jwtUtil;

    public JwtAuthenticationManager(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    public Mono<Authentication> authenticate(Authentication authentication) {
        try {
            String token = authentication.getCredentials().toString();
            System.out.println("AUTH MANAGER TOKEN = " + token);

            String email = jwtUtil.getUsername(token);
            boolean twoFa = jwtUtil.getTwoFa(token);

            System.out.println("AUTH MANAGER OK email=" + email + " 2FA=" + twoFa);

            return Mono.just(
                    new UsernamePasswordAuthenticationToken(
                            new JwtUserDetails(email, twoFa),
                            token,
                            List.of(new SimpleGrantedAuthority("ROLE_USER"))));

        } catch (Exception e) {
            System.out.println("AUTH MANAGER FAILED: " + e.getClass().getName());
            e.printStackTrace();
            return Mono.error(new BadCredentialsException("Invalid JWT"));
        }
    }

}
