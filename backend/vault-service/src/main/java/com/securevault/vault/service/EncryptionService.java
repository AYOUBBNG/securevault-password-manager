package com.securevault.vault.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.securevault.vault.security.AesUtil;

@Service
public class EncryptionService {

    @Value("${vault.aes.secret}")
    private String secret;

    public String encrypt(String value) {
        return AesUtil.encrypt(value, secret);
    }

    public String decrypt(String value) {
        return AesUtil.decrypt(value, secret);
    }
}
