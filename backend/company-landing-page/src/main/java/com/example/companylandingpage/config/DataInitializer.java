package com.example.companylandingpage.config;

import com.example.companylandingpage.model.User;
import com.example.companylandingpage.repository.UserRepository;
import com.example.companylandingpage.service.AdminUserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Bean
    CommandLineRunner initializeAdmin(AdminUserService adminUserService) {
        return args -> adminUserService.createDefaultAdmin();
    }


    @Bean
    CommandLineRunner initializeUsers(AdminUserService adminUserService) {
        return args -> {
            adminUserService.createDefaultAdmin();

            if (userRepository.findByUsername("employee").isEmpty()) {
                User employee = new User(
                        "Company Employee",
                        "employee",
                        "employee@example.com",
                        passwordEncoder.encode("employee123"),
                        "EMPLOYEE"
                );
                userRepository.save(employee);
            }
            if (userRepository.findByUsername("employee2").isEmpty()) {
                User employee2 = new User(
                        "Company Employee 2",
                        "employee2",
                        "employee2@example.com",
                        passwordEncoder.encode("employee2123"),
                        "EMPLOYEE"
                );
                userRepository.save(employee2);
            }
            if (userRepository.findByUsername("employee3").isEmpty()) {
                User employee3 = new User(
                        "Company Employee 3",
                        "employee3",
                        "employee3@example.com",
                        passwordEncoder.encode("employee3123"),
                        "EMPLOYEE"
                );
                userRepository.save(employee3);
            }
        };
    }


}
