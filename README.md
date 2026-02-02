# Employee/Student Management System

## Project Overview

This project is a comprehensive full-stack application designed to manage students and courses. It demonstrates a microservices-style architecture using Docker Compose to orchestrate multiple backend and frontend services.

The system is composed of:
- **.NET API**: Handles student data and authentication, backed by SQL Server.
- **Spring Boot API**: Handles course information, backed by MySQL.
- **Angular Application**: A frontend interface for managing students (communicates with the .NET API).
- **React Application**: A frontend interface for managing courses (communicates with the Spring Boot API).

## Repository Structure

```
├── backend/
│   ├── dotnet-api/       # .NET Core Web API (Student Service)
│   ├── springboot-api/   # Spring Boot Web API (Course Service)
├── frontend/
│   ├── angular-app/      # Angular frontend
│   ├── react-app/        # React frontend
├── database-scripts/     # SQL scripts for DB initialization
└── docker-compose.yml    # Docker services configuration
```

## Setup Instructions

### Option 1: Docker (Recommended)

This is the easiest way to run the entire application without installing language-specific dependencies.

**Prerequisites:**
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed on your machine.

**Steps:**

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Build and Start:**
   ```bash
   docker-compose up -d --build
   ```

3. **Verify Deployment:**
   ```bash
   docker-compose ps
   ```

### Option 2: Local Development (Manual Setup)

If you wish to run services individually or develop locally, follow these steps.

**Prerequisites:**
- **Node.js** (v18+)
- **.NET SDK** (v8.0)
- **Java JDK** (v17)
- **Local Databases** or usage of Docker for databases only.

#### Running Frontend Applications

**1. Angular App (Student Portal)**
```bash
cd frontend/angular-app

# Install Dependencies
npm install

# Run Development Server
ng serve
# Access at http://localhost:4200
```

**2. React App (Course Portal)**
```bash
cd frontend/react-app

# Install Dependencies
npm install

# Run Development Server
npm run dev
# Access at http://localhost:5173
```

#### Running Backend Applications

**1. .NET API**
```bash
cd backend/dotnet-api

# Restore Dependencies
dotnet restore

# Run API
dotnet run
# Access at http://localhost:5038 (and /swagger)
```

**2. Spring Boot API**
```bash
cd backend/springboot-api

# Build and Run (using Maven Wrapper)
./mvnw spring-boot:run
# Access at http://localhost:8081
```

---

## Configuration & Customization

### Environment Variables (.env Files)

Since `.env` files are excluded from git for security, **you must create them manually** if you are running the application locally (without Docker).

#### 1. React Frontend (.env)
**Location:** `frontend/react-app/.env`
Create this file to define API endpoints for the React application.

```dotenv
VITE_STUDENT_API_URL=http://localhost:5038/api/Students
VITE_COURSE_API_URL=http://localhost:8081/api/courses
VITE_AUTH_LOGIN_URL=http://localhost:5038/api/auth/login
```

#### 2. .NET API Backend (.env)
**Location:** `backend/dotnet-api/.env`
Required for database connection and JWT security.

```dotenv
DB_CONNECTION_STRING=Server=localhost;Database=StudentDB;User Id=sa;Password=your_password;TrustServerCertificate=True;
JWT_SECRET=your_super_secret_key_at_least_32_chars_long
```

#### 3. Spring Boot API Backend (.env)
**Location:** `backend/springboot-api/.env`
Required for database connection.

```dotenv
JWT_SECRET=your_super_secret_key_at_least_32_chars_long
DB_URL=jdbc:mysql://localhost:3306/CourseDB
DB_USERNAME=root
DB_PASSWORD=your_password
```

### File-Specific Configurations

If you are running locally or need to change API endpoints/database settings, edit these files:

| Service | File Path | Purpose |
|---------|-----------|---------|
| **Angular** | `frontend/angular-app/src/environments/environment.ts` | Set `studentApiUrl` and `courseApiUrl` for dev mode. |
| **React** | `frontend/react-app/.env` | Set `VITE_API_URL`s (prefixed with `VITE_`). |
| **.NET API** | `backend/dotnet-api/appsettings.json` | Database connection strings (`DefaultConnection`), Logging. |
| **Spring API** | `backend/springboot-api/src/main/resources/application.properties` | Port, Datasource URL, JPA settings. *Note: Defaults often use ${ENV_VAR} formats.* |

### 3. Database Initialization
SQL Scripts located in `/database-scripts` are automatically executed by Docker containers on first startup.
- `mssql_student.sql` - Seeds Student DB.
- `mysql_course.sql` - Seeds Course DB.

## Technologies Used

### Backend
- **.NET 8.0 (C#)**: Web API for Student Management.
- **Spring Boot 3.2.2 (Java 17)**: Web API for Course Management.
- **Entity Framework Core**: ORM for the .NET service.
- **Spring Data JPA**: ORM for the Spring Boot service.

### Frontend
- **Angular 17**: Client-side application for the Student portal.
- **React 18**: Client-side application (using Vite) for the Course portal.
- **Tailwind CSS**: Utility-first CSS framework (used in React app).

### Database
- **Microsoft SQL Server 2022**: Primary database for the .NET API.
- **MySQL 8.0**: Primary database for the Spring Boot API.

### DevOps & Infrastructure
- **Docker**: Containerization of all services.
- **Docker Compose**: Orchestration of the multi-container environment.

## Accessing the Application

| Service | Application | URL |
|---------|-------------|-----|
| **Frontend** | Angular App | [http://localhost:4200](http://localhost:4200) |
| **Frontend** | React App | [http://localhost:5173](http://localhost:5173) |
| **Backend** | .NET API (Student API) | [http://localhost:5038](http://localhost:5038) |
| **Backend** | Spring Boot API (Course API / Enrollment API) | [http://localhost:8081](http://localhost:8081) |
| **Database** | SQL Server (Host Port) | `localhost:1435` |
| **Database** | MySQL (Host Port) | `localhost:3307` |

### Default Credentials

**SQL Server (Database)**
- **Username**: `sa`
- **Password**: `Password123!`

**MySQL (Database)**
- **Username**: `root`
- **Password**: `root`

