package com.securevault.vault.service;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;

import com.securevault.vault.entity.PasswordEntry;
import com.securevault.vault.repository.PasswordRepository;

@ExtendWith(MockitoExtension.class)
class VaultServiceTest {

    @Mock
    private PasswordRepository repository;

    @Mock
    private EncryptionService encryptionService;

    @Mock
    private PasswordAnalysisService analysisService;

    @InjectMocks
    private VaultService vaultService;

    @Test
    void shouldSavePasswordCorrectly() {

        PasswordEntry entry = new PasswordEntry();
        entry.setOwnerEmail("test@securevault.com");
        entry.setEncryptedPassword("Strong@123");

        when(analysisService.isWeak(anyString())).thenReturn(false);
        when(analysisService.hash(anyString())).thenReturn("hash123");
        when(encryptionService.encrypt(anyString())).thenReturn("encrypted123");
        when(repository.findByOwnerEmail(anyString()))
                .thenReturn(List.of());
        when(repository.save(any()))
                .thenReturn(entry);

        PasswordEntry saved = vaultService.save(entry);

        assertNotNull(saved);
        assertFalse(saved.isWeak());
        assertFalse(saved.isReused());

        verify(repository).save(entry);
    }
}
