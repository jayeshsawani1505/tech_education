const express = require('express');
const router = express.Router();
const examController = require('../controllers/examController');

// Routes for exam management
router.post('/', examController.addExam);           // Add a new exam
router.put('/:id', examController.updateExam);      // Update an exam by ID
router.delete('/:id', examController.deleteExam);   // Delete an exam by ID
router.get('/:id', examController.getExamById);     // Get an exam by ID
router.get('/', examController.getAllExams);        // Get all exams

module.exports = router;
