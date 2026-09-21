package com.securevault.vault.security;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.Arrays;
import java.util.Base64;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

public class AesUtil {

    private static final String ALGO = "AES/CBC/PKCS5Padding";

    private static SecretKeySpec getKey(String secret) throws Exception {
        MessageDigest sha = MessageDigest.getInstance("SHA-256");
        byte[] key = sha.digest(secret.getBytes(StandardCharsets.UTF_8));
        return new SecretKeySpec(Arrays.copyOf(key, 16), "AES");
    }

    public static String encrypt(String data, String secret) {
        try {
            Cipher cipher = Cipher.getInstance(ALGO);
            SecretKeySpec keySpec = getKey(secret);
            IvParameterSpec iv = new IvParameterSpec(new byte[16]);
            cipher.init(Cipher.ENCRYPT_MODE, keySpec, iv);
            return Base64.getEncoder()
                    .encodeToString(cipher.doFinal(data.getBytes(StandardCharsets.UTF_8)));
        } catch (Exception e) {
            throw new RuntimeException("Encryption error", e);
        }
    }

    public static String decrypt(String encrypted, String secret) {
        try {
            Cipher cipher = Cipher.getInstance(ALGO);
            SecretKeySpec keySpec = getKey(secret);
            IvParameterSpec iv = new IvParameterSpec(new byte[16]);
            cipher.init(Cipher.DECRYPT_MODE, keySpec, iv);
            return new String(
                    cipher.doFinal(Base64.getDecoder().decode(encrypted)),
                    StandardCharsets.UTF_8
            );
        } catch (Exception e) {
            throw new RuntimeException("Decryption error", e);
        }
    }
}
