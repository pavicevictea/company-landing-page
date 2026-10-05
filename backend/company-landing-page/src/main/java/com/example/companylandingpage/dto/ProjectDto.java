package com.example.companylandingpage.dto;

import com.example.companylandingpage.model.ProjectStatus;

import java.time.LocalDateTime;
import java.util.List;

public class ProjectDto {

    private Long id;

    private String name;

    private String description;

    private ProjectStatus status;

    private ProjectUserDto client;

    private List<ProjectUserDto> teamMembers;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    public ProjectDto(Long id, String name, String description, ProjectStatus status, ProjectUserDto client, List<ProjectUserDto> teamMembers, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.status = status;
        this.client = client;
        this.teamMembers = teamMembers;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public ProjectStatus getStatus() {
        return status;
    }

    public ProjectUserDto getClient() {
        return client;
    }

    public List<ProjectUserDto> getTeamMembers() {
        return teamMembers;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
}
