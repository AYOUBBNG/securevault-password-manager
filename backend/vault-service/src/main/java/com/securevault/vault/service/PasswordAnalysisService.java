package com.securevault.vault.service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.Base64;

import org.springframework.stereotype.Service;


@Service
public class PasswordAnalysisService {

    public boolean isWeak(String password) {
        if (password == null) return true;
        if (password.length() < 8) return true;
        if (!password.matches(".*[A-Z].*")) return true;
        if (!password.matches(".*[a-z].*")) return true;
        if (!password.matches(".*[0-9].*")) return true;
        if (!password.matches(".*[!@#$%^&*()].*")) return true;
        return false;
    }

    public String hash(String password) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] digest = md.digest(password.getBytes(StandardCharsets.UTF_8));
            return Base64.getEncoder().encodeToString(digest);
        } catch (Exception e) {
            throw new RuntimeException("Hashing error", e);
        }
    }
}
