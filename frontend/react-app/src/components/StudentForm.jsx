import React, { useState, useEffect } from 'react';

const StudentForm = ({ onCancel, onSave, token, studentToEdit }) => {
  const [student, setStudent] = useState({
    fullName: '',
    email: '',
    dateOfBirth: '',
    contactNumber: '',
  });

  useEffect(() => {
    if (studentToEdit) {
      setStudent({
        ...studentToEdit,
        dateOfBirth: studentToEdit.dateOfBirth.split('T')[0] // Format date for input
      });
    }
  }, [studentToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = studentToEdit 
        ? `${import.meta.env.VITE_STUDENT_API_URL}/${studentToEdit.studentId}`
        : import.meta.env.VITE_STUDENT_API_URL;
      
      const method = studentToEdit ? 'PUT' : 'POST';

      await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(student),
      });
      onSave();
    } catch (error) {
      console.error('Error saving student:', error);
    }
  };

  return (
    <div className="container mx-auto mt-8 max-w-2xl px-4">
      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="p-6" style={{ background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)' }}>
          <h2 className="text-3xl font-bold text-white" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
            {studentToEdit ? 'Edit Student' : 'Add New Student'}
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="p-8">
          <div className="space-y-5">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
              <input
                type="text"
                className="w-full py-3 px-4 border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                name="fullName"
                placeholder="Enter full name"
                value={student.fullName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
              <input
                type="email"
                className="w-full py-3 px-4 border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                name="email"
                placeholder="Enter email address"
                value={student.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Date of Birth</label>
              <input
                type="date"
                className="w-full py-3 px-4 border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                name="dateOfBirth"
                value={student.dateOfBirth}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Contact Number</label>
              <input
                type="text"
                className="w-full py-3 px-4 border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                name="contactNumber"
                placeholder="Enter contact number"
                value={student.contactNumber}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex gap-4 mt-8">
            <button 
              type="submit" 
              className="flex-1 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              style={{ background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)' }}
            >
              Save Student
            </button>
            <button
              type="button"
              className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentForm;
