package com.employee.course_api.controller;

import com.employee.course_api.model.Course;
import com.employee.course_api.model.Enrollment;
import com.employee.course_api.repository.CourseRepository;
import com.employee.course_api.repository.EnrollmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/enrollments")
public class EnrollmentController {

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @Autowired
    private CourseRepository courseRepository;

    @GetMapping
    public List<Enrollment> getAllEnrollments() {
        return enrollmentRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Enrollment> enrollStudent(@RequestBody EnrollmentRequest request) {
        Optional<Course> courseOptional = courseRepository.findById(request.getCourseId());
        
        if (courseOptional.isPresent()) {
            Enrollment enrollment = new Enrollment();
            enrollment.setStudentId(request.getStudentId());
            enrollment.setCourse(courseOptional.get());
            enrollment.setEnrollmentDate(LocalDate.now());
            
            Enrollment savedEnrollment = enrollmentRepository.save(enrollment);
            return ResponseEntity.ok(savedEnrollment);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/student/{studentId}")
    public List<Enrollment> getStudentEnrollments(@PathVariable Long studentId) {
        return enrollmentRepository.findByStudentId(studentId);
    }
    
    @GetMapping("/course/{courseId}")
    public List<Enrollment> getCourseEnrollments(@PathVariable Long courseId) {
        return enrollmentRepository.findByCourse_CourseId(courseId);
    }

    public static class EnrollmentRequest {
        private Long studentId;
        private Long courseId;

        public Long getStudentId() { return studentId; }
        public void setStudentId(Long studentId) { this.studentId = studentId; }
        public Long getCourseId() { return courseId; }
        public void setCourseId(Long courseId) { this.courseId = courseId; }
    }
}
