import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {
  studentForm: FormGroup;
  isEditMode = false;
  studentId?: number;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.studentForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dateOfBirth: ['', Validators.required],
      contactNumber: ['']
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.studentId = +id;
      this.studentService.getStudent(this.studentId).subscribe(student => {
        this.studentForm.patchValue({
          fullName: student.fullName,
          email: student.email,
          dateOfBirth: student.dateOfBirth.toString().split('T')[0], // Format for input type=date
          contactNumber: student.contactNumber
        });
      });
    }
  }

  onSubmit(): void {
    if (this.studentForm.valid) {
      const student: Student = {
        ...this.studentForm.value,
        studentId: this.isEditMode ? this.studentId : 0
      };

      if (this.isEditMode) {
        this.studentService.updateStudent(student).subscribe(() => {
          this.router.navigate(['/students']);
        });
      } else {
        this.studentService.createStudent(student).subscribe(() => {
          this.router.navigate(['/students']);
        });
      }
    }
  }
}
