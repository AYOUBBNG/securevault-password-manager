package com.securevault.gateway.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.security.config.web.server.ServerHttpSecurity;

@Configuration
@EnableWebFluxSecurity
public class GatewaySecurityConfig {

    @Bean
    public SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {

        return http
            .csrf(ServerHttpSecurity.CsrfSpec::disable)

            .authorizeExchange(exchanges -> exchanges
                .pathMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                // auth endpoints public
                .pathMatchers(
                    "/api/auth/register",
                    "/api/auth/login",
                    "/api/auth/2fa/enable",
                    "/api/auth/2fa/verify",
                    "/api/auth/2fa/reset"
                ).permitAll()

               
                .anyExchange().permitAll()
            )

            .build();
    }
}
