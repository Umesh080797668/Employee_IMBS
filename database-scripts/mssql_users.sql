-- Script to create Users table in MSSQL
CREATE TABLE Users (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Username NVARCHAR(50) NOT NULL UNIQUE,
    PasswordHash NVARCHAR(255) NOT NULL,
    Role NVARCHAR(20) DEFAULT 'User'
);

-- Insert a single admin record
-- Password is 'admin123' hashed with SHA256 and Base64 encoded
INSERT INTO Users (Username, PasswordHash, Role) VALUES ('admin', 'JAvlGPq9JyTdtvBO6x2llnRI1+gxwIyPqCKAn3THIKk=', 'Admin');
