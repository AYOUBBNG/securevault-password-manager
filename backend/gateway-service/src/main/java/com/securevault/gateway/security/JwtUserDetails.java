package com.securevault.gateway.security;

public class JwtUserDetails {

    private final String email;
    private final boolean twoFactorEnabled;

    public JwtUserDetails(String email, boolean twoFactorEnabled) {
        this.email = email;
        this.twoFactorEnabled = twoFactorEnabled;
    }

    public String getEmail() {
        return email;
    }

    public boolean isTwoFactorEnabled() {
        return twoFactorEnabled;
    }
}
