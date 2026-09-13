package com.example.companylandingpage.controller;

import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4000", allowCredentials = "true")
public class AuthController {

    @GetMapping("/me")
    public Authentication me(Authentication authentication) {
        return authentication;
    }
}
