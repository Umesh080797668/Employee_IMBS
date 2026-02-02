-- Script to create Courses table in MySQL
-- TODO: detailed table creation script
CREATE TABLE Courses (
    CourseId INT AUTO_INCREMENT PRIMARY KEY,
    CourseName VARCHAR(100) NOT NULL,
    Description TEXT,
    Duration VARCHAR(50),
    Fee DECIMAL(10, 2)
);
