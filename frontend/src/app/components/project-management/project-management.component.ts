import { Component, OnInit } from '@angular/core';
import { Project, ProjectService } from 'src/app/services/project.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-management',
  templateUrl: './project-management.component.html',
  styleUrls: ['./project-management.component.css']
})
export class ProjectManagementComponent implements OnInit {

  projects: Project[] = [];
  isLoading = true;
  errorMessage = '';
  successMessage = '';

  clients: any[] = [];
  employees: any[] = [];

  isCreating = false;
  isSaving = false;

  newProject = {
    name: '',
    description: '',
    status: 'NOT_STARTED',
    clientId: null as number | null,
    teamMemberIds: [] as number[]
  };

  editingProjectId: number | null = null;
  editProject: any = {
    name: '',
    description: '',
    status: 'NOT_STARTED',
    clientId: null,
    teamMemberIds: []
  };

  constructor(
    private projectService: ProjectService,
    public authService: AuthService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.loadProjects();
    if (this.authService.isAdmin()) {
      this.loadProjectUsers();
    }
  }

  loadProjects(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.projectService.getProjects().subscribe(
      projects => {
        this.projects = projects;
        this.isLoading = false;
      },
      () => {
        this.errorMessage = 'Unable to load projects.';
        this.isLoading = false;
      }
    );
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  isEmployee(): boolean {
    return this.authService.isEmployee();
  }

  getStatusLabel(status: string): string {
    return status.replace('_', ' ');
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/']).then(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    });
  }

  loadProjectUsers(): void {
    this.projectService.getClients().subscribe(
      clients => {
        this.clients = clients;
      },
      () => {
        this.errorMessage = 'Unable to load clients.';
      }
    );

    this.projectService.getEmployees().subscribe(
      employees => {
        this.employees = employees;
      },
      () => {
        this.errorMessage = 'Unable to load employees.';
      }
    );
  }

  startCreating(): void {
    this.isCreating = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.newProject = {
      name: '',
      description: '',
      status: 'NOT_STARTED',
      clientId: null,
      teamMemberIds: []
    };
  }

  cancelCreating(): void {
    this.isCreating = false;
  }

  toggleEmployee(id: number): void {
    const index = this.newProject.teamMemberIds.indexOf(id);

    if (index === -1) {
      this.newProject.teamMemberIds.push(id);
    } else {
      this.newProject.teamMemberIds.splice(index, 1);
    }
  }

  isEmployeeSelected(id: number): boolean {
    return this.newProject.teamMemberIds.indexOf(id) !== -1;
  }

  createProject(): void {
    if (!this.newProject.name.trim() || !this.newProject.clientId) {
      this.errorMessage = 'Project name and client are required.';
      return;
    }

    this.isSaving = true;
    this.errorMessage = '';

    this.projectService.createProject({
      name: this.newProject.name.trim(),
      description: this.newProject.description,
      status: this.newProject.status,
      clientId: this.newProject.clientId,
      teamMemberIds: this.newProject.teamMemberIds
    }).subscribe(
      () => {
        this.isSaving = false;
        this.isCreating = false;
        this.successMessage = 'Project created successfully.';
        this.loadProjects();
      },
      () => {
        this.isSaving = false;
        this.errorMessage = 'Unable to create project.';
      }
    );
  }

  startEditing(project: Project): void {
    this.editingProjectId = project.id;
    this.editProject = {
      name: project.name,
      description: project.description,
      status: project.status,
      clientId: project.client.id,
      teamMemberIds: project.teamMembers.map(member => member.id)
    };
    this.errorMessage = '';
    this.successMessage = '';
  }

  cancelEditing(): void {
    this.editingProjectId = null;
  }

  toggleEditEmployee(id: number): void {
    const index = this.editProject.teamMemberIds.indexOf(id);

    if (index === -1) {
      this.editProject.teamMemberIds.push(id);
    } else {
      this.editProject.teamMemberIds.splice(index, 1);
    }
  }

  isEditEmployeeSelected(id: number): boolean {
    return this.editProject.teamMemberIds.indexOf(id) !== -1;
  }

  saveProject(): void {
    if (!this.editProject.name.trim() || !this.editProject.clientId) {
      this.errorMessage = 'Project name and client are required.';
      return;
    }

    this.isSaving = true;
    this.projectService.updateProject(
      this.editingProjectId as number,
      {
        name: this.editProject.name.trim(),
        description: this.editProject.description,
        status: this.editProject.status,
        clientId: this.editProject.clientId,
        teamMemberIds: this.editProject.teamMemberIds
      }
    ).subscribe(
      () => {
        this.isSaving = false;
        this.editingProjectId = null;
        this.successMessage = 'Project updated successfully.';
        this.loadProjects();
      },
      () => {
        this.isSaving = false;
        this.errorMessage = 'Unable to update project.';
      }
    );
  }

  deleteProject(project: Project): void {
    if (!confirm('Are you sure you want to delete this project?')) {
      return;
    }

    this.projectService.deleteProject(project.id).subscribe(
      () => {
        this.successMessage = 'Project deleted successfully.';
        this.loadProjects();
      },
      () => {
        this.errorMessage = 'Unable to delete project.';
      }
    );
  }

}
