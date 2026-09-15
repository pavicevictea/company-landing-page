package com.example.companylandingpage.controller;

import com.example.companylandingpage.dto.AuthUserDto;
import com.example.companylandingpage.dto.RegisterRequest;
import com.example.companylandingpage.model.AdminUser;
import com.example.companylandingpage.model.User;
import com.example.companylandingpage.repository.AdminUserRepository;
import com.example.companylandingpage.repository.UserRepository;
import com.example.companylandingpage.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final AuthService authService;
    private final AdminUserRepository adminUserRepository;
    private final UserRepository userRepository;
    private final SecurityContextRepository securityContextRepository;

    public AuthController(AuthenticationManager authenticationManager, AuthService authService, AdminUserRepository adminUserRepository, UserRepository userRepository, SecurityContextRepository securityContextRepository) {
        this.authenticationManager = authenticationManager;
        this.authService = authService;
        this.adminUserRepository = adminUserRepository;
        this.userRepository = userRepository;
        this.securityContextRepository = securityContextRepository;
    }

    @PostMapping("/login")
    public void login(@RequestBody LoginRequest loginRequest, HttpServletRequest request, HttpServletResponse response) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
        );

        SecurityContext context = SecurityContextHolder.createEmptyContext();
        context.setAuthentication(authentication);
        SecurityContextHolder.setContext(context);
        securityContextRepository.saveContext(context, request, response);
    }

    @GetMapping("/me")
    public AuthUserDto me(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RuntimeException("Unauthorized");
        }
        String username = authentication.getName();
        AdminUser admin = adminUserRepository.findByUsername(username).orElse(null);
        if (admin != null) {
            return new AuthUserDto(
                    admin.getUsername(),
                    admin.getUsername(),
                    "ADMIN"
            );
        }
        User user = userRepository.findByUsername(username).orElseThrow();
        return new AuthUserDto(
                user.getName(),
                user.getUsername(),
                "USER"
        );
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public void register(@Valid @RequestBody RegisterRequest request) {
        authService.register(request);
    }

    @GetMapping("/check-username")
    public boolean checkUsername(@RequestParam String username) {
        return !userRepository.existsByUsername(username);
    }

    @GetMapping("/check-email")
    public boolean checkEmail(@RequestParam String email) {
        return !userRepository.existsByEmail(email);
    }

    public static class LoginRequest {
        private String username;
        private String password;

        public String getUsername() {
            return username;
        }
        public void setUsername(String username) {
            this.username = username;
        }
        public String getPassword() {
            return password;
        }
        public void setPassword(String password) {
            this.password = password;
        }
    }
}
