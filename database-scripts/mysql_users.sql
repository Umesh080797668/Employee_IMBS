-- Script to create Users table in MySQL
CREATE TABLE Users (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(50) NOT NULL UNIQUE,
    PasswordHash VARCHAR(255) NOT NULL,
    Role VARCHAR(20) DEFAULT 'User'
);

-- Insert a single admin record
-- Password is 'admin123' hashed with SHA256 and Base64 encoded
INSERT INTO Users (Username, PasswordHash, Role) VALUES ('admin', 'JAvlGPq9JyTdtvBO6x2llnRI1+gxwIyPqCKAn3THIKk=', 'Admin');
