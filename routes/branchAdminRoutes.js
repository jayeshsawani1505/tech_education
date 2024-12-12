const express = require('express');
const router = express.Router();
const branchAdminController = require('../controllers/branchAdminController');
const multer = require('multer');
const path = require('path');

// Configure multer for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads/branchAdmin')); // Ensure 'uploads/branchAdmin' exists
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Generate unique filename
    }
});

const upload = multer({ storage });
// Routes for branch admin management
router.post('/',upload.single('Image'), branchAdminController.addBranchAdmin);          // Add a new branch admin
router.put('/:id', branchAdminController.updateBranchAdmin);     // Update a branch admin by ID
router.delete('/:id', branchAdminController.deleteBranchAdmin);  // Delete a branch admin by ID
router.get('/:id', branchAdminController.getBranchAdminById);    // Get a branch admin by ID
router.get('/', branchAdminController.getAllBranchAdmins); // Get all branch admins

module.exports = router;
