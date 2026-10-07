import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ContentManagementComponent } from './components/content-management/content-management.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { CustomerRequestsComponent } from './components/customer-requests/customer-requests.component';
import { RoleGuard } from './guards/role.guard';
import { ServiceManagementComponent } from './components/service-management/service-management.component';
import { ProjectManagementComponent } from './components/project-management/project-management.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin/content', component: ContentManagementComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['ADMIN'] } },
  { path: 'register', component: RegisterComponent},
  { path: 'dashboard', component: UserDashboardComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['USER'] } },
  { path: 'admin/customer-requests', component: CustomerRequestsComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['ADMIN', 'EMPLOYEE'] } },
  { path: 'admin/services', component: ServiceManagementComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['ADMIN'] } },
  { path: 'employee/projects', component: ProjectManagementComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['ADMIN', 'EMPLOYEE'] } },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }