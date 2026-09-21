package com.securevault.vault.controller;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import com.securevault.vault.dto.DashboardResponse;
import com.securevault.vault.service.VaultService;

@WebMvcTest(VaultController.class)
@AutoConfigureMockMvc(addFilters = false)
class VaultControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private VaultService vaultService;

    @Test
    void revealShouldFailWithout2FA() throws Exception {
        mockMvc.perform(
                get("/api/vault/1/reveal")
                    .header("X-User-2FA", "false")
        )
        .andExpect(status().isForbidden());
    }

    @Test
    void revealShouldPassWith2FA() throws Exception {
        when(vaultService.revealPassword(1L))
                .thenReturn("secret");

        mockMvc.perform(
                get("/api/vault/1/reveal")
                    .header("X-User-2FA", "true")
        )
        .andExpect(status().isOk());
    }

    @Test
    void dashboardShouldReturnOk() throws Exception {

        when(vaultService.getDashboard(
                "test@securevault.com",
                true
        )).thenReturn(
                new DashboardResponse(5, 1, 2, true)
        );

        mockMvc.perform(
                get("/api/vault/dashboard")
                    .header("X-User-Email", "test@securevault.com")
                    .header("X-User-2FA", "true")
        )
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.totalPasswords").value(5))
        .andExpect(jsonPath("$.weakPasswords").value(1))
        .andExpect(jsonPath("$.reusedPasswords").value(2))
        .andExpect(jsonPath("$.twoFactorEnabled").value(true));
    }
}
