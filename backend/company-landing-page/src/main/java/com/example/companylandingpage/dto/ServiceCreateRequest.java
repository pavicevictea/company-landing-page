package com.example.companylandingpage.dto;

import jakarta.validation.constraints.NotBlank;

public class ServiceCreateRequest {

    @NotBlank
    private String title;

    @NotBlank
    private String description;

    public ServiceCreateRequest() {}

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
