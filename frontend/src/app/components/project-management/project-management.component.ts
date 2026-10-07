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

  constructor(
    private projectService: ProjectService,
    public authService: AuthService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.loadProjects();
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

}
