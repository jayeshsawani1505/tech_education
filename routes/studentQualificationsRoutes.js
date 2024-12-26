const express = require('express');
const router = express.Router();
const studentQualificationsController = require('../controllers/studentQualificationsController');
const multer = require('multer');

// Configure multer to parse the file into a buffer (similar to the branch admin logic)
const storage = multer.memoryStorage(); // Use memory storage for temporary file handling
const upload = multer({ storage });

// Add a new student qualification
router.post('/', upload.single('attachFile'), studentQualificationsController.addQualification);

// Update a student qualification by ID
router.put('/:QualificationId/:StudentId', studentQualificationsController.updateQualification);

// Delete a student qualification by ID
router.delete('/:QualificationId/:StudentId', studentQualificationsController.deleteQualification);

// Get a student qualification by ID
router.get('/:QualificationId/:StudentId', studentQualificationsController.getQualificationById);

// Get all qualifications for a student
router.get('/all/student/:StudentId', studentQualificationsController.getQualificationsByStudentId);

router.get('/all', studentQualificationsController.getQualifications);

module.exports = router;
