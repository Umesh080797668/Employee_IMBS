using Microsoft.EntityFrameworkCore;
using StudentApi.Models;

namespace StudentApi.Data
{
    public class StudentContext : DbContext
    {
        public StudentContext(DbContextOptions<StudentContext> options) : base(options) { }

        public DbSet<Student> Students { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Student>().HasData(
                new Student { StudentId = 1, FullName = "John Doe", Email = "john@example.com", DateOfBirth = new DateTime(2000, 1, 1), ContactNumber = "1234567890" },
                new Student { StudentId = 2, FullName = "Jane Smith", Email = "jane@example.com", DateOfBirth = new DateTime(2001, 2, 2), ContactNumber = "0987654321" }
            );

            // Production: Users should be added via secure management scripts, not seeded in code with hardcoded credentials.
        }
    }
}
