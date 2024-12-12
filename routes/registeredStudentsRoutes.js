const express = require('express');
const router = express.Router();
const registeredStudentsController = require('../controllers/registeredStudentsController');
const multer = require('multer');
const path = require('path');

// Configure multer for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads/student')); // Ensure 'uploads/branchAdmin' exists
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Generate unique filename
    }
})

const upload = multer({ storage });

// Routes for managing registered students
router.post('/', upload.single('StudentImage'), registeredStudentsController.addStudent);              // Add a new student
router.put('/:id', registeredStudentsController.updateStudent);         // Update a student by ID
router.delete('/:id', registeredStudentsController.deleteStudent);      // Delete a student by ID
router.get('/:id', registeredStudentsController.getStudentById);        // Get a student by ID
router.get('/', registeredStudentsController.getAllStudents);           // Get all students
router.get('/branch/:branchID', registeredStudentsController.getStudentsByBranch);
router.post('/upload-excel', upload.single('file'), registeredStudentsController.addStudentsFromExcel);
router.get('/srno/generateNumber', registeredStudentsController.generateNumber);

module.exports = router;
