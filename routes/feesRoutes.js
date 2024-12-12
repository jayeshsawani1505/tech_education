const express = require('express');
const router = express.Router();
const feesController = require('../controllers/feesController');
const multer = require('multer');
const path = require('path');

// Configure multer for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads/excelFee')); // Ensure 'uploads/excelFee' exists
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Generate unique filename
    }
})
const upload = multer({ storage });


// Routes for managing fee records
router.post('/', feesController.addFee);           // Add a new fee record
router.put('/:id', feesController.updateFee);      // Update a fee record by ID
router.delete('/:id', feesController.deleteFee);   // Delete a fee record by ID
router.get('/:id', feesController.getFeeById);     // Get a fee record by ID
router.get('/', feesController.getAllFees);        // Get all fee records
router.get('/branch/:branchID', feesController.getFeesByBranch);
router.post('/upload-excel', upload.single('file'), feesController.addFeeFromExcel);
router.get('/srno/generateNumber', feesController.generateFeeNumber);

module.exports = router;
