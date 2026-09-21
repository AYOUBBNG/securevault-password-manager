package com.securevault.auth.dto;

public class Verify2FARequest {
    private int code;

    public int getCode() { return code; }
    public void setCode(int code) { this.code = code; }
}
