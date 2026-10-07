package com.example.companylandingpage.service;

import com.example.companylandingpage.dto.ProjectCreateRequest;
import com.example.companylandingpage.dto.ProjectDto;
import com.example.companylandingpage.dto.ProjectUpdateRequest;
import com.example.companylandingpage.dto.ProjectUserDto;
import com.example.companylandingpage.model.Project;
import com.example.companylandingpage.model.ProjectStatus;
import com.example.companylandingpage.model.User;
import com.example.companylandingpage.repository.ProjectRepository;
import com.example.companylandingpage.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    public ProjectService(ProjectRepository projectRepository, UserRepository userRepository) {
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
    }

    public List<ProjectDto> getProjects(String username, String role) {
        List<Project> projects;
        if ("ADMIN".equals(role)) {
            projects = projectRepository.findAll();
        } else {
            projects = projectRepository.findByTeamMembersUsernameOrderByUpdatedAtDesc(username);
        }
        return projects.stream().map(this::toDto).collect(Collectors.toList());
    }

    public ProjectDto getProject(Long id, String username, String role) {
        Project project = findProject(id);
        checkProjectAccess(project, username, role);
        return toDto(project);
    }

    public ProjectDto createProject(ProjectCreateRequest request) {
        User client = getClient(request.getClientId());
        Set<User> teamMembers = getEmployees(request.getTeamMemberIds());
        Project project = new Project(request.getName().trim(), request.getDescription(), request.getStatus(), client);
        project.setTeamMember(teamMembers);
        return toDto(projectRepository.save(project));
    }

    public ProjectDto updateProject(Long id, ProjectUpdateRequest request) {
        Project project = findProject(id);
        User client = getClient(request.getClientId());
        Set<User> teamMembers = getEmployees(request.getTeamMemberIds());
        project.setName(request.getName().trim());
        project.setDescription(request.getDescription());
        project.setStatus(request.getStatus());
        project.setClient(client);
        project.setTeamMember(teamMembers);
        return toDto(projectRepository.save(project));
    }

    public void deleteProject(Long id) {
        Project project = findProject(id);
        projectRepository.delete(project);
    }

    public ProjectDto updateEmployeeStatus(Long id, ProjectStatus status, String username) {
        Project project = findProject(id);
        checkProjectAccess(project, username, "EMPLOYEE");
        project.setStatus(status);
        return toDto(projectRepository.save(project));
    }

    private Project findProject(Long id) {
        return projectRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Project not found"));
    }

    private User getClient(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Client not found"));
        if (!"USER".equals(user.getRole())) {
            throw new IllegalArgumentException("Selected user is not a client");
        }
        return user;
    }

    private Set<User> getEmployees(List<Long> ids) {
        if (ids == null || ids.isEmpty()) {
            return new HashSet<>();
        }
        List<User> users = userRepository.findAllById(ids);
        if (users.size() != ids.size()) {
            throw new IllegalArgumentException("One or more team members were not found");
        }
        for (User user : users) {
            if (!"EMPLOYEE".equals(user.getRole())) {
                throw new IllegalArgumentException("Only employees can be assigned to projects");
            }
        }
        return new HashSet<>(users);
    }

    private void checkProjectAccess(Project project, String username, String role) {
        if ("ADMIN".equals(role)) {
            return;
        }
        boolean assigned = project.getTeamMember().stream().anyMatch(user -> user.getUsername().equals(username));
        if (!assigned) {
            throw new org.springframework.security.access.AccessDeniedException("You do not have access to this project");
        }
    }

    private ProjectDto toDto(Project project) {
        ProjectUserDto client = toUserDto(project.getClient());
        List<ProjectUserDto> teamMembers = project.getTeamMember().stream().map(this::toUserDto).collect(Collectors.toList());
        return new ProjectDto(
                project.getId(),
                project.getName(),
                project.getDescription(),
                project.getStatus(),
                client,
                teamMembers,
                project.getCreatedAt(),
                project.getUpdatedAt()
        );
    }

    private ProjectUserDto toUserDto(User user) {
        return new ProjectUserDto(
                user.getId(),
                user.getName(),
                user.getUsername(),
                user.getEmail(),
                user.getRole()
        );
    }

    public List<ProjectUserDto> getClients() {
        return userRepository.findAll()
                .stream()
                .filter(user -> "USER".equals(user.getRole()))
                .map(this::toUserDto)
                .collect(Collectors.toList());
    }

    public List<ProjectUserDto> getEmployees() {
        return userRepository.findAll()
                .stream()
                .filter(user -> "EMPLOYEE".equals(user.getRole()))
                .map(this::toUserDto)
                .collect(Collectors.toList());
    }
}
