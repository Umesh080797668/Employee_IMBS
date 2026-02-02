import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnrollmentService } from '../../services/enrollment.service';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-enrollment-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './enrollment-list.component.html',
  styleUrls: ['./enrollment-list.component.css']
})
export class EnrollmentListComponent implements OnInit {
  enrollments: any[] = [];
  students: Map<number, Student> = new Map();

  constructor(
    private enrollmentService: EnrollmentService,
    private studentService: StudentService
  ) { }

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.studentService.getStudents().subscribe(data => {
      data.forEach(s => {
        if (s.studentId !== undefined) {
             this.students.set(s.studentId, s);
        }
      });
      this.loadEnrollments();
    });
  }

  loadEnrollments(): void {
    this.enrollmentService.getAllEnrollments().subscribe(data => {
      this.enrollments = data;
    });
  }

  getStudentName(id: number): string {
    const student = this.students.get(id);
    return student ? student.fullName : 'Unknown Student';
  }
}
