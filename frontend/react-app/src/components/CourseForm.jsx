import React, { useState, useEffect } from 'react';

const CourseForm = ({ onCancel, onSave, token, courseToEdit }) => {
  const [course, setCourse] = useState({
    courseName: '',
    description: '',
    duration: '',
    fee: '',
  });

  useEffect(() => {
    if (courseToEdit) {
      setCourse(courseToEdit);
    }
  }, [courseToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = courseToEdit 
        ? `${import.meta.env.VITE_COURSE_API_URL}/${courseToEdit.courseId}`
        : import.meta.env.VITE_COURSE_API_URL;
      
      const method = courseToEdit ? 'PUT' : 'POST';

      await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(course),
      });
      onSave();
    } catch (error) {
      console.error('Error saving course:', error);
    }
  };

  return (
    <div className="container mx-auto mt-8 max-w-2xl px-4">
      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="p-6" style={{ background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)' }}>
          <h2 className="text-3xl font-bold text-white" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
            {courseToEdit ? 'Edit Course' : 'Add New Course'}
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="p-8">
          <div className="space-y-5">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Course Name</label>
              <input
                type="text"
                className="w-full py-3 px-4 border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                name="courseName"
                placeholder="Enter course name"
                value={course.courseName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
              <textarea
                className="w-full py-3 px-4 border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                name="description"
                rows="4"
                placeholder="Enter course description"
                value={course.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Duration</label>
              <input
                type="text"
                className="w-full py-3 px-4 border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                name="duration"
                placeholder="e.g. 8 weeks"
                value={course.duration}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Fee</label>
              <input
                type="number"
                className="w-full py-3 px-4 border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                name="fee"
                placeholder="Enter course fee"
                value={course.fee}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="flex gap-4 mt-8">
            <button 
              type="submit" 
              className="flex-1 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              style={{ background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)' }}
            >
              {courseToEdit ? 'Update Course' : 'Save Course'}
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

export default CourseForm;
