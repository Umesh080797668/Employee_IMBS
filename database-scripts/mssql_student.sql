-- Script to create Students table in MSSQL
CREATE TABLE Students (
    StudentId INT IDENTITY(1,1) PRIMARY KEY,
    FullName NVARCHAR(100) NOT NULL,
    Email NVARCHAR(100) NOT NULL,
    DateOfBirth DATE,
    ContactNumber NVARCHAR(20)
);
