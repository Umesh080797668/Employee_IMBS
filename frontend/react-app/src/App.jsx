import React, { useState, useEffect } from 'react';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';
import CourseList from './components/CourseList';
import CourseForm from './components/CourseForm';
import EnrollmentList from './components/EnrollmentList';
import Login from './components/Login';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState('students'); // 'students', 'add-student', 'edit-student', 'courses', 'add-course', 'edit-course'
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Student Handlers
  const handleEditStudent = (student) => {
    setSelectedStudent(student);
    setView('edit-student');
  };

  const handleSaveStudent = () => {
    setSelectedStudent(null);
    setView('students');
  };

  const handleCancelStudent = () => {
    setSelectedStudent(null);
    setView('students');
  };

  // Course Handlers
  const handleEditCourse = (course) => {
    setSelectedCourse(course);
    setView('edit-course');
  };

  const handleSaveCourse = () => {
    setSelectedCourse(null);
    setView('courses');
  };

  const handleCancelCourse = () => {
    setSelectedCourse(null);
    setView('courses');
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  const renderView = () => {
    switch (view) {
      case 'students':
        return (
          <StudentList 
            token={user.token} 
            onAddStudent={() => { setSelectedStudent(null); setView('add-student'); }} 
            onEditStudent={handleEditStudent}
          />
        );
      case 'add-student':
      case 'edit-student':
        return (
          <StudentForm
            token={user.token}
            studentToEdit={selectedStudent}
            onCancel={handleCancelStudent}
            onSave={handleSaveStudent}
          />
        );
      case 'courses':
        return (
          <CourseList 
            token={user.token} 
            onAddCourse={() => { setSelectedCourse(null); setView('add-course'); }}
            onEditCourse={handleEditCourse}
          />
        );
      case 'add-course':
      case 'edit-course':
        return (
          <CourseForm
            token={user.token}
            courseToEdit={selectedCourse}
            onCancel={handleCancelCourse}
            onSave={handleSaveCourse}
          />
        );
      case 'enrollments':
        return <EnrollmentList token={user.token} />;
      default:
        return <StudentList token={user.token} />;
    }
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <nav className="text-white p-4 shadow-lg" style={{ background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)' }}>
        <div className="container mx-auto flex justify-between items-center">
          <a className="text-2xl font-bold flex items-center gap-2" href="#" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
            <span className="text-3xl">🎓</span>
            EMS React
          </a>
          <div className="flex gap-2">
            <button
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                view === 'students' 
                  ? 'bg-white text-purple-600 shadow-lg transform scale-105' 
                  : 'bg-purple-500 hover:bg-purple-400 hover:shadow-md'
              }`}
              onClick={() => setView('students')}
            >
              Students
            </button>
            <button
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                view === 'courses' 
                  ? 'bg-white text-purple-600 shadow-lg transform scale-105' 
                  : 'bg-purple-500 hover:bg-purple-400 hover:shadow-md'
              }`}
              onClick={() => setView('courses')}
            >
              Courses
            </button>
            <button
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                view === 'enrollments' 
                  ? 'bg-white text-purple-600 shadow-lg transform scale-105' 
                  : 'bg-purple-500 hover:bg-purple-400 hover:shadow-md'
              }`}
              onClick={() => setView('enrollments')}
            >
              Enrollments
            </button>
            <button
              className="px-4 py-2 rounded-lg font-semibold bg-red-500 hover:bg-red-400 transition-all duration-300 hover:shadow-md"
              onClick={handleLogout}
            >
              Logout ({user.username})
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto py-8 px-4">{renderView()}</div>
    </div>
  );
}

export default App;
