package com.securevault.vault.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import com.securevault.vault.dto.DashboardResponse;
import com.securevault.vault.entity.PasswordEntry;
import com.securevault.vault.service.VaultService;

@RestController
@RequestMapping("/api/vault")
public class VaultController {

    private final VaultService vaultService;

    public VaultController(VaultService vaultService) {
        this.vaultService = vaultService;
    }

    @PostMapping
    public PasswordEntry save(
            @RequestBody PasswordEntry entry,
            @RequestHeader("X-User-Email") String email) {

        entry.setOwnerEmail(email);
        return vaultService.save(entry);
    }

    @GetMapping("/my")
    public List<PasswordEntry> myVault(
            @RequestHeader("X-User-Email") String email) {

        return vaultService.getMyVault(email);
    }

    @GetMapping("/{id}/reveal")
    public String reveal(
            @PathVariable Long id,
            @RequestHeader(value = "X-User-2FA", defaultValue = "false") boolean twoFa) {

        if (!twoFa) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "2FA required"
            );
        }

        return vaultService.revealPassword(id);
    }
    
    @GetMapping("/dashboard")
    public DashboardResponse dashboard(
            @RequestHeader("X-User-Email") String email,
            @RequestHeader(value = "X-User-2FA", defaultValue = "false")
            boolean twoFactorEnabled) {

        return vaultService.getDashboard(email, twoFactorEnabled);
    }


@GetMapping("/debug-headers")
public Map<String, String> debugHeaders(@RequestHeader Map<String, String> headers) {
    return headers;
}

    // Newly added delete endpoint
    @DeleteMapping("/{id}")
public void delete(
        @PathVariable Long id,
        @RequestHeader("X-User-Email") String email) {

    vaultService.deleteOwnEntry(id, email);
}
}
