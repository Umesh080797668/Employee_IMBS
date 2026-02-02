import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent implements OnInit {
  courseForm: FormGroup;
  isEditing = false;
  courseId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.courseForm = this.fb.group({
      courseName: ['', Validators.required],
      description: ['', Validators.required],
      duration: ['', Validators.required],
      fee: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditing = true;
        this.courseId = +params['id'];
        this.loadCourse(this.courseId);
      }
    });
  }

  loadCourse(id: number): void {
    this.courseService.getCourse(id).subscribe(course => {
      this.courseForm.patchValue(course);
    });
  }

  onSubmit(): void {
    if (this.courseForm.valid) {
      const course: Course = this.courseForm.value;
      if (this.isEditing && this.courseId) {
        this.courseService.updateCourse(this.courseId, course).subscribe(() => {
          this.router.navigate(['/courses']);
        });
      } else {
        this.courseService.createCourse(course).subscribe(() => {
          this.router.navigate(['/courses']);
        });
      }
    }
  }

  cancel(): void {
    this.router.navigate(['/courses']);
  }
}
