package com.securevault.gateway.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.SecurityWebFiltersOrder;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.security.web.server.authentication.AuthenticationWebFilter;
import org.springframework.security.web.server.context.NoOpServerSecurityContextRepository;

import com.securevault.gateway.security.JwtAuthenticationManager;
import com.securevault.gateway.security.JwtUserDetails;

import reactor.core.publisher.Mono;

@EnableWebFluxSecurity
@Configuration
public class SecurityConfig {

        @Bean
        public SecurityWebFilterChain securityWebFilterChain(
                        ServerHttpSecurity http,
                        JwtAuthenticationManager authManager) {

                AuthenticationWebFilter jwtFilter = new AuthenticationWebFilter(authManager);

                jwtFilter.setServerAuthenticationConverter(exchange -> {
                        String header = exchange.getRequest()
                                        .getHeaders()
                                        .getFirst("Authorization");

                        System.out.println("AUTH HEADER = " + header);

                        if (header != null && header.startsWith("Bearer ")) {
                                String token = header.substring(7);
                                return Mono.just(
                                                new UsernamePasswordAuthenticationToken(null, token));
                        }
                        return Mono.empty();
                });

                jwtFilter.setAuthenticationSuccessHandler((webFilterExchange, authentication) -> {

                        JwtUserDetails user = (JwtUserDetails) authentication.getPrincipal();

                        System.out.println(
                                        "JWT OK, email=" + user.getEmail() +
                                                        " 2FA=" + user.isTwoFactorEnabled());

                        return webFilterExchange.getChain().filter(
                                        webFilterExchange.getExchange().mutate()
                                                        .request(
                                                                        webFilterExchange.getExchange()
                                                                                        .getRequest()
                                                                                        .mutate()
                                                                                        .header("X-User-Email",
                                                                                                        user.getEmail())
                                                                                        .header(
                                                                                                        "X-User-2FA",
                                                                                                        String.valueOf(user
                                                                                                                        .isTwoFactorEnabled()))
                                                                                        .build())
                                                        .build());
                });

                jwtFilter.setAuthenticationFailureHandler((webFilterExchange, exception) -> {
                        System.out.println("JWT FAILED: " + exception.getMessage());
                        webFilterExchange.getExchange()
                                        .getResponse()
                                        .setStatusCode(HttpStatus.UNAUTHORIZED);
                        return Mono.empty();
                });

                return http
                                .csrf(ServerHttpSecurity.CsrfSpec::disable)
                                .httpBasic(ServerHttpSecurity.HttpBasicSpec::disable)
                                .formLogin(ServerHttpSecurity.FormLoginSpec::disable)
                                .securityContextRepository(
                                                NoOpServerSecurityContextRepository.getInstance())
                                .authorizeExchange(ex -> ex
                                                .pathMatchers("/api/auth/**").permitAll()
                                                .anyExchange().authenticated())
                                .addFilterAt(jwtFilter, SecurityWebFiltersOrder.AUTHENTICATION)
                                .build();
        }
}
