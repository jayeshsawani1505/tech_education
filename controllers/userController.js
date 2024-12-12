const userService = require('../services/userService');

// Add new user
const addUser = async (req, res) => {
    try {
        const userData = req.body;
        const result = await userService.addUser(userData);
        res.status(201).json({ message: 'User added successfully', data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get user by ID
const getUserById = async (req, res) => {
    try {
        const UserID = req.params.id;
        const result = await userService.getUserById(UserID);
        if (!result) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const result = await userService.getAllUsers();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update user by ID
const updateUser = async (req, res) => {
    try {
        const UserID = req.params.id;
        const userData = req.body;
        const result = await userService.updateUser(UserID, userData);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User updated successfully', data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete user by ID (soft delete)
const deleteUser = async (req, res) => {
    try {
        const UserID = req.params.id;
        const result = await userService.deleteUser(UserID);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    addUser,
    getUserById,
    getAllUsers,
    updateUser,
    deleteUser
};
