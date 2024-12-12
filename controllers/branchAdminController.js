const branchAdminService = require('../services/branchAdminService');

// Add a new branch admin
const addBranchAdmin = async (req, res) => {
    try {
        const adminData = req.body;
        if (req.file) {
            adminData.Image = `/uploads/branchAdmin/${req.file.filename}`; // Store file path
        }
        const result = await branchAdminService.addBranchAdminAndUser(adminData);
        res.status(201).json({ message: "Branch admin added successfully", data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a branch admin by ID
const updateBranchAdmin = async (req, res) => {
    try {
        const BranchAdminID = req.params.id;
        const adminData = req.body;
        const result = await branchAdminService.updateBranchAdmin(BranchAdminID, adminData);
        res.status(200).json({ message: "Branch admin updated successfully", data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a branch admin by ID
const deleteBranchAdmin = async (req, res) => {
    try {
        const BranchAdminID = req.params.id;
        const result = await branchAdminService.deleteBranchAdmin(BranchAdminID);
        res.status(200).json({ message: "Branch admin deleted successfully", data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a branch admin by ID
const getBranchAdminById = async (req, res) => {
    try {
        const BranchAdminID = req.params.id;
        const result = await branchAdminService.getBranchAdminById(BranchAdminID);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all branch admins
const getAllBranchAdmins = async (req, res) => {
    try {
        const result = await branchAdminService.getAllBranchAdmins();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    addBranchAdmin,
    updateBranchAdmin,
    deleteBranchAdmin,
    getBranchAdminById,
    getAllBranchAdmins, // Add this to the exports
};;
