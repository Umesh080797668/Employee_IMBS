import React, { useEffect, useState } from 'react';

const EnrollmentList = ({ token }) => {
  const [enrollments, setEnrollments] = useState([]);
  const [students, setStudents] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch Enrollments
      const enrollResponse = await fetch(import.meta.env.VITE_COURSE_API_URL.replace('/courses', '/enrollments'), {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const enrollData = await enrollResponse.json();
      setEnrollments(enrollData);

      // Fetch Students
      const studentResponse = await fetch(import.meta.env.VITE_STUDENT_API_URL, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const studentData = await studentResponse.json();
      
      const studentMap = {};
      studentData.forEach(s => {
        studentMap[s.studentId] = s;
      });
      setStudents(studentMap);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="container mx-auto mt-4 px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Student Enrollments</h2>
      </div>

      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead>
            <tr style={{ background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)' }}>
              <th className="px-5 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">Enrollment ID</th>
              <th className="px-5 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">Student Name</th>
              <th className="px-5 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">Course Name</th>
              <th className="px-5 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">Date</th>
              <th className="px-5 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">Fee</th>
            </tr>
          </thead>
          <tbody>
            {enrollments.map((enrollment, index) => (
              <tr 
                key={enrollment.id} 
                className="hover:bg-purple-50 transition-all duration-200"
                style={{ backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9fafb' }}
              >
                <td className="px-5 py-4 border-b border-purple-100 text-sm font-semibold text-purple-600">#{enrollment.id}</td>
                <td className="px-5 py-4 border-b border-purple-100 text-sm font-bold text-gray-800">
                  {students[enrollment.studentId]?.fullName || 'Unknown Student'}
                </td>
                <td className="px-5 py-4 border-b border-purple-100 text-sm">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold">
                    {enrollment.course.courseName}
                  </span>
                </td>
                <td className="px-5 py-4 border-b border-purple-100 text-sm text-gray-600">
                  {new Date(enrollment.enrollmentDate).toLocaleDateString()}
                </td>
                <td className="px-5 py-4 border-b border-purple-100 text-sm text-gray-600">
                  ${enrollment.course.fee}
                </td>
              </tr>
            ))}
            {enrollments.length === 0 && (
              <tr>
                <td colSpan="5" className="px-5 py-8 text-center text-gray-400">
                  No enrollments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EnrollmentList;
