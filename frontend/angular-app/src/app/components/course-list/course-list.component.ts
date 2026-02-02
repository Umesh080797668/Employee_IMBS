import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../../services/course.service';
import { StudentService } from '../../services/student.service';
import { EnrollmentService } from '../../services/enrollment.service';
import { Course } from '../../models/course.model';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  courses: Course[] = [];
  students: Student[] = [];
  showEnrollModal = false;
  selectedCourseForEnrollment: Course | null = null;
  selectedStudentId: number | null = null;

  constructor(
    private courseService: CourseService, 
    private studentService: StudentService,
    private enrollmentService: EnrollmentService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadCourses();
    this.loadStudents();
  }

  loadCourses(): void {
    this.courseService.getCourses().subscribe(data => {
      this.courses = data;
    });
  }

  loadStudents(): void {
    this.studentService.getStudents().subscribe(data => {
      this.students = data;
    });
  }

  addCourse(): void {
    this.router.navigate(['/add-course']);
  }

  editCourse(id: number): void {
    this.router.navigate(['/edit-course', id]);
  }

  deleteCourse(id: number): void {
    if (confirm('Are you sure you want to delete this course?')) {
      this.courseService.deleteCourse(id).subscribe(() => {
        this.loadCourses();
      });
    }
  }

  openEnrollModal(course: Course): void {
    this.selectedCourseForEnrollment = course;
    this.showEnrollModal = true;
    this.selectedStudentId = null;
  }

  closeEnrollModal(): void {
    this.showEnrollModal = false;
    this.selectedCourseForEnrollment = null;
  }

  confirmEnrollment(): void {
    if (this.selectedCourseForEnrollment && this.selectedStudentId) {
      this.enrollmentService.enrollStudent(this.selectedStudentId, this.selectedCourseForEnrollment.courseId!)
        .subscribe({
          next: () => {
            alert('Enrollment successful!');
            this.closeEnrollModal();
          },
          error: (err) => {
            console.error(err);
            alert('Enrollment failed.');
          }
        });
    }
  }

  getGradient(index: number): string {
    const gradients = [
      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      'linear-gradient(135deg, #30cfd0 0%, #330867 100%)'
    ];
    return gradients[index % gradients.length];
  }
}
