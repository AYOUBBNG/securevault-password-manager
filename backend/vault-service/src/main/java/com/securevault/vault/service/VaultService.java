package com.securevault.vault.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.securevault.vault.entity.PasswordEntry;
import com.securevault.vault.repository.PasswordRepository;
import com.securevault.vault.dto.DashboardResponse;

@Service
public class VaultService {

    private final PasswordRepository repository;
    private final EncryptionService encryptionService;
    private final PasswordAnalysisService analysisService;

    public VaultService(PasswordRepository repository,
            EncryptionService encryptionService,
            PasswordAnalysisService analysisService) {
        this.repository = repository;
        this.encryptionService = encryptionService;
        this.analysisService = analysisService;
    }

    public PasswordEntry save(PasswordEntry entry) {

        String plainPassword = entry.getEncryptedPassword();

        boolean weak = analysisService.isWeak(plainPassword);

        String newHash = analysisService.hash(plainPassword);

        boolean reused = repository.findByOwnerEmail(entry.getOwnerEmail())
                .stream()
                .anyMatch(existing -> {
                    String oldPlain = encryptionService.decrypt(
                            existing.getEncryptedPassword());
                    String oldHash = analysisService.hash(oldPlain);
                    return oldHash.equals(newHash);
                });

        entry.setEncryptedPassword(
                encryptionService.encrypt(plainPassword));

        entry.setWeak(weak);
        entry.setReused(reused);

        return repository.save(entry);
    }

    public String revealPassword(Long id) {
        PasswordEntry entry = repository.findById(id).orElseThrow();
        return encryptionService.decrypt(entry.getEncryptedPassword());
    }

    public List<PasswordEntry> getMyVault(String email) {
        return repository.findByOwnerEmail(email);
    }

    public DashboardResponse getDashboard(String email, boolean twoFactorEnabled) {

    var entries = repository.findByOwnerEmail(email);

    int total = entries.size();
    int weak = (int) entries.stream().filter(PasswordEntry::isWeak).count();
    int reused = (int) entries.stream().filter(PasswordEntry::isReused).count();

    return new DashboardResponse(total, weak, reused, twoFactorEnabled);
}



// Newly added delete method
    public void deleteOwnEntry(Long id, String email) {
        PasswordEntry entry = repository.findById(id).orElseThrow();
        if (!entry.getOwnerEmail().equals(email)) {
            throw new SecurityException("Cannot delete entry not owned by user");
        }
        repository.deleteById(id);
    }
}
