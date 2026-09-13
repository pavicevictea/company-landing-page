package com.example.companylandingpage.controller;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
public class AuthController {

    @GetMapping("/me")
    public Authentication me(Authentication authentication) {
        return authentication;
    }
}
