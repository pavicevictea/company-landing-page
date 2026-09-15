package com.example.companylandingpage.dto;

public class AuthUserDto {

    private String name;

    private String username;

    private String role;

    public AuthUserDto(String name, String username, String role) {
        this.name = name;
        this.username = username;
        this.role = role;
    }

    public String getName() {
        return name;
    }

    public String getUsername() {
        return username;
    }

    public String getRole() {
        return role;
    }
}
