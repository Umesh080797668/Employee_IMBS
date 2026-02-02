import { Routes } from '@angular/router';
import { StudentListComponent } from './components/student-list/student-list.component';
import { StudentFormComponent } from './components/student-form/student-form.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { CourseFormComponent } from './components/course-form/course-form.component';
import { EnrollmentListComponent } from './components/enrollment-list/enrollment-list.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'students', component: StudentListComponent },
  { path: 'add-student', component: StudentFormComponent },
  { path: 'edit-student/:id', component: StudentFormComponent },
  { path: 'courses', component: CourseListComponent },
  { path: 'add-course', component: CourseFormComponent },
  { path: 'edit-course/:id', component: CourseFormComponent },
  { path: 'enrollments', component: EnrollmentListComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
