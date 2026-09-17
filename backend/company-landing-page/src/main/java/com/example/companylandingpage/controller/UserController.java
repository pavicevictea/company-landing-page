package com.example.companylandingpage.controller;

import com.example.companylandingpage.dto.UserProfileDto;
import com.example.companylandingpage.dto.UserUpdateRequest;
import com.example.companylandingpage.service.UserService;
import jakarta.validation.Valid;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public UserProfileDto getCurrentUser(Authentication authentication) {
        return userService.getCurrentUser(authentication.getName());
    }

    @PutMapping("/me")
    public UserProfileDto updateCurrentUser(@Valid @RequestBody UserUpdateRequest request, Authentication authentication) {
        return userService.updateCurrentUser(authentication.getName(), request);
    }
}
