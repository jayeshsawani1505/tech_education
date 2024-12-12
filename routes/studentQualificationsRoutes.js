const express = require('express');
const router = express.Router();
const studentQualificationsController = require('../controllers/studentQualificationsController');
const multer = require('multer');
const path = require('path');

// Configure multer for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads/qualifications')); // Ensure 'uploads/qualifications' exists
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Generate unique filename
    }
});

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
