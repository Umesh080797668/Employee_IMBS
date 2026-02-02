import React, { useEffect, useState } from 'react';

const StudentList = ({ onAddStudent, onEditStudent, token }) => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

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

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await fetch(`${import.meta.env.VITE_STUDENT_API_URL}/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        fetchStudents();
      } catch (error) {
        console.error('Error deleting student:', error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">📚 Student List</h2>
          <button 
            className="text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center gap-2" 
            style={{ background: 'linear-gradient(90deg, #10b981 0%, #059669 100%)' }}
            onClick={onAddStudent}
          >
            Add Student
          </button>
        </div>
      </div>
      <div className="overflow-x-auto bg-white shadow-2xl rounded-2xl">
        <table className="min-w-full leading-normal">
          <thead>
            <tr style={{ background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)' }}>
              <th className="px-5 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">ID</th>
              <th className="px-5 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">Full Name</th>
              <th className="px-5 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">Email</th>
              <th className="px-5 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">Date of Birth</th>
              <th className="px-5 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">Contact</th>
              <th className="px-5 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr 
                key={student.studentId} 
                className="hover:bg-purple-50 transition-all duration-200"
                style={{ backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9fafb' }}
              >
                <td className="px-5 py-4 border-b border-purple-100 text-sm font-semibold text-purple-600">{student.studentId}</td>
                <td className="px-5 py-4 border-b border-purple-100 text-sm font-medium text-gray-800">{student.fullName}</td>
                <td className="px-5 py-4 border-b border-purple-100 text-sm text-gray-600">{student.email}</td>
                <td className="px-5 py-4 border-b border-purple-100 text-sm text-gray-600">{new Date(student.dateOfBirth).toLocaleDateString()}</td>
                <td className="px-5 py-4 border-b border-purple-100 text-sm text-gray-600">{student.contactNumber}</td>
                <td className="px-5 py-4 border-b border-purple-100 text-sm">
                  <div className="flex gap-2">
                    <button
                      className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                      onClick={() => onEditStudent(student)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                      onClick={() => handleDelete(student.studentId)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentList;
