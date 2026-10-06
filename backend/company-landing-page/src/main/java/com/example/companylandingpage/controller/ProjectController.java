package com.example.companylandingpage.controller;

import com.example.companylandingpage.dto.ProjectCreateRequest;
import com.example.companylandingpage.dto.ProjectDto;
import com.example.companylandingpage.dto.ProjectUpdateRequest;
import com.example.companylandingpage.model.ProjectStatus;
import com.example.companylandingpage.service.ProjectService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping
    public List<ProjectDto> getProjects(Authentication authentication) {
        return projectService.getProjects(authentication.getName(), getRole(authentication));
    }

    @GetMapping("/{id}")
    public ProjectDto getProject(@PathVariable Long id, Authentication authentication) {
        return projectService.getProject(id, authentication.getName(), getRole(authentication));
    }

    private void checkAdmin(Authentication authentication) {
        if (!authentication.getAuthorities().stream().anyMatch(authority -> authority.getAuthority().equals("ROLE_ADMIN"))) {
            throw new org.springframework.security.access.AccessDeniedException("Only administrators can perform this action");
        }
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ProjectDto createProject(@Valid @RequestBody ProjectCreateRequest request, Authentication authentication) {
        checkAdmin(authentication);
        return projectService.createProject(request);
    }

    @PutMapping("/{id}")
    public ProjectDto updateProject(@PathVariable Long id, @Valid @RequestBody ProjectUpdateRequest request, Authentication authentication) {
        checkAdmin(authentication);
        return projectService.updateProject(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteProject(@PathVariable Long id, Authentication authentication) {
        checkAdmin(authentication);
        projectService.deleteProject(id);
    }

    @PatchMapping("/{id}/status")
    public ProjectDto updateStatus(@PathVariable Long id, @RequestParam ProjectStatus status, Authentication authentication) {
        return projectService.updateEmployeeStatus(id, status, authentication.getName());
    }

    private String getRole(Authentication authentication) {
        return authentication.getAuthorities().stream().findFirst().map(authority -> authority.getAuthority().replace("ROLE_", "")).orElse("");
    }
}
