const express = require('express');
const router = express.Router();
const registeredStudentsController = require('../controllers/registeredStudentsController');
const multer = require('multer');

// Configure multer to parse the file into a buffer
const storage = multer.memoryStorage(); // Use memory storage for any subsequent processing (e.g., S3 upload)
const upload = multer({ storage });

// Routes for managing registered students
router.post('/', upload.single('StudentImage'), registeredStudentsController.addStudent);// Add a new student
router.put('/:id', registeredStudentsController.updateStudent);         // Update a student by ID
router.delete('/:id', registeredStudentsController.deleteStudent);      // Delete a student by ID
router.get('/:id', registeredStudentsController.getStudentById);        // Get a student by ID
router.get('/', registeredStudentsController.getAllStudents);           // Get all students
router.get('/branch/:branchID', registeredStudentsController.getStudentsByBranch);
router.post('/upload-excel', upload.single('file'), registeredStudentsController.addStudentsFromExcel);
router.get('/srno/generateNumber', registeredStudentsController.generateNumber);

module.exports = router;
