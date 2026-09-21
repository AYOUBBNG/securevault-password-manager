package com.securevault.auth.controller;

import com.securevault.auth.dto.AuthResponse;
import com.securevault.auth.dto.LoginRequest;
import com.securevault.auth.dto.RegisterRequest;
import com.securevault.auth.dto.Verify2FARequest;
import com.securevault.auth.entity.User;
import com.securevault.auth.repository.UserRepository;
import com.securevault.auth.security.JwtUtil;
import com.securevault.auth.service.AuthService;
import com.securevault.auth.service.TwoFactorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;
    private final TwoFactorService twoFactorService;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    public AuthController(
            AuthService authService,
            TwoFactorService twoFactorService,
            UserRepository userRepository,
            JwtUtil jwtUtil
    ) {
        this.authService = authService;
        this.twoFactorService = twoFactorService;
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        authService.register(request);
        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            String token = authService.login(request);
            return ResponseEntity.ok(new AuthResponse(token));
        } catch (RuntimeException e) {
            if ("2FA_REQUIRED".equals(e.getMessage())) {
                return ResponseEntity.status(403).body(Map.of("message", "2FA_REQUIRED"));
            }
            throw e;
        }
    }

    @GetMapping("/2fa/status")
    public ResponseEntity<?> twoFaStatus(@RequestHeader("X-User-Email") String email) {

        User user = userRepository.findByEmail(email).orElseThrow();

        boolean configured = user.getTwoFactorSecret() != null
                && !user.getTwoFactorSecret().isBlank();

        boolean enabled = user.isTwoFactorEnabled();

        return ResponseEntity.ok(Map.of(
                "configured", configured,
                "enabled", enabled
        ));
    }

    @PostMapping("/2fa/enable")
    public ResponseEntity<?> enable2fa(@RequestHeader("X-User-Email") String email) {

        User user = userRepository.findByEmail(email).orElseThrow();

        String secret = twoFactorService.generateSecret();
        user.setTwoFactorSecret(secret);

        user.setTwoFactorEnabled(false);

        userRepository.save(user);

        String qrCodeUrl = twoFactorService.generateQrCode(email, secret);

        return ResponseEntity.ok(Map.of("qrCodeUrl", qrCodeUrl));
    }

    @PostMapping("/2fa/reset")
    public ResponseEntity<?> reset2fa(@RequestHeader("X-User-Email") String email) {

        User user = userRepository.findByEmail(email).orElseThrow();

        if (!user.isTwoFactorEnabled()) {
            return ResponseEntity.badRequest().body("2FA is not enabled for this account");
        }

        String newSecret = twoFactorService.generateSecret();
        user.setTwoFactorSecret(newSecret);

        user.setTwoFactorEnabled(false);

        userRepository.save(user);

        String qrCodeUrl = twoFactorService.generateQrCode(email, newSecret);

        return ResponseEntity.ok(Map.of("qrCodeUrl", qrCodeUrl));
    }

    @PostMapping("/2fa/verify")
    public ResponseEntity<?> verifyOtp(
            @RequestHeader("X-User-Email") String email,
            @RequestBody Verify2FARequest request
    ) {

        User user = userRepository.findByEmail(email).orElseThrow();

        if (user.getTwoFactorSecret() == null || user.getTwoFactorSecret().isBlank()) {
            return ResponseEntity.badRequest().body("2FA not enabled yet");
        }

        boolean valid = twoFactorService.verifyCode(
                user.getTwoFactorSecret(),
                request.getCode()
        );

        if (!valid) {
            return ResponseEntity.status(401).body("Invalid OTP");
        }

        user.setTwoFactorEnabled(true);
        userRepository.save(user);

        String token = jwtUtil.generateToken(user.getEmail(), true);

        return ResponseEntity.ok(new AuthResponse(token));
    }
}
