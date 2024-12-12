const express = require('express');
const router = express.Router();
const branchController = require('../controllers/branchController');

// Routes for branch management
router.post('/', branchController.addBranch);          // Add a new branch
router.put('/:id', branchController.updateBranch);     // Update a branch by ID
router.delete('/:id', branchController.deleteBranch);  // Delete a branch by ID
router.get('/:id', branchController.getBranchById);    // Get a branch by ID
router.get('/', branchController.getBranch);    // Get a branch

module.exports = router;
