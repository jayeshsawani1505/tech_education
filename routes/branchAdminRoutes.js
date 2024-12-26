const express = require('express');
const router = express.Router();
const branchAdminController = require('../controllers/branchAdminController');
const multer = require('multer');

// Configure multer to parse the file into a buffer
const storage = multer.memoryStorage(); // Use memory storage for S3 uploads
const upload = multer({ storage });

// Routes for branch admin management
router.post('/', upload.single('Image'), branchAdminController.addBranchAdmin);         // Add a new branch admin
router.put('/:id', branchAdminController.updateBranchAdmin);     // Update a branch admin by ID
router.delete('/:id', branchAdminController.deleteBranchAdmin);  // Delete a branch admin by ID
router.get('/:id', branchAdminController.getBranchAdminById);    // Get a branch admin by ID
router.get('/', branchAdminController.getAllBranchAdmins); // Get all branch admins

module.exports = router;
