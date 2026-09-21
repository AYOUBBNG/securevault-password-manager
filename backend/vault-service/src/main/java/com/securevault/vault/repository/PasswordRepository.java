package com.securevault.vault.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.securevault.vault.entity.PasswordEntry;

public interface PasswordRepository extends JpaRepository<PasswordEntry, Long> {

    List<PasswordEntry> findByOwnerEmail(String ownerEmail);
}
