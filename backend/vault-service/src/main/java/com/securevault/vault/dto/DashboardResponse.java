package com.securevault.vault.dto;

public class DashboardResponse {

    private int totalPasswords;
    private int weakPasswords;
    private int reusedPasswords;
    private boolean twoFactorEnabled;

    public DashboardResponse(int totalPasswords,int weakPasswords,int reusedPasswords,boolean twoFactorEnabled) {
        this.totalPasswords = totalPasswords;
        this.weakPasswords = weakPasswords;
        this.reusedPasswords = reusedPasswords;
        this.twoFactorEnabled = twoFactorEnabled;
    }

    public int getTotalPasswords() {
        return totalPasswords;
    }

    public int getWeakPasswords() {
        return weakPasswords;
    }

    public int getReusedPasswords() {
        return reusedPasswords;
    }

    public boolean isTwoFactorEnabled() {
        return twoFactorEnabled;
    }
}
