const express = require('express');
const router = express.Router();
const studentExamDetailsController = require('../controllers/studentExamDetailsController');

// Routes for student exam details management
router.post('/', studentExamDetailsController.addStudentExamDetails);            // Add new student exam details
router.put('/:id', studentExamDetailsController.updateStudentExamDetails);     // Update student exam details by ID
router.delete('/:id', studentExamDetailsController.deleteStudentExamDetails);  // Delete student exam details by ID
router.get('/:id', studentExamDetailsController.getStudentExamDetailsById);   // Get student exam details by ID
router.get('/student/:id', studentExamDetailsController.getStudentExamDetailsByStudentId);   // Get student exam details by ID
router.get('/BranchId/:id', studentExamDetailsController.getStudentExamDetailsByBranchId);   // Get student exam details by ID
router.get('/', studentExamDetailsController.getAllStudentExamDetails);        // Get all student exam details

module.exports = router;
