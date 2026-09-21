package com.securevault.gateway.security;

import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.http.HttpHeaders;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;

import reactor.core.publisher.Mono;

@Component
public class UserHeadersGlobalFilter implements GlobalFilter, Ordered {

    private final JwtUtil jwtUtil;

    public UserHeadersGlobalFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {

        System.out.println("✅ UserHeadersGlobalFilter HIT: " + exchange.getRequest().getURI());

        String auth = exchange.getRequest().getHeaders().getFirst(HttpHeaders.AUTHORIZATION);
        System.out.println("✅ AUTH HEADER = " + auth);

        if (auth == null || !auth.startsWith("Bearer ")) {
            return chain.filter(exchange);
        }

        String token = auth.substring(7);

        try {
            String email = jwtUtil.getUsername(token);
            boolean twoFa = jwtUtil.getTwoFa(token);

            System.out.println("✅ Injecting X-User-Email=" + email + " X-User-2FA=" + twoFa);

            ServerHttpRequest mutated = exchange.getRequest().mutate()
                    .header("X-User-Email", email)
                    .header("X-User-2FA", String.valueOf(twoFa))
                    .build();

            return chain.filter(exchange.mutate().request(mutated).build());

        } catch (Exception e) {
            System.out.println("❌ Filter failed: " + e.getMessage());
            return chain.filter(exchange);
        }
    }

    @Override
    public int getOrder() {
        return -1;
    }
}
