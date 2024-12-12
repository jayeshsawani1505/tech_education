const dbconnection = require('../config/database');

// Add a new course
const addCourse = async (courseData) => {
    const { CourseName, IsActive, IsDeleted } = courseData;
    const query = 'INSERT INTO course (CourseName, IsActive, IsDeleted) VALUES (?, ?, ?)';
    const values = [CourseName, IsActive || 1, IsDeleted || 0];

    return new Promise((resolve, reject) => {
        dbconnection.query(query, values, (error, results) => {
            if (error) return reject(error);
            resolve({ CourseId: results.insertId });
        });
    });
};

// Update a course by ID
const updateCourse = async (CourseId, courseData) => {
    const { CourseName, IsActive, IsDeleted } = courseData;
    const query = 'UPDATE course SET CourseName = ?, IsActive = ?, IsDeleted = ? WHERE CourseId = ?';
    const values = [CourseName, IsActive, IsDeleted, CourseId];

    return new Promise((resolve, reject) => {
        dbconnection.query(query, values, (error, results) => {
            if (error) return reject(error);
            resolve({ affectedRows: results.affectedRows });
        });
    });
};

// Delete a course by ID (soft delete)
const deleteCourse = async (CourseId) => {
    const query = 'UPDATE course SET IsDeleted = 1 WHERE CourseId = ?';

    return new Promise((resolve, reject) => {
        dbconnection.query(query, [CourseId], (error, results) => {
            if (error) return reject(error);
            resolve({ affectedRows: results.affectedRows });
        });
    });
};

// Get a course by ID
const getCourseById = async (CourseId) => {
    const query = 'SELECT * FROM course WHERE CourseId = ? AND IsDeleted = 0';

    return new Promise((resolve, reject) => {
        dbconnection.query(query, [CourseId], (error, results) => {
            if (error) return reject(error);
            resolve(results[0]);
        });
    });
};

// Get all courses
const getAllCourses = async () => {
    const query = 'SELECT * FROM course WHERE IsDeleted = 0';

    return new Promise((resolve, reject) => {
        dbconnection.query(query, (error, results) => {
            if (error) return reject(error);
            resolve(results);
        });
    });
};

module.exports = {
    addCourse,
    updateCourse,
    deleteCourse,
    getCourseById,
    getAllCourses,
};
