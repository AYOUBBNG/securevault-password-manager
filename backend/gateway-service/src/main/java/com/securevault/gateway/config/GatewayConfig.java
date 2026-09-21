package com.securevault.gateway.config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GatewayConfig {

    @Bean
    public RouteLocator routes(RouteLocatorBuilder builder) {
        return builder.routes()

            .route("auth-service", r -> r
    .path("/api/auth/**")
    .uri("lb://auth-service")
)

.route("vault-service", r -> r
    .path("/api/vault/**")
    .uri("lb://vault-service")
)

            .build();
    }
}
