package com.example.companylandingpage.service;

import com.example.companylandingpage.dto.PasswordChangeRequest;
import com.example.companylandingpage.dto.UserProfileDto;
import com.example.companylandingpage.dto.UserUpdateRequest;
import com.example.companylandingpage.model.User;
import com.example.companylandingpage.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public UserProfileDto getCurrentUser(String username) {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new IllegalArgumentException("User not found"));

        return new UserProfileDto(
                user.getId(),
                user.getName(),
                user.getUsername(),
                user.getEmail()
        );
    }

    public UserProfileDto updateCurrentUser(String currentUsername, UserUpdateRequest request) {
        User user = userRepository.findByUsername(currentUsername).orElseThrow(() -> new IllegalArgumentException("User not found"));

        if (!user.getEmail().equals(request.getEmail()) && userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email is already registered");
        }

        user.setName(request.getName());
        user.setEmail(request.getEmail());

        User savedUser = userRepository.save(user);

        return new UserProfileDto(
                savedUser.getId(),
                savedUser.getName(),
                savedUser.getUsername(),
                savedUser.getEmail()
        );
    }

    public void changePassword(String currentUsername, PasswordChangeRequest request) {
        User user = userRepository.findByUsername(currentUsername).orElseThrow(() -> new IllegalArgumentException("User not found"));

        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Current password is incorrect");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
    }
}
