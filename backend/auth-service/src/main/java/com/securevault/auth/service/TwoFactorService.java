package com.securevault.auth.service;


import com.warrenstrange.googleauth.GoogleAuthenticator;
import com.warrenstrange.googleauth.GoogleAuthenticatorKey;
import com.warrenstrange.googleauth.GoogleAuthenticatorQRGenerator;
import org.springframework.stereotype.Service;

@Service
public class TwoFactorService {

    private final GoogleAuthenticator gAuth = new GoogleAuthenticator();

    public String generateSecret() {
        return gAuth.createCredentials().getKey();
    }

    public boolean verifyCode(String secret, int code) {
        return gAuth.authorize(secret, code);
    }

    public String generateQrCode(String email, String secret) {
        return GoogleAuthenticatorQRGenerator.getOtpAuthURL(
                "SecureVault",
                email,
                new GoogleAuthenticatorKey.Builder(secret).build()
        );
    }
}
