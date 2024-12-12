const courseService = require('../services/courseService');

// Add a new course
const addCourse = async (req, res) => {
    try {
        const courseData = req.body;
        const result = await courseService.addCourse(courseData);
        res.status(201).json({ message: "Course added successfully", data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a course by ID
const updateCourse = async (req, res) => {
    try {
        const CourseId = req.params.id;
        const courseData = req.body;
        const result = await courseService.updateCourse(CourseId, courseData);
        res.status(200).json({ message: "Course updated successfully", data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a course by ID
const deleteCourse = async (req, res) => {
    try {
        const CourseId = req.params.id;
        const result = await courseService.deleteCourse(CourseId);
        res.status(200).json({ message: "Course deleted successfully", data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a course by ID
const getCourseById = async (req, res) => {
    try {
        const CourseId = req.params.id;
        const result = await courseService.getCourseById(CourseId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all courses
const getAllCourses = async (req, res) => {
    try {
        const result = await courseService.getAllCourses();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    addCourse,
    updateCourse,
    deleteCourse,
    getCourseById,
    getAllCourses,
};
