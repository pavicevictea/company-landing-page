package com.example.companylandingpage.service;

import com.example.companylandingpage.model.AdminUser;
import com.example.companylandingpage.repository.AdminUserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AdminUserService {
    private final AdminUserRepository adminUserRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminUserService(AdminUserRepository adminUserRepository, PasswordEncoder passwordEncoder) {
        this.adminUserRepository = adminUserRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public void createDefaultAdmin() {
        if (adminUserRepository.findByUsername("admin").isEmpty()) {
            AdminUser admin = new AdminUser("admin", passwordEncoder.encode("admin123"), "ADMIN");
            adminUserRepository.save(admin);
        }
    }

}
