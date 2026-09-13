package com.example.companylandingpage.config;

import com.example.companylandingpage.service.AdminUserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initializeAdmin(AdminUserService adminUserService) {
        return args -> adminUserService.createDefaultAdmin();
    }
}
