const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// Routes for course management
router.post('/', courseController.addCourse);           // Add a new course
router.put('/:id', courseController.updateCourse);      // Update a course by ID
router.delete('/:id', courseController.deleteCourse);   // Delete a course by ID
router.get('/:id', courseController.getCourseById);     // Get a course by ID
router.get('/', courseController.getAllCourses);        // Get all courses

module.exports = router;
