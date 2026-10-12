# Company Landing Page & Management Platform

A full-stack web application developed as part of the **VOLTIX Internship Program**. The application combines a public company website with an internal management platform for users, employees, and administrators.

## Project Overview

The application provides a responsive company landing page and a management platform connected to a backend REST API and a database. It integrates user authentication, role-based access control, dynamic content and service management, customer request management, file and document management, and project tracking.

The frontend communicates with the backend to retrieve and manage data. The backend handles business logic, validation, authentication, authorization, file processing, and database operations.

## Main Features

### Company Website
- Responsive landing page with navigation, hero, services, about, contact, and footer sections.
- Dynamic service information retrieved from the backend.
- Website content managed through the administrative panel.

### Authentication and Authorization
- User registration, login, and logout.
- Session-based authentication.
- Password encoding and validation.
- Username and email availability checks.
- Role-based access control for regular users, employees, and administrators.
- Protected frontend routes and backend API endpoints.

### User Dashboard
- View and update account information.
- Submit contact requests while logged in.
- Attach files to contact requests when submitting a request.
- View and manage uploaded files according to user permissions.

### Customer Request Management
- Submit contact requests containing a subject and message, with optional file attachments.
- Store contact request information and associated file attachments.
- View, search, and filter customer requests by relevant criteria and status.
- Update request statuses to track their progress:
  - **PENDING** — the request has been submitted and is awaiting processing.
  - **IN_PROGRESS** — the request is being handled.
  - **RESOLVED** — the request has been completed.
- Restrict request management and status updates according to user roles and permissions.
- Access attached files when reviewing customer requests, where permitted.

### File Attachments
- Allow authenticated users to attach files to contact requests.
- Handle file uploads as part of the contact request submission process.
- Support viewing, downloading, and deleting uploaded files according to user permissions.
- Validate file uploads and handle invalid submissions.
- Restrict file access and operations based on authorization rules.

### Project Management
- Create, view, update, and delete projects according to user permissions.
- Assign projects to clients and one or more employees.
- Track project statuses: Not Started, In Progress, Completed, and On Hold.
- Allow employees to view their assigned projects and update their statuses.
- Display project information and statistics in the project dashboard.

### Search and Filtering
- Search for records using relevant information.
- Filter results using multiple criteria.
- Retrieve filtered results through the backend API instead of relying on hardcoded frontend data.

## Technologies Used

### Frontend
- Angular
- TypeScript
- HTML
- CSS

### Backend
- Java
- Spring Boot
- Spring Security
- Spring Data JPA
- Maven
- REST API

### Database and File Storage
- H2 Database
- JPA/Hibernate
- Backend file upload and document management

### Development Tools
- Node.js
- npm
- Angular CLI
- Git and GitHub

## Setup & Installation Instructions

### Prerequisites

Make sure the following tools are installed:

- Java JDK compatible with the backend project configuration
- Node.js and npm
- Git

### Clone the Repository

```bash
git clone https://github.com/pavicevictea/company-landing-page.git
cd company-landing-page
```

### Backend Setup

Navigate to the backend project directory:

```bash
cd backend/company-landing-page
```

The project includes a Maven Wrapper, so a separate Maven installation is not required.

On Windows, compile the backend using:

```powershell
.\mvnw.cmd clean compile
```

### Frontend Setup

Open a separate terminal in the repository root and navigate to the frontend directory:

```bash
cd frontend
npm install
```

## How to Run the Project

The backend and frontend must run simultaneously in separate terminals.

### 1. Start the Backend

In the first terminal, navigate to the backend project directory and run:

```powershell
cd backend/company-landing-page
.\mvnw.cmd spring-boot:run
```

The backend API is available at:

`http://localhost:8080`

### 2. Start the Frontend

In a second terminal, navigate to the frontend directory and run:

```bash
cd frontend
npm start
```

Open the URL displayed in the terminal to access the application. If the Angular development server uses its default port, the frontend will be available at:

`http://localhost:4200`

### 3. Database

The application uses an H2 database configured in the backend's `application.properties` file. Database location, persistence, and other settings depend on the current backend configuration.

### 4. Authentication and Access

Open the application in your browser. Public website pages can be accessed without signing in. Dashboard and management features require authentication and the appropriate user role.

The backend verifies authentication and permissions for protected operations. The frontend communicates with the backend API to authenticate users, retrieve data, and perform authorized actions.

## Test Accounts

The application supports three user roles: `USER`, `EMPLOYEE`, and `ADMIN`.

### Administrator Account

The administrator account is created automatically by the backend if it does not already exist in the database.

| Role | Username | Password |
|---|---|---|
| Administrator | `admin` | `admin123` |

### Employee Accounts

These employee accounts are created automatically by the backend through `DataInitializer` if they do not already exist in the database.

| Role | Username | Password |
|---|---|---|
| Employee | `employee` | `employee123` |
| Employee | `employee2` | `employee2123` |
| Employee | `employee3` | `employee3123` |

### Regular User Accounts

Regular users create their own accounts through the application's registration form. After registering, they can log in and access features available to the `USER` role.

**Note:** These accounts are intended for local development and testing only.

## Notes

- Keep the backend and frontend running while using the application.
- Make sure the frontend API URL and backend CORS configuration match the local development environment.
- Database configuration and stored data depend on the backend settings.
- Use test accounts and non-sensitive passwords during development.
