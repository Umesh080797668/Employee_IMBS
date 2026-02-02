import React, { useEffect, useState } from 'react';

const CourseList = ({ token, onAddCourse, onEditCourse }) => {
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [selectedStudentId, setSelectedStudentId] = useState('');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_COURSE_API_URL, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          console.error("Authentication failed");
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_STUDENT_API_URL, {
        headers: {
            'Authorization': `Bearer ${token}` 
        }
      });
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const openEnrollModal = (courseId) => {
    setSelectedCourseId(courseId);
    setShowEnrollModal(true);
    fetchStudents();
  };

  const closeEnrollModal = () => {
    setShowEnrollModal(false);
    setSelectedCourseId(null);
    setSelectedStudentId('');
  };

  const handleEnroll = async () => {
    if (!selectedStudentId) return;

    try {
      const enrollmentUrl = import.meta.env.VITE_COURSE_API_URL.replace('/courses', '/enrollments');
      await fetch(enrollmentUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          studentId: selectedStudentId,
          courseId: selectedCourseId
        })
      });
      alert('Enrollment successful!');
      closeEnrollModal();
    } catch (error) {
      console.error('Error enrolling student:', error);
      alert('Enrollment failed');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await fetch(`${import.meta.env.VITE_COURSE_API_URL}/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        fetchCourses();
      } catch (error) {
        console.error('Error deleting course:', error);
      }
    }
  };

  return (
    <div className="container mx-auto mt-4 px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 mb-8 flex justify-between items-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Available Courses</h2>
        <button 
          className="text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center gap-2" 
          style={{ background: 'linear-gradient(90deg, #10b981 0%, #059669 100%)' }}
          onClick={onAddCourse}
        >
          Add Course
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course, index) => {
          const gradients = [
            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
            'linear-gradient(135deg, #30cfd0 0%, #330867 100%)'
          ];
          const gradient = gradients[index % gradients.length];
          
          return (
            <div 
              className="rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-3xl" 
              key={course.courseId}
              style={{ background: gradient }}
            >
              <div className="p-6 text-white">
                <h5 className="text-2xl font-bold mb-3" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>{course.courseName}</h5>
                <p className="mb-4 text-white/90">{course.description}</p>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 mb-4">
                  <p className="text-sm mb-2 flex items-center gap-2">
                    <span className="font-bold">Duration:</span> {course.duration}
                  </p>
                  <p className="text-sm flex items-center gap-2">
                    <span className="font-bold">Fee:</span> ${course.fee}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button 
                    className="flex-1 bg-white text-purple-600 hover:bg-purple-50 font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    onClick={() => openEnrollModal(course.courseId)}
                  >
                    Enroll
                  </button>
                  <button 
                    className="flex-1 bg-white/30 hover:bg-white/50 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 backdrop-blur-sm"
                    onClick={() => onEditCourse(course)}
                  >
                    Edit
                  </button>
                  <button 
                    className="flex-1 bg-red-500/80 hover:bg-red-500 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 backdrop-blur-sm"
                    onClick={() => handleDelete(course.courseId)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {showEnrollModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Enroll Student</h3>
            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2">Select Student</label>
              <select 
                className="w-full p-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-500"
                value={selectedStudentId}
                onChange={(e) => setSelectedStudentId(e.target.value)}
              >
                <option value="">-- Select Student --</option>
                {students.map(student => (
                  <option key={student.studentId} value={student.studentId}>
                    {student.fullName}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-4">
              <button 
                className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                onClick={handleEnroll}
                disabled={!selectedStudentId}
              >
                Confirm
              </button>
              <button 
                className="flex-1 bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-lg hover:bg-gray-300 transition-all"
                onClick={closeEnrollModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseList;
