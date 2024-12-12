const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Add new user
router.post('/', userController.addUser);

// Get user by ID
router.get('/:id', userController.getUserById);

// Get all users
router.get('/', userController.getAllUsers);

// Update user by ID
router.put('/:id', userController.updateUser);

// Soft delete user by ID
router.delete('/:id', userController.deleteUser);

module.exports = router;
